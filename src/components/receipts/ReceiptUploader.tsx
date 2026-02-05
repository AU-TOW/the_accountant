"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Camera, Loader2, CheckCircle, XCircle } from "lucide-react";

interface ReceiptUploaderProps {
  onUploadComplete?: (receipt: Record<string, unknown>) => void;
}

export default function ReceiptUploader({
  onUploadComplete,
}: ReceiptUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setStatus("idle");
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/receipts/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        setStatus("success");
        setMessage(data.message || "Receipt uploaded successfully!");
        onUploadComplete?.(data.receipt);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "Failed to upload receipt"
        );
      } finally {
        setUploading(false);
      }
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: uploading,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-teal-500 bg-teal-50"
            : uploading
              ? "border-navy-200 bg-navy-50 cursor-not-allowed"
              : "border-navy-200 hover:border-teal-400 hover:bg-teal-50/30"
        }`}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className="space-y-3">
            <Loader2 className="w-10 h-10 text-teal-500 mx-auto animate-spin" />
            <p className="text-sm text-navy-600">
              Uploading and processing with AI...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-teal-600" />
              </div>
              <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-navy-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-navy-800">
                {isDragActive
                  ? "Drop your receipt here"
                  : "Drop a receipt or click to upload"}
              </p>
              <p className="text-xs text-navy-500 mt-1">
                JPEG, PNG, WebP or PDF up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status message */}
      {status !== "idle" && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg ${
            status === "success"
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          {status === "success" ? (
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <p
            className={`text-sm ${
              status === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
