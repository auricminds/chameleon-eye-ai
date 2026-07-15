-- Admin users and sessions
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('super_admin','operations_admin','finance_admin','support_admin','developer_admin','security_admin','content_moderator','analyst','read_only_admin')),
  full_name text NOT NULL,
  is_active boolean DEFAULT true,
  mfa_enabled boolean DEFAULT false,
  last_login_at timestamptz,
  login_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES admin_users(id),
  token_hash text UNIQUE NOT NULL,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz
);

CREATE TABLE admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES admin_users(id),
  admin_email text NOT NULL,
  action text NOT NULL,
  target_type text,
  target_id text,
  reason text,
  metadata jsonb DEFAULT '{}',
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Platform users (managed by admin, linked to Supabase auth)
CREATE TABLE platform_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid UNIQUE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  company text,
  country text,
  timezone text,
  language text DEFAULT 'en',
  registration_source text DEFAULT 'web',
  referral_source text,
  account_status text DEFAULT 'active' CHECK (account_status IN ('active','suspended','banned','locked','pending_verification')),
  email_verified boolean DEFAULT false,
  email_verified_at timestamptz,
  last_login_at timestamptz,
  last_active_at timestamptz,
  login_count integer DEFAULT 0,
  suspension_reason text,
  ban_reason text,
  suspension_ends_at timestamptz,
  internal_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- API applications
CREATE TABLE api_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES platform_users(id),
  organization text,
  website text,
  business_purpose text NOT NULL,
  intended_use text NOT NULL,
  expected_monthly_requests integer,
  expected_monthly_tokens bigint,
  required_models text[],
  requested_scopes text[],
  callback_urls text[],
  country text,
  terms_accepted boolean DEFAULT false,
  terms_accepted_at timestamptz,
  status text DEFAULT 'submitted' CHECK (status IN ('draft','submitted','under_review','more_information_required','approved','rejected','suspended','revoked')),
  assigned_reviewer_id uuid REFERENCES admin_users(id),
  admin_notes text,
  rejection_reason text,
  approved_at timestamptz,
  rejected_at timestamptz,
  monthly_token_quota bigint,
  requests_per_minute integer,
  requests_per_day integer,
  allowed_models text[],
  allowed_scopes text[],
  allowed_domains text[],
  allowed_ips inet[],
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- API keys
CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES api_applications(id),
  user_id uuid REFERENCES platform_users(id),
  key_name text NOT NULL,
  key_prefix text NOT NULL,
  key_suffix text NOT NULL,
  key_hash text UNIQUE NOT NULL,
  environment text DEFAULT 'live' CHECK (environment IN ('test','live')),
  status text DEFAULT 'active' CHECK (status IN ('active','disabled','expired','revoked','compromised')),
  scopes text[],
  allowed_models text[],
  allowed_ips inet[],
  allowed_domains text[],
  monthly_quota bigint,
  requests_per_minute integer,
  requests_per_day integer,
  total_requests bigint DEFAULT 0,
  total_tokens bigint DEFAULT 0,
  current_month_requests bigint DEFAULT 0,
  current_month_tokens bigint DEFAULT 0,
  last_used_at timestamptz,
  last_used_ip inet,
  expires_at timestamptz,
  revoked_at timestamptz,
  revoke_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI usage logs
CREATE TABLE ai_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trace_id uuid DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES platform_users(id),
  api_key_id uuid REFERENCES api_keys(id),
  session_id text,
  conversation_id text,
  request_source text CHECK (request_source IN ('website_chat','mobile_app','desktop_app','public_api','internal_system')),
  provider text,
  model text,
  requested_model text,
  actual_model text,
  started_at timestamptz NOT NULL,
  completed_at timestamptz,
  latency_ms integer,
  is_streaming boolean DEFAULT false,
  input_tokens bigint DEFAULT 0,
  output_tokens bigint DEFAULT 0,
  cached_input_tokens bigint DEFAULT 0,
  cached_output_tokens bigint DEFAULT 0,
  reasoning_tokens bigint DEFAULT 0,
  audio_tokens bigint DEFAULT 0,
  image_count integer DEFAULT 0,
  total_tokens bigint DEFAULT 0,
  provider_cost_micros bigint DEFAULT 0,
  user_charge_micros bigint DEFAULT 0,
  currency text DEFAULT 'USD',
  pricing_version_id text,
  request_status text DEFAULT 'success' CHECK (request_status IN ('success','error','timeout','rate_limited','moderated','cancelled')),
  http_status integer,
  error_category text,
  retry_count integer DEFAULT 0,
  is_billable boolean DEFAULT true,
  credits_applied boolean DEFAULT false,
  idempotency_key text UNIQUE,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Token credit ledger (immutable)
CREATE TABLE token_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES platform_users(id) NOT NULL,
  subscription_id uuid,
  payment_id text,
  ai_request_id uuid REFERENCES ai_usage_logs(id),
  entry_type text NOT NULL CHECK (entry_type IN ('plan_allocation','monthly_renewal','purchased_credits','promotional_credits','admin_adjustment','usage_deduction','usage_reversal','refund_reversal','expiration','migration_adjustment')),
  credit_amount bigint NOT NULL,
  debit_amount bigint NOT NULL DEFAULT 0,
  balance_after bigint NOT NULL,
  reason text,
  admin_user_id uuid REFERENCES admin_users(id),
  admin_reason text,
  idempotency_key text UNIQUE,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Subscription plans
CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  internal_name text NOT NULL,
  public_name text NOT NULL,
  description text,
  status text DEFAULT 'draft' CHECK (status IN ('draft','active','hidden','archived')),
  monthly_price_micros bigint DEFAULT 0,
  annual_price_micros bigint DEFAULT 0,
  currency text DEFAULT 'USD',
  trial_period_days integer DEFAULT 0,
  monthly_tokens bigint DEFAULT 0,
  monthly_requests integer,
  api_access boolean DEFAULT false,
  api_key_count integer DEFAULT 0,
  allowed_models text[],
  requests_per_minute integer,
  requests_per_day integer,
  max_context_size integer,
  image_generation boolean DEFAULT false,
  audio_access boolean DEFAULT false,
  file_upload boolean DEFAULT false,
  storage_limit_mb integer,
  team_seats integer DEFAULT 1,
  support_level text DEFAULT 'standard',
  overage_policy text DEFAULT 'block' CHECK (overage_policy IN ('block','charge','notify')),
  overage_price_micros bigint DEFAULT 0,
  credit_expiration_days integer,
  feature_entitlements jsonb DEFAULT '{}',
  payment_provider_monthly_price_id text,
  payment_provider_annual_price_id text,
  effective_date date,
  version integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES platform_users(id) NOT NULL,
  plan_id uuid REFERENCES subscription_plans(id) NOT NULL,
  status text DEFAULT 'trialing' CHECK (status IN ('trialing','active','past_due','unpaid','paused','cancel_at_period_end','cancelled','expired','incomplete')),
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly','annual')),
  start_date date,
  trial_end_date date,
  current_period_start date,
  current_period_end date,
  next_renewal_date date,
  cancelled_at timestamptz,
  cancellation_reason text,
  auto_renewal boolean DEFAULT true,
  payment_provider text,
  payment_provider_customer_id text,
  payment_provider_subscription_id text,
  included_tokens bigint DEFAULT 0,
  used_tokens bigint DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS: admin tables are service-role only
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- No public access — all via service role in backend
