"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Briefcase,
  Users,
  Laptop,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Calculator,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  ONBOARDING_QUESTIONS,
  calculateExperienceLevel,
} from "@/lib/ai/experience-levels";

const businessTypes = [
  {
    value: "sole_trader",
    label: "Sole Trader",
    description: "Self-employed, trading under your own name",
    icon: Briefcase,
  },
  {
    value: "limited_company",
    label: "Limited Company",
    description: "Registered at Companies House (Ltd)",
    icon: Building2,
  },
  {
    value: "partnership",
    label: "Partnership",
    description: "Trading with one or more partners",
    icon: Users,
  },
  {
    value: "freelancer",
    label: "Freelancer",
    description: "Self-employed providing services",
    icon: Laptop,
  },
];

const goals = [
  { value: "save_tax", label: "Save money on tax" },
  { value: "track_expenses", label: "Track expenses properly" },
  { value: "understand_obligations", label: "Understand my tax obligations" },
  { value: "prepare_returns", label: "Prepare for tax returns" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [vatRegistered, setVatRegistered] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const totalSteps = 4;

  function handleExperienceAnswer(questionIndex: number, points: number) {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = points;
    setAnswers(newAnswers);
  }

  function toggleGoal(goal: string) {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }

  async function handleComplete() {
    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const totalPoints = answers.reduce((sum, a) => sum + (a || 0), 0);
    const experienceLevel = calculateExperienceLevel(totalPoints);

    await supabase
      .from("users")
      .update({
        business_type: businessType,
        experience_level: experienceLevel,
        vat_registered: vatRegistered,
        goals: selectedGoals,
        onboarding_completed: true,
      })
      .eq("id", user.id);

    router.push("/dashboard");
    router.refresh();
  }

  const canAdvance = () => {
    if (step === 0) return !!businessType;
    if (step === 1) return answers.length === ONBOARDING_QUESTIONS.length;
    if (step === 2) return true; // VAT is optional
    if (step === 3) return selectedGoals.length > 0;
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-navy-900">
          Let&apos;s get to know your business
        </h1>
        <p className="text-navy-600 mt-1">
          This helps me give you the right advice at the right level.
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-teal-500" : "bg-navy-200"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-navy-100"
        >
          {/* Step 0: Business Type */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-navy-900 mb-4">
                What type of business do you run?
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {businessTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setBusinessType(type.value)}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-colors ${
                      businessType === type.value
                        ? "border-teal-500 bg-teal-50"
                        : "border-navy-100 hover:border-navy-200"
                    }`}
                  >
                    <type.icon
                      className={`w-5 h-5 mt-0.5 ${
                        businessType === type.value
                          ? "text-teal-600"
                          : "text-navy-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-navy-900">{type.label}</p>
                      <p className="text-xs text-navy-500 mt-0.5">
                        {type.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Experience Assessment */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-navy-900 mb-1">
                Quick experience check
              </h2>
              <p className="text-sm text-navy-500 mb-6">
                This helps me adjust how I explain things.
              </p>
              <div className="space-y-6">
                {ONBOARDING_QUESTIONS.map((q, qi) => (
                  <div key={qi}>
                    <p className="text-sm font-medium text-navy-800 mb-2">
                      {q.question}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() =>
                            handleExperienceAnswer(qi, opt.points)
                          }
                          className={`px-3 py-2 rounded-lg border text-sm text-left transition-colors ${
                            answers[qi] === opt.points
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-navy-200 text-navy-600 hover:border-navy-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: VAT Status */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-navy-900 mb-1">
                Are you VAT registered?
              </h2>
              <p className="text-sm text-navy-500 mb-6">
                This affects how we handle your receipts and expenses.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setVatRegistered(true)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-colors ${
                    vatRegistered
                      ? "border-teal-500 bg-teal-50"
                      : "border-navy-100 hover:border-navy-200"
                  }`}
                >
                  <div>
                    <p className="font-medium text-navy-900">
                      Yes, I&apos;m VAT registered
                    </p>
                    <p className="text-xs text-navy-500 mt-0.5">
                      I charge VAT and file VAT returns
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setVatRegistered(false)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-colors ${
                    !vatRegistered
                      ? "border-teal-500 bg-teal-50"
                      : "border-navy-100 hover:border-navy-200"
                  }`}
                >
                  <div>
                    <p className="font-medium text-navy-900">
                      No, I&apos;m not VAT registered
                    </p>
                    <p className="text-xs text-navy-500 mt-0.5">
                      My turnover is below the threshold or I&apos;m exempt
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-navy-900 mb-1">
                What do you want to achieve?
              </h2>
              <p className="text-sm text-navy-500 mb-6">
                Pick all that apply. I&apos;ll prioritise these in our chats.
              </p>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => toggleGoal(goal.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-colors ${
                      selectedGoals.includes(goal.value)
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-navy-100 text-navy-700 hover:border-navy-200"
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canAdvance()}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:bg-navy-200 disabled:text-navy-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={!canAdvance() || saving}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:bg-navy-200 disabled:text-navy-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Get Started"}
          </button>
        )}
      </div>
    </div>
  );
}
