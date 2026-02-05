"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReceiptUploader from "@/components/receipts/ReceiptUploader";

export default function ReceiptUploadPage() {
  const router = useRouter();

  function handleUploadComplete() {
    // Navigate back to receipts list after a short delay
    setTimeout(() => {
      router.push("/receipts");
    }, 2000);
  }

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-navy-600 hover:text-navy-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to receipts
      </button>

      <div className="bg-white border border-navy-100 rounded-2xl p-6">
        <h1 className="text-xl font-bold text-navy-900 mb-1">
          Scan a receipt
        </h1>
        <p className="text-sm text-navy-500 mb-6">
          Upload a photo or PDF. AI will read the details, categorise the
          expense, and log it for you.
        </p>

        <ReceiptUploader onUploadComplete={handleUploadComplete} />

        <div className="mt-6 bg-navy-50 rounded-lg p-4">
          <p className="text-xs text-navy-600 leading-relaxed">
            <strong>How it works:</strong> Our AI reads the receipt image,
            extracts the supplier, amount, date and VAT. It then categorises the
            expense into the correct HMRC box. High-confidence results are
            auto-confirmed; lower confidence receipts are flagged for your
            review.
          </p>
        </div>
      </div>
    </div>
  );
}
