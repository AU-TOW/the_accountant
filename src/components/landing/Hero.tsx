import Link from "next/link";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import AgentCharacter from "./AgentCharacter";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-hero-mesh -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - copy */}
          <div>
            <div className="inline-flex items-center gap-2 glass-card px-3.5 py-1.5 text-sm font-medium text-teal-700 mb-5 sm:mb-6 shadow-sm">
              <Shield className="w-3.5 h-3.5" />
              <span>AI-Powered</span>
              <span className="text-navy-300">&middot;</span>
              <span className="text-navy-500">Not a licensed accountant</span>
            </div>

            <h1 className="text-hero text-navy-900 tracking-tight text-balance">
              Your AI accountant that{" "}
              <span className="gradient-text">teaches as it works</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-navy-500 leading-relaxed max-w-xl">
              No jargon. No brain fog. Plain English tax advice with real pound
              amounts, not percentages. Built for UK sole traders and limited
              company directors.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/signup" className="btn-primary">
                Start saving tax today
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                See how it works
              </a>
            </div>

            <div className="mt-5 sm:mt-6 flex items-center gap-2 text-sm text-navy-400">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>Free tier available. No credit card required.</span>
            </div>
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
