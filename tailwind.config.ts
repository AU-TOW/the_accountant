import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4ff",
          100: "#e0e8ff",
          200: "#c7d4fe",
          300: "#a4b8fc",
          400: "#7b93f8",
          500: "#5a6ef2",
          600: "#3d47e6",
          700: "#2f36cb",
          800: "#1e2a5e",
          900: "#0f172a",
          950: "#080e1b",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(2rem, 5vw, 3.75rem)", { lineHeight: "1.1", fontWeight: "800" }],
        "h1": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.15", fontWeight: "700" }],
        "h2": ["clamp(1.375rem, 3vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "h3": ["clamp(1.125rem, 2.5vw, 1.5rem)", { lineHeight: "1.3", fontWeight: "600" }],
        "h4": ["clamp(1rem, 2vw, 1.25rem)", { lineHeight: "1.4", fontWeight: "600" }],
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)",
        "glass-lg": "0 16px 48px rgba(15, 23, 42, 0.12), 0 4px 16px rgba(15, 23, 42, 0.06)",
        "glass-xl": "0 24px 64px rgba(15, 23, 42, 0.16), 0 8px 24px rgba(15, 23, 42, 0.08)",
        "glow": "0 0 20px rgba(20, 184, 166, 0.15), 0 0 40px rgba(20, 184, 166, 0.05)",
        "glow-lg": "0 0 30px rgba(20, 184, 166, 0.25), 0 0 60px rgba(20, 184, 166, 0.1)",
        "card": "0 1px 3px rgba(15, 23, 42, 0.06), 0 6px 16px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 4px 12px rgba(15, 23, 42, 0.08), 0 12px 32px rgba(15, 23, 42, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(20, 184, 166, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(90, 110, 242, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(20, 184, 166, 0.05) 0px, transparent 50%)",
        "hero-mesh": "radial-gradient(at 20% 80%, rgba(20, 184, 166, 0.12) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(90, 110, 242, 0.08) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(20, 184, 166, 0.04) 0px, transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(20, 184, 166, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(20, 184, 166, 0.3)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
