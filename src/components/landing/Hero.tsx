import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import AgentCharacter from "./AgentCharacter";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-50/50 to-white -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              AI-Powered &middot; Not a licensed accountant
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight tracking-tight">
              Your AI accountant that{" "}
              <span className="text-teal-500">teaches as it works</span>
            </h1>

            <p className="mt-6 text-lg text-navy-600 leading-relaxed max-w-xl">
              No jargon. No brain fog. Plain English tax advice with real pound
              amounts, not percentages. Built for UK sole traders and limited
              company directors who want to understand their money.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3.5 rounded-lg text-base font-medium transition-colors"
              >
                Start saving tax today
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-navy-50 text-navy-700 border border-navy-200 px-6 py-3.5 rounded-lg text-base font-medium transition-colors"
              >
                See how it works
              </a>
            </div>

            <p className="mt-6 text-sm text-navy-400">
              Free tier available. No credit card required.
            </p>
          </div>

          {/* Right - AI character */}
          <div className="flex justify-center lg:justify-end">
            <AgentCharacter />
          </div>
        </div>
      </div>
    </section>
  );
}
