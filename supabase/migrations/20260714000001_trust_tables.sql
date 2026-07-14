-- Trust and Privacy database tables
-- Run with: supabase db push (after Supabase is connected)

create table if not exists trust_documents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null default 'draft',
  content text,
  version text,
  published_at timestamptz,
  updated_at timestamptz default now()
);

create table if not exists cloud_consents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,
  request_id text,
  consent_scope text not null,
  selected_text_character_count integer,
  selected_source_type text,
  created_at timestamptz default now()
);

create table if not exists data_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  requested_at timestamptz default now(),
  completed_at timestamptz,
  admin_notes text
);

create table if not exists data_export_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  requested_at timestamptz default now(),
  completed_at timestamptz,
  download_expires_at timestamptz
);

create table if not exists provider_routes (
  id uuid primary key default gen_random_uuid(),
  route_key text not null unique,
  owner_label text not null,
  provider text not null,
  model_id text not null,
  enabled boolean default true,
  zdr_required boolean default false,
  data_collection_denied boolean default true,
  fallback_allowed boolean default false,
  privacy_notes text,
  updated_at timestamptz default now()
);

create table if not exists security_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references auth.users(id),
  event_type text not null,
  target_type text,
  target_id text,
  safe_metadata jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table cloud_consents enable row level security;
alter table data_deletion_requests enable row level security;
alter table data_export_requests enable row level security;
alter table security_audit_logs enable row level security;

-- Users can only see their own records
create policy "Users see own consents" on cloud_consents for select using (auth.uid() = profile_id);
create policy "Users see own deletion requests" on data_deletion_requests for select using (auth.uid() = profile_id);
create policy "Users see own export requests" on data_export_requests for select using (auth.uid() = profile_id);
-- Audit logs: users see their own actor logs only
create policy "Users see own audit logs" on security_audit_logs for select using (auth.uid() = actor_profile_id);
-- provider_routes and trust_documents: no public access (owner/admin only via service role)
