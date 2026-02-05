/**
 * Confidence Scoring
 * Determines how confident the AI should be in its answers
 */

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export interface ConfidenceResult {
  level: ConfidenceLevel;
  label: string;
  color: string;
  disclaimer: string;
}

export const CONFIDENCE_CONFIG: Record<ConfidenceLevel, ConfidenceResult> = {
  HIGH: {
    level: "HIGH",
    label: "High Confidence",
    color: "green",
    disclaimer: "Based on current HMRC guidance. Rules are straightforward here.",
  },
  MEDIUM: {
    level: "MEDIUM",
    label: "Medium Confidence",
    color: "amber",
    disclaimer:
      "This involves some interpretation. Consider discussing with a qualified accountant for your specific situation.",
  },
  LOW: {
    level: "LOW",
    label: "Needs Professional Review",
    color: "red",
    disclaimer:
      "This is a complex area with significant nuance. I'd strongly recommend running this past a qualified accountant before acting on it.",
  },
};

/**
 * Rules for determining confidence level
 * Used in the n8n workflow Code node
 */
export const CONFIDENCE_RULES = {
  high: [
    "Standard tax rates and thresholds",
    "Basic expense categories",
    "HMRC deadlines",
    "Mileage allowance rates",
    "Dividend allowance",
    "Personal allowance",
    "VAT registration threshold",
    "Simple salary/dividend split for small Ltd companies",
  ],
  medium: [
    "Home office calculations (actual method)",
    "Capital allowances",
    "VAT partial exemption",
    "IR35 general guidance",
    "Pension tax relief",
    "Company car vs mileage",
    "Business entertainment rules",
  ],
  low: [
    "IR35 status determination for specific contracts",
    "Transfer pricing",
    "EIS/SEIS relief eligibility",
    "International tax",
    "Share scheme taxation",
    "Inheritance tax planning with business assets",
    "R&D tax credit claims",
    "Anti-avoidance provisions (GAAR)",
  ],
} as const;
