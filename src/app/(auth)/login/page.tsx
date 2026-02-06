"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Calculator, Mail, Lock, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const verificationError = searchParams.get("error") === "verification_failed";
  const verified = searchParams.get("verified") === "true";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-teal-500/5 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-navy-500/5 blur-3xl" />

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
          <h1 className="text-h2 text-navy-900 mb-1.5">Welcome back</h1>
          <p className="text-sm sm:text-base text-navy-500">Log in to your account</p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleLogin}
          className="glass-card shadow-glass-lg p-5 sm:p-7"
        >
          {verified && (
            <div className="mb-4 p-3 sm:p-3.5 glass-card bg-teal-500/5 border-teal-300/30 rounded-xl text-sm text-teal-700 animate-slide-up flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
              <span>Email verified successfully! Log in to get started.</span>
            </div>
          )}

          {verificationError && (
            <div className="mb-4 p-3 sm:p-3.5 glass-card bg-amber-500/5 border-amber-300/30 rounded-xl text-sm text-amber-700 animate-slide-up flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-600">!</span>
              </div>
              <span>Email verification failed or link expired. Please try signing up again.</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 sm:p-3.5 glass-card bg-red-500/5 border-red-300/30 rounded-xl text-sm text-red-700 animate-slide-up flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-red-600">!</span>
              </div>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="Your password"
                />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Log In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-navy-500 mt-5 sm:mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-semibold transition-colors">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
