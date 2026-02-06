import Link from "next/link";
import { Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300 py-10 sm:py-12">
      <div className="section-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                The Accountant
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered accounting guidance for UK business owners. Teaches as it works.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#how-it-works", label: "How It Works" },
                { href: "#pricing", label: "Pricing" },
                { href: "#examples", label: "Tax Savings" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-teal-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-navy-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-navy-500">
              &copy; {new Date().getFullYear()} The Accountant. All rights reserved.
            </p>
            <div className="glass-card-dark px-4 py-2.5 text-center sm:text-left">
              <p className="text-xs text-navy-400">
                <strong className="text-navy-300">Important:</strong> The Accountant
                is an AI tool and does not provide regulated financial advice. Always
                verify important decisions with a qualified accountant or HMRC directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
