"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calculator, CheckCircle2, ArrowRight } from "lucide-react";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/login?verified=true");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-[-10%] left-[10%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-teal-500/8 blur-3xl" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] rounded-full bg-navy-500/5 blur-3xl" />

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
          {/* Animated success icon */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-teal-500/15 rounded-full animate-pulse-glow" />
            <div className="relative w-full h-full bg-gradient-to-br from-teal-50 to-teal-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500" />
            </div>
          </div>

          <h1 className="text-h2 text-navy-900 mb-2">
            Email Verified
          </h1>

          <p className="text-sm sm:text-base text-navy-500 mb-6">
            Your account has been confirmed successfully. You can now log in and start using The Accountant.
          </p>

          {/* Progress indicator */}
          <div className="glass-card bg-navy-50/50 p-4 sm:p-5 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-teal-600">{countdown}</span>
              </div>
              <p className="text-sm text-navy-600">
                Redirecting to login...
              </p>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1 bg-navy-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>

          <Link href="/login" className="btn-primary inline-flex">
            Go to Login
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
