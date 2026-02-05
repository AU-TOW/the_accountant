"use client";

import { format } from "date-fns";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";
import CategoryBadge from "./CategoryBadge";

interface ReceiptCardProps {
  receipt: {
    id: string;
    supplier: string | null;
    amount: number | null;
    vat_amount: number | null;
    receipt_date: string | null;
    hmrc_category: string | null;
    description: string | null;
    confidence_score: number | null;
    status: string;
    created_at: string;
  };
  onClick?: () => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-navy-400",
    bg: "bg-navy-50",
    label: "Pending",
  },
  processing: {
    icon: Loader2,
    color: "text-amber-500",
    bg: "bg-amber-50",
    label: "Processing",
    animate: true,
  },
  review: {
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    label: "Needs Review",
  },
  confirmed: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-50",
    label: "Confirmed",
  },
  rejected: {
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    label: "Rejected",
  },
};

export default function ReceiptCard({ receipt, onClick }: ReceiptCardProps) {
  const config =
    statusConfig[receipt.status as keyof typeof statusConfig] ||
    statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-navy-100 rounded-xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-navy-100 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-navy-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-navy-900">
              {receipt.supplier || "Unknown supplier"}
            </p>
            <p className="text-xs text-navy-500">
              {receipt.receipt_date
                ? format(new Date(receipt.receipt_date), "d MMM yyyy")
                : format(new Date(receipt.created_at), "d MMM yyyy")}
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg}`}
        >
          <StatusIcon
            className={`w-3 h-3 ${config.color} ${
              "animate" in config && config.animate ? "animate-spin" : ""
            }`}
          />
          <span className={`text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
      </div>

      {receipt.amount !== null && (
        <p className="text-xl font-bold text-navy-900 mb-2">
          &pound;{receipt.amount.toFixed(2)}
          {receipt.vat_amount !== null && receipt.vat_amount > 0 && (
            <span className="text-sm font-normal text-navy-500 ml-1">
              (inc. &pound;{receipt.vat_amount.toFixed(2)} VAT)
            </span>
          )}
        </p>
      )}

      {receipt.description && (
        <p className="text-xs text-navy-600 mb-2 line-clamp-2">
          {receipt.description}
        </p>
      )}

      {receipt.hmrc_category && (
        <CategoryBadge categoryCode={receipt.hmrc_category} />
      )}

      {receipt.confidence_score !== null && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-navy-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                receipt.confidence_score >= 0.85
                  ? "bg-green-500"
                  : receipt.confidence_score >= 0.6
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${receipt.confidence_score * 100}%` }}
            />
          </div>
          <span className="text-xs text-navy-500">
            {Math.round(receipt.confidence_score * 100)}%
          </span>
        </div>
      )}
    </button>
  );
}
