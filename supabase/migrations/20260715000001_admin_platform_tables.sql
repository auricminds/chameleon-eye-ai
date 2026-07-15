-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES platform_users(id),
  subscription_id uuid REFERENCES subscriptions(id),
  amount_micros bigint NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'succeeded' CHECK (status IN ('pending','succeeded','failed','refunded','partially_refunded','disputed')),
  payment_provider text NOT NULL,
  provider_payment_id text UNIQUE,
  provider_invoice_id text,
  description text,
  failure_reason text,
  refund_amount_micros bigint DEFAULT 0,
  refund_reason text,
  refunded_at timestamptz,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES platform_users(id),
  subscription_id uuid REFERENCES subscriptions(id),
  payment_id uuid REFERENCES payments(id),
  provider_invoice_id text UNIQUE,
  amount_micros bigint NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'draft' CHECK (status IN ('draft','open','paid','void','uncollectible')),
  period_start date,
  period_end date,
  due_date date,
  paid_at timestamptz,
  pdf_url text,
  created_at timestamptz DEFAULT now()
);

-- AI models registry
CREATE TABLE IF NOT EXISTS ai_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  model_id text NOT NULL UNIQUE,
  display_name text NOT NULL,
  is_active boolean DEFAULT true,
  is_public boolean DEFAULT true,
  api_available boolean DEFAULT true,
  capabilities text[] DEFAULT '{}',
  context_size integer,
  input_price_micros bigint DEFAULT 0,
  output_price_micros bigint DEFAULT 0,
  cached_input_price_micros bigint DEFAULT 0,
  image_price_micros bigint DEFAULT 0,
  audio_price_micros bigint DEFAULT 0,
  platform_markup_percent numeric DEFAULT 0,
  allowed_plans text[] DEFAULT '{}',
  requests_per_minute integer,
  is_maintenance boolean DEFAULT false,
  health_status text DEFAULT 'healthy' CHECK (health_status IN ('healthy','degraded','down','unknown')),
  last_successful_request_at timestamptz,
  error_rate_percent numeric DEFAULT 0,
  avg_latency_ms integer,
  pricing_version integer DEFAULT 1,
  fallback_model_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI providers registry
CREATE TABLE IF NOT EXISTS ai_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  is_active boolean DEFAULT true,
  is_maintenance boolean DEFAULT false,
  has_secret_configured boolean DEFAULT false,
  total_requests bigint DEFAULT 0,
  total_tokens bigint DEFAULT 0,
  total_cost_micros bigint DEFAULT 0,
  error_rate_percent numeric DEFAULT 0,
  avg_latency_ms integer,
  last_success_at timestamptz,
  last_error_at timestamptz,
  last_error_message text,
  budget_warning_micros bigint,
  budget_hard_limit_micros bigint,
  fallback_priority integer DEFAULT 99,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Support tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES platform_users(id),
  subject text NOT NULL,
  body text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open','in_progress','waiting_on_user','resolved','closed')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low','normal','high','critical')),
  assigned_admin_id uuid REFERENCES admin_users(id),
  admin_notes text,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Webhook events
CREATE TABLE IF NOT EXISTS webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  event_type text NOT NULL,
  provider_event_id text UNIQUE,
  raw_payload jsonb NOT NULL,
  processing_status text DEFAULT 'pending' CHECK (processing_status IN ('pending','processing','succeeded','failed','ignored')),
  attempts integer DEFAULT 0,
  last_error text,
  related_user_id uuid REFERENCES platform_users(id),
  related_payment_id uuid REFERENCES payments(id),
  related_subscription_id uuid REFERENCES subscriptions(id),
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Feature flags
CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  display_name text NOT NULL,
  description text,
  is_enabled boolean DEFAULT false,
  enabled_for_plans text[] DEFAULT '{}',
  enabled_for_users uuid[] DEFAULT '{}',
  rollout_percentage integer DEFAULT 0,
  created_by uuid REFERENCES admin_users(id),
  updated_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Platform settings (key-value store for admin-configurable settings)
CREATE TABLE IF NOT EXISTS platform_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  description text,
  category text DEFAULT 'general',
  updated_by uuid REFERENCES admin_users(id),
  updated_at timestamptz DEFAULT now()
);

-- Notifications log
CREATE TABLE IF NOT EXISTS admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES admin_users(id),
  type text NOT NULL,
  title text NOT NULL,
  body text,
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Promotional credits
CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE,
  display_name text NOT NULL,
  description text,
  credit_amount bigint NOT NULL,
  max_uses integer,
  uses_count integer DEFAULT 0,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Seed initial AI providers
INSERT INTO ai_providers (name, display_name, is_active, has_secret_configured, fallback_priority) VALUES
  ('openrouter', 'OpenRouter', true, true, 1),
  ('openai', 'OpenAI', false, false, 2),
  ('anthropic', 'Anthropic', false, false, 3),
  ('google', 'Google AI', false, false, 4)
ON CONFLICT (name) DO NOTHING;

-- Seed initial AI models
INSERT INTO ai_models (provider, model_id, display_name, is_active, context_size, input_price_micros, output_price_micros) VALUES
  ('openrouter', 'anthropic/claude-sonnet-4-5', 'Claude Sonnet 4.5', true, 200000, 3000, 15000),
  ('openrouter', 'openai/gpt-4o', 'GPT-4o', true, 128000, 2500, 10000),
  ('openrouter', 'google/gemini-pro-1.5', 'Gemini Pro 1.5', true, 1000000, 1250, 5000)
ON CONFLICT (model_id) DO NOTHING;

-- Seed default platform settings
INSERT INTO platform_settings (key, value, description, category) VALUES
  ('maintenance_mode', 'false', 'Put platform in maintenance mode', 'system'),
  ('registration_enabled', 'true', 'Allow new user registrations', 'system'),
  ('api_registrations_enabled', 'true', 'Allow new API developer applications', 'api'),
  ('default_trial_days', '14', 'Default trial period in days', 'billing'),
  ('max_api_keys_per_user', '5', 'Maximum API keys per approved developer', 'api'),
  ('support_email', '"support@chameleoneye.ai"', 'Support contact email', 'contact')
ON CONFLICT (key) DO NOTHING;
