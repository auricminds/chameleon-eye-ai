-- trust_document_requests
create table if not exists public.trust_document_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company_name text not null,
  work_email text not null,
  requested_document text not null,
  reason text not null,
  nda_required boolean not null default false,
  status text not null default 'received',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by text,
  admin_notes text
);

alter table public.trust_document_requests enable row level security;
-- Only service role / owner can read trust document requests
create policy "owner_read_trust_requests" on public.trust_document_requests
  for select using (false); -- override with owner check when auth is wired

-- trust_status_items
create table if not exists public.trust_status_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  item_name text not null,
  certification_type text,
  status text not null,
  auditor_or_certification_body text,
  certificate_number text,
  report_period_start date,
  report_period_end date,
  issue_date date,
  expiry_date date,
  scope_summary text,
  evidence_label text,
  availability text,
  nda_required boolean not null default false,
  last_verified_at timestamptz,
  public_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.trust_status_items enable row level security;
create policy "public_read_trust_status" on public.trust_status_items
  for select using (true);

-- trust_document_catalog
create table if not exists public.trust_document_catalog (
  id uuid primary key default gen_random_uuid(),
  document_key text not null unique,
  document_name text not null,
  public_or_private text not null default 'private',
  status text not null,
  available_on_request boolean not null default true,
  nda_required boolean not null default false,
  public_summary text,
  last_updated timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.trust_document_catalog enable row level security;
create policy "public_read_catalog" on public.trust_document_catalog
  for select using (public_or_private = 'public');

-- Seed trust_status_items
insert into public.trust_status_items (category, item_name, status, evidence_label, availability, nda_required, public_summary) values
  ('compliance', 'SOC 2 Type II', 'completed', 'Independent SOC 2 Type II report', 'Under NDA', true, 'SOC 2 Type II report available under NDA to qualified customers.'),
  ('compliance', 'ISO/IEC 27001', 'certified', 'ISO/IEC 27001 certificate', 'On request / public if approved', false, 'ISO/IEC 27001 certified information security management system.'),
  ('compliance', 'Penetration Testing', 'completed', 'Penetration test summary', 'Summary on request, full report under NDA', true, 'Penetration testing completed. Customer-safe summary available on request.'),
  ('compliance', 'Data Processing Agreement', 'available', 'Legal DPA', 'On request', false, 'DPA available for qualified business customers and approved partners.'),
  ('policy', 'No-Training Policy', 'published', 'Public policy', 'Public', false, 'Customer private files, prompts, and business data are not used to train a public AI model.'),
  ('policy', 'Subprocessor List', 'published', 'Public subprocessor page', 'Public', false, 'Active subprocessors and infrastructure providers are listed publicly.'),
  ('policy', 'Responsible Disclosure', 'published', 'Public reporting process', 'Public', false, 'Responsible disclosure process available at /trust/responsible-disclosure.')
on conflict do nothing;
