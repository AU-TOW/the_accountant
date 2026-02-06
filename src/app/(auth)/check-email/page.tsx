"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calculator, ArrowLeft, Inbox } from "lucide-react";

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-[-10%] right-[10%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-teal-500/5 blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] rounded-full bg-navy-500/5 blur-3xl" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5 sm:mb-6 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-h3 text-navy-900">
              The Accountant
            </span>
          </Link>
        </div>

        {/* Main card */}
        <div className="glass-card shadow-glass-lg p-6 sm:p-8 text-center">
          {/* Animated icon */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-teal-500/10 rounded-full animate-pulse-glow" />
            <div className="relative w-full h-full bg-gradient-to-br from-teal-50 to-teal-100 rounded-full flex items-center justify-center">
              <Inbox className="w-9 h-9 sm:w-11 sm:h-11 text-teal-500" />
            </div>
          </div>

          <h1 className="text-h2 text-navy-900 mb-2">
            Check your email
          </h1>

          <p className="text-sm sm:text-base text-navy-500 mb-6">
            We&apos;ve sent a verification link to{" "}
            <span className="font-semibold text-navy-800">{email}</span>
          </p>

          {/* Steps */}
          <div className="glass-card bg-navy-50/50 p-4 sm:p-5 mb-6 text-left">
            <div className="space-y-3">
              {[
                "Open the email from The Accountant",
                "Click the verification link",
                "You'll be taken straight to account setup",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-teal-600">{i + 1}</span>
                  </div>
                  <p className="text-sm text-navy-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-navy-400 mb-5">
            Didn&apos;t receive the email? Check your spam folder or try signing up again.
          </p>

          <Link href="/signup" className="btn-ghost text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense>
      <CheckEmailContent />
    </Suspense>
  );
}
