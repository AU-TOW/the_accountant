# The Accountant

## Project Overview
AI accountant for UK business owners. Teaches as it works - no jargon, plain English, real-world examples. Proactively finds tax savings.

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + TypeScript
- **Hosting**: Vercel
- **Backend**: n8n webhooks (automation.autow-services.co.uk)
- **Database**: Supabase (separate project from AUTOW Shared)
- **AI**: Claude via n8n AI Agent node
- **OCR**: OpenAI GPT-4o Vision via n8n HTTP Request
- **Dev Port**: 3006

## Project Structure
```
src/
├── app/
│   ├── (auth)/          # Login, signup
│   ├── (app)/           # Authenticated routes (dashboard, chat, receipts, onboarding)
│   ├── api/             # API routes (proxy to n8n)
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Theme
├── components/
│   ├── landing/         # Landing page components
│   ├── chat/            # Chat interface
│   ├── receipts/        # Receipt scanning
│   ├── dashboard/       # Dashboard widgets
│   └── ui/              # Shared UI components
└── lib/
    ├── supabase/        # Client + server utils
    ├── ai/              # System prompts, tax knowledge
    ├── utils/           # Tax calculators, helpers
    └── constants/       # Tax rates, HMRC categories
```

## Brand
- Navy (#0f172a) + Teal (#14b8a6) + White
- Trust + warmth palette
- Professional but approachable

## Key Rules
- Tax calculations MUST be deterministic (never LLM-generated numbers)
- All tax rates in single file: `lib/constants/tax-rates.ts`
- Confidence badges on every AI tax answer
- HMRC citations on every tax answer
- Contextual disclaimers ("AI-Powered - Not a licensed accountant")

## Commands
```bash
npm run dev     # Start on port 3006
npm run build   # Production build
npm run lint    # ESLint
```
