# The Accountant - Build Progress

## Project Overview
AI accountant for UK business owners that teaches as it works. Plain English, real pound amounts, no jargon.

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS (navy #0f172a + teal #14b8a6)
- **Hosting**: Vercel → https://the-accountant-mu.vercel.app
- **Database**: Supabase (project ref: uytljrorlihfqgtmxqvz, eu-west-2)
- **AI Backend**: n8n webhooks on Ubuntu VM (192.168.1.84)
- **GitHub**: https://github.com/AU-TOW/the_accountant
- **Dev Port**: 3006
- **Credentials**: D:\Projects-AI\.credentials\master.env

## Phase Status

### Phase 0: Project Setup - COMPLETE
- Next.js 14 app created at D:\Projects-AI\the-accountant
- TypeScript + Tailwind configured with navy/teal theme
- Dependencies installed: @supabase/supabase-js, @supabase/ssr, react-dropzone, react-markdown, lucide-react, framer-motion, zod, date-fns
- .env.local configured with real Supabase + n8n webhook URLs
- vercel.json + CLAUDE.md created

### Phase 1: Landing Page - COMPLETE
- components/landing/Navbar.tsx - Sticky nav
- components/landing/Hero.tsx - Headline + CTA
- components/landing/AgentCharacter.tsx - Animated AI character with cycling speech bubbles
- components/landing/RealWorldExamples.tsx - 3 interactive tax saving cards (Sarah/Mike/Emma)
- components/landing/HowItWorks.tsx - 4 steps with icons
- components/landing/VideoDemo.tsx - Video embed section
- components/landing/Pricing.tsx - 3-tier cards (Free/Essential £9.99/Pro £19.99)
- components/landing/Footer.tsx - Links + legal disclaimer

### Phase 2: Database Schema - COMPLETE
- supabase/schema.sql executed successfully
- 8 tables: users, conversations, messages, receipts, transactions, badge_definitions, user_badges, micro_tasks
- 19 RLS policies, 4 triggers, storage bucket for receipts
- 8 badge definitions seeded
- Script: scripts/run-schema.mjs

### Phase 3: Auth + Onboarding - COMPLETE
- lib/supabase/client.ts - Browser Supabase client
- lib/supabase/server.ts - Server Supabase client
- lib/supabase/middleware.ts - Auth middleware helper
- middleware.ts - Next.js middleware
- app/(auth)/login/page.tsx - Login with Suspense boundary
- app/(auth)/signup/page.tsx - Signup
- app/(app)/layout.tsx - App shell with sidebar (Dashboard, AI Chat, Receipts)
- app/(app)/onboarding/page.tsx - 4-step wizard (business type, experience, VAT, goals)

### Phase 4: AI Knowledge Layer - COMPLETE
- lib/constants/tax-rates.ts - All 2025/26 UK tax rates, thresholds, deadlines
- lib/ai/hmrc-categories.ts - 12 HMRC expense categories with SA box refs
- lib/ai/experience-levels.ts - 4 levels with language rules + onboarding questions
- lib/ai/system-prompt.ts - Adaptive prompt builder based on user profile
- lib/ai/confidence-scoring.ts - HIGH/MEDIUM/LOW confidence config
- lib/ai/citations.ts - 25+ HMRC guidance URL mappings
- lib/utils/tax-calculations.ts - Deterministic calculators (salary/dividend split, VAT, Corp Tax, mileage, NI)

### Phase 5: n8n Chat Workflow - COMPLETE
**n8n Workflow ID**: Clld4rGfX8mupgOn
**Webhook**: POST https://automation.autow-services.co.uk/webhook/accountant-chat

Built via n8n-mcp tools (12 nodes):
1. Webhook trigger (POST) → receives { userId, message, conversationId }
2. Prepare Input (Code) → validates, generates conversationId if missing, escapes SQL
3. Upsert Conversation (Postgres) → creates/updates conversation record
4. Save User Message (Postgres) → saves user message to messages table
5. Fetch Context (Postgres) → fetches user profile + last 10 messages
6. Build AI Context (Code) → builds dynamic system prompt with experience-level language rules, tax rates, confidence rules, citation keys
7. The Accountant (AI Agent) → Claude Sonnet 4.5 with system prompt + user message
8. Claude Sonnet (LLM) → Anthropic LLM sub-node for the Agent
9. Tax Calculator (Code Tool) → deterministic UK tax calculator with 9 calculation types (income_tax, employee_ni, self_employed_ni, dividend_tax, salary_dividend, corp_tax, mileage, vat, vat_extract)
10. Process Response (Code) → extracts confidence (HIGH/MEDIUM/LOW), citation keys → HMRC URLs, formats response
11. Save Assistant Message (Postgres) → saves response + confidence + citations to messages
12. Respond to Webhook → returns { response, confidence, citations, conversationId }

Key features:
- LLM NEVER does arithmetic — all tax calculations via deterministic Code Tool
- Every response includes confidence badge (HIGH/MEDIUM/LOW)
- Every tax answer cites specific HMRC guidance URLs
- Language adapts to user's experience level (beginner/intermediate/advanced/expert)
- All 2025/26 UK tax rates hardcoded in calculator

### Phase 6: Chat UI - COMPLETE
- app/api/chat/route.ts - Proxy to n8n webhook with auth check
- app/(app)/chat/page.tsx - Chat page
- components/chat/ChatInterface.tsx - Message container with auto-scroll
- components/chat/ChatMessage.tsx - Message bubbles with confidence badges + HMRC citations
- components/chat/ChatInput.tsx - Input with attachment support
- components/chat/SuggestedQuestions.tsx - Context-aware starter questions

### Phase 7: n8n Receipt OCR Workflow - COMPLETE
**n8n Workflow ID**: 7fgZuSNVNQiIu2Hk
**Webhook**: POST https://automation.autow-services.co.uk/webhook/accountant-receipt

Built via n8n-mcp tools (13 nodes):
1. Webhook trigger (POST) → receives { receiptId, userId, imagePath }
2. Prepare Input (Code) → validates input, builds Supabase Storage URL with auth keys
3. Download Image (HTTP Request) → downloads receipt image from private Supabase Storage (service role key auth)
4. Prepare Base64 (Code) → converts binary image to base64, builds OpenAI Vision API request body
5. Call OpenAI Vision (HTTP Request) → POST to OpenAI chat/completions with gpt-4o vision
6. Extract OCR Text (Code) → extracts response text from OpenAI JSON response
7. Categorise & Score (Code) → keyword-based HMRC expense categorization (12 categories) + confidence scoring (0-1)
8. Update Receipt (Postgres) → updates receipt record with OCR data, category, confidence
9. Auto Process? (IF) → confidence >= 0.85 branch
10. Create Transaction (Postgres) → auto-creates expense transaction for high confidence
11. Needs Review? (IF) → confidence < 0.6 branch
12. Create Review Task (Postgres) → creates micro-task for user to review low confidence
13. Respond to Webhook → returns { extractedData, category, confidence, autoProcessed }

Key features:
- OpenAI GPT-4o Vision for multimodal OCR (API key in Code node, no n8n credential needed)
- Split architecture: Code (binary→base64) + HTTP Request (API call) to work around n8n task runner sandbox restrictions (no fetch/require)
- Rule-based HMRC categorization with keyword matching across 12 expense categories
- Confidence scoring: high (>=0.85) auto-processes, low (<0.6) flags for user review
- Mid-range confidence (0.6-0.85) saved but not auto-processed
- Results editable by user before final confirmation
- Private Supabase Storage bucket with service role key authentication

### Phase 8: Receipt Scanning UI - COMPLETE
- app/api/receipts/upload/route.ts - Upload to Supabase Storage + trigger n8n
- app/(app)/receipts/page.tsx - Receipt list dashboard
- app/(app)/receipts/upload/page.tsx - Upload page
- components/receipts/ReceiptUploader.tsx - Drag-drop + camera via react-dropzone
- components/receipts/ReceiptCard.tsx - Display with edit capability
- components/receipts/CategoryBadge.tsx - HMRC category badge

### Phase 9: Dashboard + Gamification - COMPLETE
- app/(app)/dashboard/page.tsx - Main authenticated landing
- components/dashboard/FinancialHealthScore.tsx - SVG gauge (0-100)
- components/dashboard/TaxSavingsCounter.tsx - Running total saved
- components/dashboard/MicroTaskCard.tsx - Quick 2-min bookkeeping tasks
- components/dashboard/QuickActions.tsx - Scan receipt, Ask AI, Review expenses

---

## Infrastructure Notes

### n8n Setup
- n8n v2.6.3 running on Ubuntu VM (192.168.1.84:5678) — Docker with `--network host`
- Accessible via: https://automation.autow-services.co.uk
- Cloudflare tunnel ID: d6e8924a-fcc3-45aa-8d3f-cae4b2f2c421
- n8n API key: in D:\Projects-AI\.credentials\master.env
- Docker env: `NODE_TLS_REJECT_UNAUTHORIZED=0` (required for Supabase SSL)
- n8n credentials used:
  - Anthropic (`tfWF2sixHedVn0HX`) — for Claude Sonnet in Chat workflow
  - OpenAI API key — for GPT-4o Vision OCR in Receipt workflow (hardcoded in Code node, not an n8n credential)
  - Postgres (`OkAmNSvYOGaTqAYH`) — direct connection to The Accountant Supabase (db.uytljrorlihfqgtmxqvz.supabase.co:5432)

### n8n-mcp (Claude Code Integration)
- Configured in ~/.claude.json under mcpServers
- Runs via: SSH → Docker → stdio on Ubuntu VM
- Provides: 7 documentation tools + workflow CRUD + execution
- **Note: n8n-mcp container currently STOPPED** (port 5679 conflicts with n8n Task Broker when using --network host)

### Supabase (The Accountant)
- Project: uytljrorlihfqgtmxqvz
- Region: eu-west-2 (London)
- Password: in scripts/run-schema.mjs
- Direct connection: `db.uytljrorlihfqgtmxqvz.supabase.co:5432` (IPv6 only — requires --network host on Docker)
- Tables: users, conversations, messages, receipts, transactions, badge_definitions, user_badges, micro_tasks
- Storage bucket: receipts (10MB max, images + PDF, **private** — n8n uses service role key)
- Service role key: Fixed (was `Shf8` typo, correct is `Shf9`)
- Test user: testuser@gmail.com / TestPass123! (ID: 006eb73b-d598-415e-8528-6bddd01898d4)

### Vercel Deployment
- URL: https://the-accountant-mu.vercel.app
- All 6 env vars set via Vercel API
- Git: https://github.com/AU-TOW/the_accountant

### Git Config (repo-local)
- Name: George White
- Email: g.white.links@gmail.com

---

## End-to-End Test Results (2026-02-06)

### Phase 5 - Chat Workflow: PASS
- 2 successful webhook executions via https://automation.autow-services.co.uk/webhook/accountant-chat
- Tested: sole trader tax calculation (£50k profit) → correct response with breakdown
- Tested: follow-up conversation (Ltd vs sole trader comparison) → maintained context
- Confidence badges: HIGH on both responses
- Conversation persistence: working (same conversationId across messages)
- Database writes: conversations + messages tables populated correctly

### Phase 7 - Receipt OCR Workflow: PASS
- Switched from Gemini Vision to OpenAI GPT-4o (Gemini free-tier quota exhausted)
- Split architecture to work around n8n task runner sandbox (no fetch/require allowed):
  - Prepare Base64 (Code) → binary to base64 + builds request body
  - Call OpenAI Vision (HTTP Request) → sends to OpenAI API
  - Extract OCR Text (Code) → extracts response
- Full pipeline test with real receipt image (Swiss hotel receipt, 963KB):
  - Supplier: Berghotel Grosse Scheidegg ✓
  - Date: 2007-07-30 ✓
  - Total: 54.50 ✓
  - VAT: 3.85 ✓
  - Line items: 4 items correctly extracted ✓
  - Confidence: 0.75 (mid-range — saved but not auto-processed)
- All 13 nodes executed successfully
- Database writes: receipts table updated, micro_tasks created for review

---

## Next Steps (in order)
1. ~~Start new Claude Code session (to pick up n8n-mcp tools)~~ DONE
2. ~~Build Phase 5: n8n Chat Workflow using n8n-mcp~~ DONE (ID: Clld4rGfX8mupgOn)
3. ~~Build Phase 7: n8n Receipt OCR Workflow using n8n-mcp~~ DONE (ID: 7fgZuSNVNQiIu2Hk)
4. ~~Test end-to-end: Chat~~ DONE (2 successful executions)
5. ~~Test end-to-end: Receipt OCR~~ DONE (switched Gemini→OpenAI GPT-4o, full pipeline verified)
6. ~~Regenerate Supabase service role key~~ DONE (was a typo: Shf8→Shf9)
7. Commit + push + redeploy to Vercel
8. Future: Bank import, VAT returns, MTD, WhatsApp, proactive insights
