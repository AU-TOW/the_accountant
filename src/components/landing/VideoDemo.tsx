import { Play } from "lucide-react";

export default function VideoDemo() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-navy-900 relative overflow-hidden">
      {/* Decorative mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-navy-500/20 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-h1 text-white mb-3 sm:mb-4">
          See it in action
        </h2>
        <p className="text-base sm:text-lg text-navy-300 mb-8 sm:mb-10 max-w-xl mx-auto">
          Watch how The Accountant breaks down a real tax scenario in plain English.
        </p>

        {/* Video placeholder */}
        <div className="relative aspect-video glass-card-dark shadow-glass-xl overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow-lg">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" />
            </div>
          </div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-left">
            <p className="text-white text-xs sm:text-sm font-medium">
              Demo: Salary vs Dividends explained
            </p>
            <p className="text-navy-400 text-xs">2:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}
