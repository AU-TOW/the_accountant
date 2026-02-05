"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Calculator } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-navy-900">
              The Accountant
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm text-navy-700 hover:text-teal-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#examples"
              className="text-sm text-navy-700 hover:text-teal-600 transition-colors"
            >
              Tax Savings
            </a>
            <a
              href="#pricing"
              className="text-sm text-navy-700 hover:text-teal-600 transition-colors"
            >
              Pricing
            </a>
            <Link
              href="/login"
              className="text-sm text-navy-700 hover:text-teal-600 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-navy-900" />
            ) : (
              <Menu className="w-6 h-6 text-navy-900" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#examples"
              className="block px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Tax Savings
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </a>
            <Link
              href="/login"
              className="block px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 rounded-lg"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="block bg-teal-500 text-white text-center px-3 py-2.5 rounded-lg text-sm font-medium"
            >
              Get Started Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
