"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Camera, Filter } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ReceiptCard from "@/components/receipts/ReceiptCard";

interface Receipt {
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
}

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function loadReceipts() {
      const supabase = createClient();
      let query = supabase
        .from("receipts")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data } = await query;
      setReceipts(data || []);
      setLoading(false);
    }

    loadReceipts();
  }, [filter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Receipts</h1>
          <p className="text-sm text-navy-500">
            Scan, categorise, and manage your business expenses.
          </p>
        </div>
        <Link
          href="/receipts/upload"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Camera className="w-4 h-4" />
          Scan Receipt
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-navy-400" />
        {["all", "review", "confirmed", "processing"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f
                ? "bg-teal-500 text-white"
                : "bg-white border border-navy-200 text-navy-600 hover:border-teal-300"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-navy-100 rounded-xl p-4 animate-pulse"
            >
              <div className="h-4 bg-navy-100 rounded w-1/2 mb-3" />
              <div className="h-6 bg-navy-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-navy-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : receipts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-navy-400" />
          </div>
          <h3 className="text-lg font-semibold text-navy-900 mb-1">
            No receipts yet
          </h3>
          <p className="text-sm text-navy-500 mb-4">
            Scan your first receipt to start tracking expenses automatically.
          </p>
          <Link
            href="/receipts/upload"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload Receipt
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {receipts.map((receipt) => (
            <ReceiptCard key={receipt.id} receipt={receipt} />
          ))}
        </div>
      )}
    </div>
  );
}
