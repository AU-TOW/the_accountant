import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "File type not supported. Use JPEG, PNG, WebP, or PDF." },
      { status: 400 }
    );
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 10MB." },
      { status: 400 }
    );
  }

  try {
    // Upload to Supabase Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    // Create receipt record
    const { data: receipt, error: dbError } = await supabase
      .from("receipts")
      .insert({
        user_id: user.id,
        image_path: fileName,
        status: "processing",
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    // Trigger n8n OCR workflow
    const webhookUrl = process.env.N8N_RECEIPT_WEBHOOK_URL;
    if (webhookUrl) {
      // Fire and forget — n8n will update the receipt record
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiptId: receipt.id,
          userId: user.id,
          imagePath: fileName,
        }),
      }).catch(console.error);
    }

    return NextResponse.json({
      receipt,
      message: "Receipt uploaded. Processing with AI...",
    });
  } catch (error) {
    console.error("Receipt upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload receipt" },
      { status: 500 }
    );
  }
}
