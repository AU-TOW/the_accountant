import Link from "next/link";
import { Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                The Accountant
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered accounting guidance for UK business owners. Teaches as
              it works.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-teal-400 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-teal-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#examples"
                  className="hover:text-teal-400 transition-colors"
                >
                  Tax Savings
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-teal-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-teal-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-teal-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-navy-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-navy-500">
              &copy; {new Date().getFullYear()} The Accountant. All rights
              reserved.
            </p>
            <div className="bg-navy-900 border border-navy-700 rounded-lg px-4 py-2">
              <p className="text-xs text-navy-400">
                <strong className="text-navy-300">Important:</strong> The
                Accountant is an AI tool and does not provide regulated financial
                advice. Always verify important decisions with a qualified
                accountant or HMRC directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
