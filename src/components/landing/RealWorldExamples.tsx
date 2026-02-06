"use client";

import { motion } from "framer-motion";
import { Banknote, Car, Building2 } from "lucide-react";

const examples = [
  {
    icon: Banknote,
    name: "Sarah",
    business: "Ltd Company Director",
    scenario:
      "Sarah's company made 80,000 profit. She was taking it all as salary.",
    insight:
      "By splitting into 12,570 salary + 50,000 dividends, Sarah keeps 5,200 more per year. That's a family holiday.",
    saved: "5,200",
  },
  {
    icon: Car,
    name: "Mike",
    business: "Sole Trader Plumber",
    scenario:
      "Mike drives 12,000 business miles a year but wasn't claiming mileage.",
    insight:
      "First 10,000 miles at 45p + 2,000 at 25p = 5,000 deduction. At his tax rate, that's 1,000 back from HMRC.",
    saved: "1,000",
  },
  {
    icon: Building2,
    name: "Emma",
    business: "Freelance Designer",
    scenario:
      "Emma works from home 4 days a week but only claims the 6/week flat rate.",
    insight:
      "By calculating actual costs (rent proportion, broadband, electric), Emma claims 2,400 instead of 312. That's 2,088 more in deductions.",
    saved: "2,088",
  },
];

export default function RealWorldExamples() {
  return (
    <section id="examples" className="py-14 sm:py-20 lg:py-24 bg-mesh relative">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-h1 text-navy-900">
            Real tax savings, real people
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-500 max-w-2xl mx-auto">
            These are the kinds of savings we find every day. Actual pounds, not
            vague percentages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {examples.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card shadow-card hover:shadow-card-hover p-5 sm:p-6 group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                  <ex.icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{ex.name}</p>
                  <p className="text-xs sm:text-sm text-navy-500">{ex.business}</p>
                </div>
              </div>

              <p className="text-sm text-navy-500 mb-3">{ex.scenario}</p>

              <div className="glass-card bg-teal-50/50 border-teal-200/40 p-3 sm:p-3.5 mb-4">
                <p className="text-sm text-teal-800 leading-relaxed">
                  {ex.insight}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-navy-100/50">
                <span className="text-sm text-navy-400">Annual saving</span>
                <span className="text-xl sm:text-2xl font-bold gradient-text">
                  &pound;{ex.saved}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
