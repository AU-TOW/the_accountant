"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Calculator } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-0 border-b shadow-glass">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-navy-900">
              The Accountant
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#examples", label: "Tax Savings" },
              { href: "#pricing", label: "Pricing" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="btn-ghost text-sm py-2 px-3.5"
              >
                {item.label}
              </a>
            ))}
            <Link href="/login" className="btn-ghost text-sm py-2 px-3.5">
              Log In
            </Link>
            <Link href="/signup" className="btn-primary text-sm ml-2 py-2 px-4 sm:py-2.5 sm:px-5">
              Get Started Free
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-navy-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-navy-900" />
            ) : (
              <Menu className="w-5 h-5 text-navy-900" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 animate-slide-up">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#examples", label: "Tax Savings" },
              { href: "#pricing", label: "Pricing" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 text-sm text-navy-700 hover:bg-navy-50 rounded-xl font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              className="block px-3 py-2.5 text-sm text-navy-700 hover:bg-navy-50 rounded-xl font-medium"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="btn-primary w-full mt-2 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Get Started Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
