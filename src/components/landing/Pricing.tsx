"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
    <section id="pricing" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-lg text-navy-600 max-w-2xl mx-auto">
            Less than the cost of one hour with a traditional accountant. Cancel
            anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-6 ${
                plan.popular
                  ? "bg-navy-900 text-white shadow-xl scale-105 border-2 border-teal-500"
                  : "bg-white border border-navy-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3
                className={`text-xl font-bold ${plan.popular ? "text-white" : "text-navy-900"}`}
              >
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-navy-900"}`}
                >
                  &pound;{plan.price}
                </span>
                <span
                  className={`text-sm ${plan.popular ? "text-navy-300" : "text-navy-500"}`}
                >
                  /month
                </span>
              </div>

              <p
                className={`mt-2 text-sm ${plan.popular ? "text-navy-300" : "text-navy-600"}`}
              >
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-teal-400" : "text-teal-500"}`}
                    />
                    <span
                      className={`text-sm ${plan.popular ? "text-navy-200" : "text-navy-600"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`mt-8 block text-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  plan.popular
                    ? "bg-teal-500 hover:bg-teal-400 text-white"
                    : "bg-navy-900 hover:bg-navy-800 text-white"
                }`}
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
