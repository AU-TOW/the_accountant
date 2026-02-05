"use client";

interface FinancialHealthScoreProps {
  score: number;
}

export default function FinancialHealthScore({
  score,
}: FinancialHealthScoreProps) {
  const getColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-teal-500";
    if (score >= 40) return "text-amber-500";
    return "text-red-500";
  };

  const getLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Attention";
    return "Action Required";
  };

  const strokeDasharray = 283; // circumference of circle with r=45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * score) / 100;

  return (
    <div className="bg-white border border-navy-100 rounded-2xl p-6">
      <h3 className="text-sm font-medium text-navy-500 mb-4">
        Financial Health
      </h3>
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ${getColor()}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${getColor()}`}>{score}</span>
          </div>
        </div>
        <div>
          <p className={`text-lg font-semibold ${getColor()}`}>{getLabel()}</p>
          <p className="text-xs text-navy-500 mt-1">
            Based on your bookkeeping habits, expense tracking, and tax
            readiness.
          </p>
        </div>
      </div>
    </div>
  );
}
