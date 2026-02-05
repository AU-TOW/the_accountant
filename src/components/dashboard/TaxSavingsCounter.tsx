"use client";

import { TrendingUp } from "lucide-react";

interface TaxSavingsCounterProps {
  totalSaved: number;
}

export default function TaxSavingsCounter({
  totalSaved,
}: TaxSavingsCounterProps) {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-teal-100">
          Tax Savings Found
        </h3>
        <TrendingUp className="w-5 h-5 text-teal-200" />
      </div>
      <p className="text-3xl font-bold">
        &pound;{totalSaved.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
      </p>
      <p className="text-sm text-teal-100 mt-1">this tax year</p>
    </div>
  );
}
