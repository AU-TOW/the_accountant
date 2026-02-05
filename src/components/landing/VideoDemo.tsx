import { Play } from "lucide-react";

export default function VideoDemo() {
  return (
    <section className="py-16 sm:py-24 bg-navy-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          See it in action
        </h2>
        <p className="text-lg text-navy-300 mb-10 max-w-xl mx-auto">
          Watch how The Accountant breaks down a real tax scenario in plain
          English.
        </p>

        {/* Video placeholder */}
        <div className="relative aspect-video bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center group-hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/30">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-left">
            <p className="text-white text-sm font-medium">
              Demo: Salary vs Dividends explained
            </p>
            <p className="text-navy-400 text-xs">2:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}
