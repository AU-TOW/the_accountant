"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Try it out. See what you're missing.",
    features: [
      "5 AI chat questions per month",
      "3 receipt scans per month",
      "Basic tax tips",
      "HMRC deadline reminders",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Essential",
    price: "9.99",
    description: "For sole traders who want to stay on top of things.",
    features: [
      "Unlimited AI chat",
      "50 receipt scans per month",
      "Expense categorisation",
      "Tax saving suggestions",
      "Confidence scoring on answers",
      "Conversation history",
    ],
    cta: "Start Essential",
    popular: true,
  },
  {
    name: "Pro",
    price: "19.99",
    description: "For Ltd company directors serious about tax efficiency.",
    features: [
      "Everything in Essential",
      "Unlimited receipt scans",
      "Salary/dividend optimiser",
      "VAT return calculator",
      "Financial health dashboard",
      "Priority support",
      "Export to accountant",
    ],
    cta: "Start Pro",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-14 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-mesh -z-10" />

      <div className="section-container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-h1 text-navy-900">
            Simple, honest pricing
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-500 max-w-2xl mx-auto">
            Less than the cost of one hour with a traditional accountant. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative p-5 sm:p-6 transition-all duration-300 ${
                plan.popular
                  ? "glass-card-dark shadow-glass-xl md:-mt-4 md:mb-[-1rem] border-teal-500/30"
                  : "glass-card shadow-card hover:shadow-card-hover hover:-translate-y-1"
              }`}
              style={plan.popular ? { borderColor: "rgba(20, 184, 166, 0.3)" } : undefined}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-teal-500 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-glow flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <h3 className={`text-h3 ${plan.popular ? "text-white" : "text-navy-900"}`}>
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-3xl sm:text-4xl font-bold ${plan.popular ? "text-white" : "text-navy-900"}`}>
                  &pound;{plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? "text-navy-300" : "text-navy-400"}`}>
                  /month
                </span>
              </div>

              <p className={`mt-2 text-sm ${plan.popular ? "text-navy-300" : "text-navy-500"}`}>
                {plan.description}
              </p>

              <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? "bg-teal-500/20" : "bg-teal-50"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-teal-400" : "text-teal-600"}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-navy-200" : "text-navy-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`mt-6 sm:mt-8 w-full ${plan.popular ? "btn-primary" : "btn-secondary"}`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
