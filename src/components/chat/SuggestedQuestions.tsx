"use client";

import { Lightbulb } from "lucide-react";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const suggestions = [
  {
    category: "Tax Basics",
    questions: [
      "How much tax will I pay on 50,000 profit as a sole trader?",
      "What's the difference between salary and dividends?",
    ],
  },
  {
    category: "Expenses",
    questions: [
      "Can I claim my phone bill as a business expense?",
      "How do I claim for working from home?",
    ],
  },
  {
    category: "Tax Saving",
    questions: [
      "What's the most tax-efficient way to take money from my Ltd company?",
      "Am I missing any common tax deductions?",
    ],
  },
];

export default function SuggestedQuestions({
  onSelect,
}: SuggestedQuestionsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Lightbulb className="w-6 h-6 text-teal-600" />
        </div>
        <h2 className="text-lg font-semibold text-navy-900">
          What would you like to know?
        </h2>
        <p className="text-sm text-navy-500 mt-1">
          Ask me anything about UK tax, expenses, or your business finances.
        </p>
      </div>

      <div className="space-y-4">
        {suggestions.map((group) => (
          <div key={group.category}>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider mb-2">
              {group.category}
            </p>
            <div className="space-y-2">
              {group.questions.map((q) => (
                <button
                  key={q}
                  onClick={() => onSelect(q)}
                  className="w-full text-left px-4 py-3 bg-white border border-navy-100 rounded-xl text-sm text-navy-700 hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
