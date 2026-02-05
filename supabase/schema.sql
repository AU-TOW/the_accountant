-- The Accountant - Database Schema
-- Run this in a NEW Supabase project (not AUTOW Shared)
-- Region: eu-west-2 (London)

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  business_type text check (business_type in ('sole_trader', 'limited_company', 'partnership', 'freelancer')),
  experience_level text default 'beginner' check (experience_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  vat_registered boolean default false,
  vat_number text,
  company_name text,
  financial_year_end text default '04-05', -- MM-DD format
  goals text[] default '{}',
  onboarding_completed boolean default false,
  -- Gamification
  total_tax_saved numeric(12,2) default 0,
  health_score integer default 0 check (health_score >= 0 and health_score <= 100),
  streak_days integer default 0,
  -- Subscription
  plan text default 'free' check (plan in ('free', 'essential', 'pro')),
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- CONVERSATIONS
-- ============================================================
create table public.conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  title text default 'New Chat',
  message_count integer default 0,
  last_message_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- MESSAGES
-- ============================================================
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations on delete cascade not null,
  user_id uuid references public.users on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  confidence_score text check (confidence_score in ('HIGH', 'MEDIUM', 'LOW')),
  citations jsonb default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- ============================================================
-- RECEIPTS
-- ============================================================
create table public.receipts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  -- OCR data
  supplier text,
  amount numeric(12,2),
  vat_amount numeric(12,2),
  currency text default 'GBP',
  receipt_date date,
  -- Categorisation
  hmrc_category text,
  sub_category text,
  description text,
  -- Processing
  image_path text, -- Supabase storage path
  ocr_raw jsonb default '{}'::jsonb,
  confidence_score numeric(3,2) check (confidence_score >= 0 and confidence_score <= 1),
  status text default 'pending' check (status in ('pending', 'processing', 'review', 'confirmed', 'rejected')),
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TRANSACTIONS (expenses + income)
-- ============================================================
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  receipt_id uuid references public.receipts on delete set null,
  type text not null check (type in ('expense', 'income')),
  amount numeric(12,2) not null,
  vat_amount numeric(12,2) default 0,
  description text,
  hmrc_category text not null,
  sub_category text,
  transaction_date date not null,
  -- Source
  source text default 'manual' check (source in ('manual', 'receipt', 'bank')),
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- BADGE DEFINITIONS
-- ============================================================
create table public.badge_definitions (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text not null,
  icon text not null, -- emoji or icon name
  criteria jsonb not null, -- { "type": "receipts_scanned", "threshold": 10 }
  created_at timestamptz default now()
);

-- ============================================================
-- USER BADGES
-- ============================================================
create table public.user_badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  badge_id uuid references public.badge_definitions on delete cascade not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- ============================================================
-- MICRO TASKS (2-min bookkeeping tasks)
-- ============================================================
create table public.micro_tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  type text not null check (type in ('review_receipt', 'categorise_expense', 'confirm_transaction', 'answer_question')),
  title text not null,
  description text,
  related_id uuid, -- receipt_id or transaction_id
  status text default 'pending' check (status in ('pending', 'completed', 'dismissed')),
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_conversations_user on public.conversations(user_id);
create index idx_messages_conversation on public.messages(conversation_id);
create index idx_messages_user on public.messages(user_id);
create index idx_receipts_user on public.receipts(user_id);
create index idx_receipts_status on public.receipts(status);
create index idx_transactions_user on public.transactions(user_id);
create index idx_transactions_date on public.transactions(transaction_date);
create index idx_transactions_category on public.transactions(hmrc_category);
create index idx_micro_tasks_user_status on public.micro_tasks(user_id, status);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.users enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.receipts enable row level security;
alter table public.transactions enable row level security;
alter table public.user_badges enable row level security;
alter table public.micro_tasks enable row level security;

-- Users can only access their own data
create policy "Users can read own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

create policy "Users can read own conversations" on public.conversations for select using (auth.uid() = user_id);
create policy "Users can insert own conversations" on public.conversations for insert with check (auth.uid() = user_id);
create policy "Users can update own conversations" on public.conversations for update using (auth.uid() = user_id);
create policy "Users can delete own conversations" on public.conversations for delete using (auth.uid() = user_id);

create policy "Users can read own messages" on public.messages for select using (auth.uid() = user_id);
create policy "Users can insert own messages" on public.messages for insert with check (auth.uid() = user_id);

create policy "Users can read own receipts" on public.receipts for select using (auth.uid() = user_id);
create policy "Users can insert own receipts" on public.receipts for insert with check (auth.uid() = user_id);
create policy "Users can update own receipts" on public.receipts for update using (auth.uid() = user_id);

create policy "Users can read own transactions" on public.transactions for select using (auth.uid() = user_id);
create policy "Users can insert own transactions" on public.transactions for insert with check (auth.uid() = user_id);
create policy "Users can update own transactions" on public.transactions for update using (auth.uid() = user_id);
create policy "Users can delete own transactions" on public.transactions for delete using (auth.uid() = user_id);

create policy "Users can read own badges" on public.user_badges for select using (auth.uid() = user_id);

create policy "Users can read own micro tasks" on public.micro_tasks for select using (auth.uid() = user_id);
create policy "Users can update own micro tasks" on public.micro_tasks for update using (auth.uid() = user_id);

-- Badge definitions are public read
alter table public.badge_definitions enable row level security;
create policy "Anyone can read badge definitions" on public.badge_definitions for select using (true);

-- ============================================================
-- TRIGGERS: auto-update updated_at
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.users
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.conversations
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.receipts
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.transactions
  for each row execute function public.handle_updated_at();

-- ============================================================
-- TRIGGER: create user profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- STORAGE: receipt images bucket
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'receipts',
  'receipts',
  false,
  10485760, -- 10MB
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- Storage policies
create policy "Users can upload own receipts" on storage.objects
  for insert with check (
    bucket_id = 'receipts' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can read own receipts" on storage.objects
  for select using (
    bucket_id = 'receipts' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================
-- SEED: Badge definitions
-- ============================================================
insert into public.badge_definitions (name, description, icon, criteria) values
  ('First Question', 'Asked your first tax question', '💬', '{"type": "questions_asked", "threshold": 1}'),
  ('Receipt Rookie', 'Scanned your first receipt', '📸', '{"type": "receipts_scanned", "threshold": 1}'),
  ('Scanner Pro', 'Scanned 50 receipts', '🏆', '{"type": "receipts_scanned", "threshold": 50}'),
  ('Tax Saver', 'Found your first tax saving', '💰', '{"type": "tax_saved", "threshold": 1}'),
  ('Bookkeeping Streak', 'Logged in 7 days in a row', '🔥', '{"type": "streak_days", "threshold": 7}'),
  ('Knowledge Seeker', 'Asked 25 tax questions', '📚', '{"type": "questions_asked", "threshold": 25}'),
  ('Penny Pincher', 'Saved over 1000 in tax', '🐷', '{"type": "tax_saved_amount", "threshold": 1000}'),
  ('Tax Whiz', 'Saved over 5000 in tax', '🧙', '{"type": "tax_saved_amount", "threshold": 5000}');
