"use client";

import { motion } from "framer-motion";
import { MessageSquare, Camera, Brain, PiggyBank } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Ask anything",
    description:
      "Type your tax question in plain English. No jargon needed. \"Can I claim my phone bill?\" works perfectly.",
  },
  {
    icon: Camera,
    title: "Scan receipts",
    description:
      "Snap a photo or upload a receipt. AI reads it, categorises it into the right HMRC box, and logs the expense.",
  },
  {
    icon: Brain,
    title: "Learn as you go",
    description:
      "Every answer explains the why, not just the what. You'll understand your taxes better each time you use it.",
  },
  {
    icon: PiggyBank,
    title: "Save money",
    description:
      "Get proactive alerts about deductions you're missing. Real pound amounts, not confusing percentages.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
            How it works
          </h2>
          <p className="mt-4 text-lg text-navy-600 max-w-2xl mx-auto">
            Four simple steps. No accounting degree required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-teal-600" />
              </div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-navy-900 text-white text-sm font-bold mb-3">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-navy-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
