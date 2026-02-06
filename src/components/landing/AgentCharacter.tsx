"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const speechBubbles = [
  "Your company made 80k profit. If you take 12,570 salary and 50k as dividends, you save about 5,200 compared to all salary.",
  "You drove 8,000 business miles this year. At 45p per mile, that's 3,600 you can claim - that's about 720 back in your pocket.",
  "Your VAT return is due on 7th May. Based on your receipts, you're owed 1,840 back from HMRC.",
  "That home office? You can claim 6 per week flat rate, or we can calculate the actual costs. Usually actual costs save you more.",
];

export default function AgentCharacter() {
  const [currentBubble, setCurrentBubble] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBubble((prev) => (prev + 1) % speechBubbles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 sm:gap-6">
      {/* AI Character */}
      <div className="relative animate-float">
        <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-glow-lg">
          <div className="text-white text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl mb-0.5">🧮</div>
            <div className="text-[10px] sm:text-xs font-medium opacity-80">AI-Powered</div>
          </div>
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border-2 border-teal-400/30 animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute -inset-2 rounded-full border border-teal-400/10 animate-ping" style={{ animationDuration: "4s" }} />
      </div>

      {/* Speech bubble */}
      <div className="relative max-w-xs sm:max-w-sm md:max-w-md">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 glass-card rotate-45 border-b-0 border-r-0" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBubble}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="glass-card shadow-glass p-4 sm:p-5"
          >
            <p className="text-navy-700 text-sm sm:text-base leading-relaxed">
              &ldquo;{speechBubbles[currentBubble]}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>
        {/* Bubble indicators */}
        <div className="flex justify-center gap-2 mt-3">
          {speechBubbles.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBubble(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentBubble ? "bg-teal-500 w-5" : "bg-navy-200 hover:bg-navy-300"
              }`}
              aria-label={`Show quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
