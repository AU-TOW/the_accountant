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
    <section id="how-it-works" className="py-14 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-mesh -z-10" />

      <div className="section-container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-h1 text-navy-900">
            How it works
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-500 max-w-2xl mx-auto">
            Four simple steps. No accounting degree required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card shadow-card hover:shadow-card-hover p-5 sm:p-6 text-center group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-shadow duration-300">
                <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600" />
              </div>
              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold mb-3">
                {i + 1}
              </div>
              <h3 className="text-h4 text-navy-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
