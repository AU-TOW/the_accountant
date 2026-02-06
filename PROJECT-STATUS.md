# The Accountant - Full Project Status

> AI accountant for UK business owners that teaches as it works.
> Plain English, real pound amounts, no jargon.

**Last Updated:** 2026-02-06
**Built by:** George White (g.white.links@gmail.com) + Claude Code

---

## Quick Links

| Resource | URL |
|----------|-----|
| Live Site | https://the-accountant-mu.vercel.app |
| GitHub | https://github.com/AU-TOW/the_accountant |
| n8n Dashboard | https://automation.autow-services.co.uk |
| Supabase Dashboard | https://supabase.com/dashboard/project/uytljrorlihfqgtmxqvz |
| Local Dev | http://localhost:3006 |

---

## What We Built (10 Phases - ALL COMPLETE)

### Phase 0: Project Setup
Created Next.js 14 app with App Router, TypeScript, and Tailwind CSS. Navy (#0f172a) + teal (#14b8a6) brand theme. Deployed to Vercel with GitHub integration.

**Key files:**
- `package.json` - Next.js 14.2.35, React 18, Supabase, Framer Motion, Lucide icons
- `.env.local` - Supabase credentials + n8n webhook URLs
- `vercel.json` - Deployment config
- `CLAUDE.md` - AI coding instructions

### Phase 1: Landing Page
Full marketing landing page with 7 sections designed to convert visitors.

**Components built (src/components/landing/):**
| Component | What it does |
|-----------|-------------|
| `Navbar.tsx` | Sticky navigation with login/signup CTAs |
| `Hero.tsx` | Main headline + call to action |
| `AgentCharacter.tsx` | Animated AI character with cycling speech bubbles ("Let me check that for you...") |
| `RealWorldExamples.tsx` | 3 interactive cards showing real tax savings (Sarah saves 2,400, Mike saves 3,200, Emma saves 1,800) |
| `HowItWorks.tsx` | 4-step explainer with icons |
| `VideoDemo.tsx` | Video embed placeholder |
| `Pricing.tsx` | 3-tier pricing: Free / Essential (9.99/mo) / Pro (19.99/mo) |
| `Footer.tsx` | Links + legal disclaimer ("AI-Powered - Not a licensed accountant") |

### Phase 2: Database Schema
8 Supabase tables with 19 RLS policies, 4 triggers, and a private storage bucket.

**Tables:**
| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User profiles (extends auth.users) | business_type, experience_level, vat_registered, health_score, plan |
| `conversations` | Chat sessions | user_id, title, message_count |
| `messages` | Chat messages | conversation_id, role, content, confidence, citations |
| `receipts` | Scanned receipts | user_id, image_path, supplier, amount, hmrc_category, confidence_score, status |
| `transactions` | Financial transactions | user_id, receipt_id, type, amount, hmrc_category |
| `badge_definitions` | Gamification badges | name, description, criteria |
| `user_badges` | Earned badges | user_id, badge_id, earned_at |
| `micro_tasks` | Quick bookkeeping tasks | user_id, type, title, related_id |

**Storage:** `receipts` bucket (10MB max, images + PDF, PRIVATE - authenticated access only)

**Triggers:**
- `on_auth_user_created` - auto-creates public.users record when someone signs up
- `updated_at` triggers on users, conversations, receipts

**Script:** `scripts/run-schema.mjs` - executes schema against Supabase

### Phase 3: Auth + Onboarding
Supabase Auth with email/password, middleware-protected routes, and a 4-step onboarding wizard.

**Files:**
| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser-side Supabase client |
| `src/lib/supabase/server.ts` | Server-side Supabase client (cookies) |
| `src/lib/supabase/middleware.ts` | Auth session refresh helper |
| `src/middleware.ts` | Next.js middleware - protects /dashboard, /chat, /receipts |
| `src/app/(auth)/login/page.tsx` | Login page with Suspense boundary |
| `src/app/(auth)/signup/page.tsx` | Signup page |
| `src/app/(app)/layout.tsx` | Authenticated app shell with sidebar (Dashboard, AI Chat, Receipts) |
| `src/app/(app)/onboarding/page.tsx` | 4-step wizard: business type, experience level, VAT status, goals |

### Phase 4: AI Knowledge Layer
All UK tax knowledge hardcoded - the LLM NEVER does arithmetic.

**Files:**
| File | What it contains |
|------|-----------------|
| `src/lib/constants/tax-rates.ts` | All 2025/26 UK rates: income tax bands, NI thresholds, corp tax, dividend allowance, capital gains, VAT, mileage, deadlines |
| `src/lib/ai/hmrc-categories.ts` | 12 HMRC Self Assessment expense categories with box references |
| `src/lib/ai/experience-levels.ts` | 4 experience levels (beginner/intermediate/advanced/expert) with language rules |
| `src/lib/ai/system-prompt.ts` | Adaptive prompt builder - adjusts tone, detail, jargon based on user profile |
| `src/lib/ai/confidence-scoring.ts` | HIGH/MEDIUM/LOW confidence rules and display config |
| `src/lib/ai/citations.ts` | 25+ HMRC guidance URL mappings (HS222, BIM46901, etc.) |
| `src/lib/utils/tax-calculations.ts` | 9 deterministic calculators: income_tax, employee_ni, self_employed_ni, dividend_tax, salary_dividend, corp_tax, mileage, vat, vat_extract |

### Phase 5: n8n Chat Workflow
**n8n Workflow ID:** `Clld4rGfX8mupgOn`
**Webhook:** `POST https://automation.autow-services.co.uk/webhook/accountant-chat`
**Status:** TESTED AND WORKING

A 12-node n8n workflow that powers the AI chat:

```
Webhook → Prepare Input → Upsert Conversation → Save User Message
  → Fetch Context → Build AI Context → AI Agent (Claude Sonnet 4.5)
  → Process Response → Save Assistant Message → Respond to Webhook
                                    ↑
                            Tax Calculator (Code Tool)
                            - 9 deterministic calculators
                            - LLM calls this tool, never does math itself
```

**How it works:**
1. Frontend sends `{ userId, message, conversationId }` to webhook
2. Upserts conversation, saves user message to Postgres
3. Fetches user profile + last 10 messages for context
4. Builds dynamic system prompt (adapts language to experience level)
5. Claude Sonnet responds, using the Tax Calculator tool for any numbers
6. Response is tagged with confidence (HIGH/MEDIUM/LOW) and HMRC citations
7. Saved to database, returned to frontend

**Credentials used:** Anthropic (`tfWF2sixHedVn0HX`), Postgres (`OkAmNSvYOGaTqAYH`)

### Phase 6: Chat UI
Frontend chat interface that talks to the n8n workflow.

**Files:**
| File | Purpose |
|------|---------|
| `src/app/api/chat/route.ts` | Next.js API route - proxies to n8n webhook with auth check |
| `src/app/(app)/chat/page.tsx` | Chat page layout |
| `src/components/chat/ChatInterface.tsx` | Message container with auto-scroll |
| `src/components/chat/ChatMessage.tsx` | Message bubbles with confidence badges (green/amber/red) + clickable HMRC citation links |
| `src/components/chat/ChatInput.tsx` | Input field with attachment button |
| `src/components/chat/SuggestedQuestions.tsx` | Context-aware starter questions ("How much tax will I pay?", "Can I claim this?") |

### Phase 7: n8n Receipt OCR Workflow
**n8n Workflow ID:** `7fgZuSNVNQiIu2Hk`
**Webhook:** `POST https://automation.autow-services.co.uk/webhook/accountant-receipt`
**Status:** TESTED AND WORKING

A 13-node n8n workflow that extracts data from receipt photos:

```
Webhook → Prepare Input → Download Image → Prepare Base64
  → Call OpenAI Vision (gpt-4o) → Extract OCR Text
  → Categorise & Score → Update Receipt
  → Auto Process? ──yes──→ Create Transaction → Respond
                  └──no──→ Needs Review? ──yes──→ Create Review Task → Respond
                                         └──no──→ Respond
```

**How it works:**
1. Frontend uploads image to Supabase Storage, sends `{ receiptId, userId, imagePath }` to webhook
2. Downloads image from private Supabase Storage (service role key auth)
3. Converts to base64, builds OpenAI Vision API request (split architecture due to n8n sandbox restrictions)
4. GPT-4o extracts: supplier, date, total, VAT, currency, payment method, line items
5. Rule-based HMRC categorization across 12 expense categories with keyword matching
6. Confidence scoring (0-1):
   - **High (>=0.85):** Auto-creates transaction, marks as confirmed
   - **Medium (0.6-0.85):** Saves but requires user confirmation
   - **Low (<0.6):** Creates micro-task for manual review
7. Updates receipt record in database, returns results

**Technical detail:** n8n's task runner sandbox blocks `require()` and `fetch` in Code nodes. Solution: split into Code (binary->base64 using `this.helpers.getBinaryDataBuffer()`) + HTTP Request (API call) + Code (extract response).

**Credentials used:** OpenAI API key (hardcoded in Code node), Postgres (`OkAmNSvYOGaTqAYH`)

### Phase 8: Receipt Scanning UI
Frontend for uploading and managing receipts.

**Files:**
| File | Purpose |
|------|---------|
| `src/app/api/receipts/upload/route.ts` | API route - uploads to Supabase Storage, triggers n8n OCR workflow |
| `src/app/(app)/receipts/page.tsx` | Receipt list dashboard with status filters |
| `src/app/(app)/receipts/upload/page.tsx` | Upload page |
| `src/components/receipts/ReceiptUploader.tsx` | Drag-and-drop + camera capture via react-dropzone |
| `src/components/receipts/ReceiptCard.tsx` | Receipt display card with edit capability |
| `src/components/receipts/CategoryBadge.tsx` | Coloured HMRC category badge |

### Phase 9: Dashboard + Gamification
Main authenticated landing page with financial health tracking.

**Files:**
| File | Purpose |
|------|---------|
| `src/app/(app)/dashboard/page.tsx` | Dashboard page layout |
| `src/components/dashboard/FinancialHealthScore.tsx` | SVG gauge widget (0-100 score) |
| `src/components/dashboard/TaxSavingsCounter.tsx` | Running total of tax saved |
| `src/components/dashboard/MicroTaskCard.tsx` | Quick 2-minute bookkeeping tasks |
| `src/components/dashboard/QuickActions.tsx` | Action buttons: Scan Receipt, Ask AI, Review Expenses |

---

## Complete File Map (42 source files)

```
D:\Projects-AI\the-accountant\
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout
│   │   ├── page.tsx                            # Landing page (public)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx                  # Login
│   │   │   └── signup/page.tsx                 # Signup
│   │   ├── (app)/
│   │   │   ├── layout.tsx                      # App shell + sidebar
│   │   │   ├── chat/page.tsx                   # AI Chat
│   │   │   ├── dashboard/page.tsx              # Dashboard
│   │   │   ├── onboarding/page.tsx             # 4-step wizard
│   │   │   └── receipts/
│   │   │       ├── page.tsx                    # Receipt list
│   │   │       └── upload/page.tsx             # Upload page
│   │   └── api/
│   │       ├── chat/route.ts                   # Chat webhook proxy
│   │       └── receipts/upload/route.ts        # Receipt upload + OCR trigger
│   ├── components/
│   │   ├── landing/ (8 components)             # Navbar, Hero, Agent, Examples, etc.
│   │   ├── chat/ (4 components)                # Interface, Message, Input, Suggestions
│   │   ├── receipts/ (3 components)            # Uploader, Card, CategoryBadge
│   │   └── dashboard/ (4 components)           # HealthScore, Savings, Tasks, Actions
│   ├── lib/
│   │   ├── supabase/ (3 files)                 # Client, Server, Middleware
│   │   ├── ai/ (5 files)                       # Prompt, Categories, Levels, Confidence, Citations
│   │   ├── constants/ (1 file)                 # Tax rates 2025/26
│   │   └── utils/ (1 file)                     # Tax calculators
│   └── middleware.ts                            # Auth middleware
├── supabase/
│   └── schema.sql                              # Full database schema
├── scripts/
│   └── run-schema.mjs                          # Schema runner
├── CLAUDE.md                                   # AI coding instructions
├── PROGRESS.md                                 # Detailed build log
├── PROJECT-STATUS.md                           # This file
├── package.json                                # Dependencies
├── vercel.json                                 # Deployment config
├── tailwind.config.ts                          # Theme config
└── tsconfig.json                               # TypeScript config
```

---

## Infrastructure

### n8n (AI Backend)
| Detail | Value |
|--------|-------|
| Version | v2.6.3 |
| Host | Ubuntu VM (VirtualBox) at 192.168.1.84:5678 |
| Access | https://automation.autow-services.co.uk (Cloudflare Tunnel) |
| Tunnel ID | d6e8924a-fcc3-45aa-8d3f-cae4b2f2c421 |
| Docker | `--network host` (required for IPv6 Supabase connection) |
| Docker env | `NODE_TLS_REJECT_UNAUTHORIZED=0` (required for Supabase SSL) |
| API Key | Stored in `D:\Projects-AI\.credentials\master.env` |
| n8n-mcp | Configured in `~/.claude.json` (SSH -> Docker -> stdio) |

**n8n Credentials:**
| ID | Name | Used By |
|----|------|---------|
| `tfWF2sixHedVn0HX` | Anthropic | Chat workflow (Claude Sonnet) |
| `OkAmNSvYOGaTqAYH` | Postgres | Both workflows (direct Supabase connection) |
| - | OpenAI API key | Receipt OCR (hardcoded in Code node) |

### Supabase (Database)
| Detail | Value |
|--------|-------|
| Project Ref | uytljrorlihfqgtmxqvz |
| Region | eu-west-2 (London) |
| Direct DB | db.uytljrorlihfqgtmxqvz.supabase.co:5432 (IPv6 only) |
| Tables | 8 tables, 19 RLS policies, 4 triggers |
| Storage | `receipts` bucket (private, 10MB max) |
| Service Role Key | Ends in `...Shf9YVxTt...` (was typo `Shf8`, fixed) |
| Test User | testuser@gmail.com / TestPass123! (ID: 006eb73b-...) |

### Vercel (Frontend Hosting)
| Detail | Value |
|--------|-------|
| URL | https://the-accountant-mu.vercel.app |
| Git | https://github.com/AU-TOW/the_accountant |
| Env Vars | 6 configured (Supabase URL, anon key, service role key, n8n webhooks, app URL) |

### Cloudflare Tunnel
| Hostname | Routes To |
|----------|-----------|
| automation.autow-services.co.uk | 127.0.0.1:5678 (n8n) |

**Known issue:** Tunnel intermittently returns 502 after VM restart. Fix: `ssh ubuntu-vbox-root "systemctl restart cloudflared"` then wait ~5 seconds.

---

## End-to-End Test Results (2026-02-06)

### Chat Workflow: PASS
- 2 successful webhook executions
- Test 1: Sole trader tax on 50k profit -> correct breakdown with rates
- Test 2: Ltd vs sole trader comparison -> maintained conversation context
- Confidence: HIGH on both
- Database: conversations + messages tables populated correctly

### Receipt OCR Workflow: PASS
- Tested with real receipt image (Swiss hotel receipt, 963KB JPEG)
- Extracted: Berghotel Grosse Scheidegg, 2007-07-30, total 54.50, VAT 3.85
- 4 line items correctly identified (Latte Macchiato x2, Gloki, Schweinschnitzel, Chasspatzli)
- Confidence: 0.75 (mid-range, saved but not auto-processed)
- All 13 nodes executed successfully
- Database: receipts table updated, micro_tasks created for review

---

## Problems Solved During Build

| Problem | Root Cause | Solution |
|---------|-----------|----------|
| Supabase service role key "bad_jwt" | Single character typo (`Shf8` vs `Shf9`) | User provided correct key |
| Storage "Bucket not found" | URL used `/object/public/` but bucket was private | Changed to `/object/` with auth headers |
| RLS blocking receipt upload | Anonymous key can't write to storage | Sign in as user, upload with user JWT |
| Gemini OCR 429 rate limit | Free-tier daily quota exhausted (limit: 0) | Switched entirely to OpenAI GPT-4o |
| `require('https')` blocked in n8n | Task runner sandbox restricts modules | Rewrote without require |
| `fetch is not defined` in n8n | Task runner sandbox blocks fetch too | Split into Code (base64) + HTTP Request (API call) |
| Cloudflare tunnel 502 | Tunnel loses connection after restart | `systemctl restart cloudflared` + wait 5s |
| GPT-4o-mini returns all nulls for OCR | Model too weak for receipt extraction | Upgraded to GPT-4o |
| Test image not a receipt | Original test image was random JPEG | Uploaded real receipt from Wikipedia |

---

## What Needs Completing

### Immediate (Ready Now)
1. **Commit + Push + Redeploy** - PROGRESS.md and PROJECT-STATUS.md need committing. Push to GitHub triggers Vercel redeploy.

### Short-Term (Next Sprint)
2. **Move OpenAI API key to n8n credential** - Currently hardcoded in Code node. Should create proper n8n credential for security and easier rotation.
3. **Supabase email confirmation** - Test user email was confirmed via direct SQL. Need to configure Supabase email templates or disable email confirmation for development.
4. **Receipt upload flow polish** - The upload API route triggers n8n but the UI may need loading states and error handling for the OCR response.
5. **Update CLAUDE.md** - Still references "Google Gemini multimodal via n8n" for OCR. Should say OpenAI GPT-4o.

### Medium-Term (Future Features)
6. **Bank statement import** - CSV/OFX upload, parse transactions, auto-categorise with HMRC categories
7. **VAT return preparation** - Aggregate transactions by VAT period, generate Box 1-9 figures
8. **Making Tax Digital (MTD)** - HMRC API integration for digital tax submissions
9. **WhatsApp integration** - Send receipts via WhatsApp for quick capture
10. **Proactive insights** - Weekly email/notification with tax saving opportunities
11. **Multi-currency support** - Convert foreign receipts to GBP with exchange rates
12. **Recurring expenses** - Detect and auto-create monthly subscriptions
13. **Tax deadline reminders** - Notify users of upcoming HMRC deadlines
14. **Export to accountant** - Generate CSV/PDF reports for professional accountants
15. **Mobile app** - React Native wrapper for camera-first receipt scanning

### Technical Debt
16. **Error handling** - Add proper error boundaries and toast notifications across all pages
17. **Loading states** - Skeleton screens for dashboard, chat, and receipt list
18. **Tests** - No test suite exists yet. Need unit tests for tax calculators and integration tests for API routes.
19. **Rate limiting** - API routes have no rate limiting. Add to prevent abuse.
20. **Audit logging** - Track all tax-related interactions for compliance
21. **n8n-mcp container** - Currently stopped due to port 5679 conflict with n8n Task Broker when using `--network host`. Either fix port conflict or run n8n-mcp on a different port.

---

## How to Resume Development

### Local Development
```bash
cd D:\Projects-AI\the-accountant
npm run dev    # Starts on http://localhost:3006
```

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://uytljrorlihfqgtmxqvz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
N8N_CHAT_WEBHOOK_URL=https://automation.autow-services.co.uk/webhook/accountant-chat
N8N_RECEIPT_WEBHOOK_URL=https://automation.autow-services.co.uk/webhook/accountant-receipt
NEXT_PUBLIC_APP_URL=http://localhost:3006
```

### Deploying
```bash
cd D:\Projects-AI\the-accountant
git add -A && git commit -m "description" && git push
# Vercel auto-deploys from GitHub
```

### Testing n8n Workflows
```bash
# Chat (from Ubuntu VM)
ssh ubuntu-vbox "curl -s -X POST http://localhost:5678/webhook/accountant-chat \
  -H 'Content-Type: application/json' \
  -d '{\"userId\":\"006eb73b-d598-415e-8528-6bddd01898d4\",\"message\":\"How much tax on 50k?\"}'"

# Receipt OCR (from Ubuntu VM)
ssh ubuntu-vbox "curl -s -X POST http://localhost:5678/webhook/accountant-receipt \
  -H 'Content-Type: application/json' \
  -d '{\"receiptId\":\"some-uuid\",\"userId\":\"006eb73b-d598-415e-8528-6bddd01898d4\",\"imagePath\":\"006eb73b-.../receipt.jpg\"}'"
```

### If Cloudflare Tunnel Returns 502
```bash
ssh ubuntu-vbox-root "systemctl restart cloudflared"
# Wait 5 seconds, then retry
```

### Credentials
All API keys stored in: `D:\Projects-AI\.credentials\master.env`

---

*This document was generated on 2026-02-06 to capture the full state of The Accountant project after completing all 10 build phases and successfully testing both n8n AI workflows end-to-end.*
