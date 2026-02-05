/**
 * Experience Level Definitions
 * Controls how the AI communicates with users at different levels
 */

export type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface LevelConfig {
  level: ExperienceLevel;
  label: string;
  languageRules: string[];
  analogiesAllowed: boolean;
  citationsStyle: "simple" | "detailed" | "full";
  showLegislation: boolean;
}

export const EXPERIENCE_LEVELS: Record<ExperienceLevel, LevelConfig> = {
  beginner: {
    level: "beginner",
    label: "New to business finances",
    languageRules: [
      "Use everyday analogies for every concept",
      "Never use accounting jargon without explaining it",
      "Explain WHY something matters, not just WHAT it is",
      "Use 'you' language, not passive voice",
      "Break numbers down to weekly/monthly amounts they can relate to",
      'Example: "Tax allowance is like a free pass - the first £12,570 you earn, the taxman doesn\'t touch"',
    ],
    analogiesAllowed: true,
    citationsStyle: "simple",
    showLegislation: false,
  },
  intermediate: {
    level: "intermediate",
    label: "Know the basics",
    languageRules: [
      "Use accounting terms but define them on first use",
      "Focus on practical implications and action items",
      "Include specific numbers and thresholds",
      "Mention the HMRC box numbers when relevant",
      "Less hand-holding, more direct advice",
    ],
    analogiesAllowed: true,
    citationsStyle: "detailed",
    showLegislation: false,
  },
  advanced: {
    level: "advanced",
    label: "Comfortable with accounting",
    languageRules: [
      "Use accounting terminology freely",
      "Reference specific HMRC guidance and legislation",
      "Discuss tax planning strategies directly",
      "Include technical detail where relevant",
      "Mention relevant case law for complex scenarios",
    ],
    analogiesAllowed: false,
    citationsStyle: "full",
    showLegislation: true,
  },
  expert: {
    level: "expert",
    label: "Accountant/tax professional",
    languageRules: [
      "Technical language throughout",
      "Full legislation references (ITEPA, CTA, VATA etc)",
      "Discuss anti-avoidance provisions",
      "Reference HMRC manuals by section",
      "Acknowledge edge cases and uncertainties",
    ],
    analogiesAllowed: false,
    citationsStyle: "full",
    showLegislation: true,
  },
};

export const ONBOARDING_QUESTIONS = [
  {
    question: "Have you filed a tax return before?",
    options: [
      { label: "No, this is all new", points: 0 },
      { label: "Yes, but I find it confusing", points: 1 },
      { label: "Yes, I handle it myself", points: 2 },
      { label: "I'm an accounting professional", points: 3 },
    ],
  },
  {
    question: 'Do you know the difference between "gross" and "net"?',
    options: [
      { label: "Not really", points: 0 },
      { label: "I think so", points: 1 },
      { label: "Yes, definitely", points: 2 },
      { label: "I could teach it", points: 3 },
    ],
  },
  {
    question: "How do you currently handle your business expenses?",
    options: [
      { label: "I don't really track them", points: 0 },
      { label: "Shoebox of receipts", points: 1 },
      { label: "Spreadsheet or basic app", points: 2 },
      { label: "Accounting software (Xero, QuickBooks etc)", points: 3 },
    ],
  },
] as const;

export function calculateExperienceLevel(totalPoints: number): ExperienceLevel {
  if (totalPoints <= 2) return "beginner";
  if (totalPoints <= 5) return "intermediate";
  if (totalPoints <= 7) return "advanced";
  return "expert";
}
