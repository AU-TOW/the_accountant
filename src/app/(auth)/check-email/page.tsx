"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calculator, Mail, ArrowLeft } from "lucide-react";

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-navy-900">
              The Accountant
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-navy-100 text-center">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-teal-500" />
          </div>

          <h1 className="text-2xl font-bold text-navy-900 mb-2">
            Check your email
          </h1>

          <p className="text-navy-600 mb-6">
            We&apos;ve sent a verification link to{" "}
            <span className="font-medium text-navy-900">{email}</span>
          </p>

          <div className="bg-navy-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-navy-700 font-medium mb-2">
              What to do next:
            </p>
            <ol className="text-sm text-navy-600 space-y-1.5 list-decimal list-inside">
              <li>Open the email from The Accountant</li>
              <li>Click the verification link</li>
              <li>You&apos;ll be taken straight to your account setup</li>
            </ol>
          </div>

          <p className="text-xs text-navy-400 mb-6">
            Didn&apos;t receive the email? Check your spam folder or try signing
            up again.
          </p>

          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
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
