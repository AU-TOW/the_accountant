import { HMRC_CATEGORY_MAP } from "@/lib/ai/hmrc-categories";

interface CategoryBadgeProps {
  categoryCode: string;
  size?: "sm" | "md";
}

export default function CategoryBadge({
  categoryCode,
  size = "sm",
}: CategoryBadgeProps) {
  const category = HMRC_CATEGORY_MAP[categoryCode];

  if (!category) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-navy-100 text-navy-600 text-xs">
        Uncategorised
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-md bg-teal-50 text-teal-700 border border-teal-200 ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      title={category.description}
    >
      {category.name}
    </span>
  );
}
