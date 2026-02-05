import { Calculator, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Citation {
  title: string;
  url: string;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  confidenceScore?: "HIGH" | "MEDIUM" | "LOW" | null;
  citations?: Citation[];
}

const confidenceStyles = {
  HIGH: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    dot: "bg-green-500",
    label: "High Confidence",
  },
  MEDIUM: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500",
    label: "Medium Confidence",
  },
  LOW: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-500",
    label: "Seek Professional Advice",
  },
};

export default function ChatMessage({
  role,
  content,
  confidenceScore,
  citations,
}: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-teal-500 text-white rounded-2xl rounded-br-md px-4 py-3">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  const confidence = confidenceScore ? confidenceStyles[confidenceScore] : null;

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
        <Calculator className="w-4 h-4 text-teal-600" />
      </div>
      <div className="max-w-[85%] space-y-2">
        <div className="bg-white border border-navy-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <div className="text-sm text-navy-800 leading-relaxed prose prose-sm prose-navy max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        {/* Confidence badge */}
        {confidence && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${confidence.bg} ${confidence.border} border`}
          >
            <div className={`w-2 h-2 rounded-full ${confidence.dot}`} />
            <span className={`text-xs font-medium ${confidence.text}`}>
              {confidence.label}
            </span>
          </div>
        )}

        {/* Citations */}
        {citations && citations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {citations.map((citation, i) => (
              <a
                key={i}
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-navy-50 hover:bg-navy-100 rounded-md text-xs text-navy-600 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {citation.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
