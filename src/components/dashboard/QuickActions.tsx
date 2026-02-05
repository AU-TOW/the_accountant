import Link from "next/link";
import { Camera, MessageSquare, FileText } from "lucide-react";

const actions = [
  {
    href: "/receipts/upload",
    label: "Scan Receipt",
    icon: Camera,
    color: "bg-teal-100 text-teal-600",
  },
  {
    href: "/chat",
    label: "Ask AI",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-600",
  },
  {
    href: "/receipts",
    label: "View Expenses",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white border border-navy-100 rounded-2xl p-6">
      <h3 className="text-sm font-medium text-navy-500 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-navy-50 transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-navy-700">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
