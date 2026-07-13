/**
 * Future production architecture (not implemented in demo):
 *
 * Browser / Windows / iOS / macOS clients
 *   → Chameleon Eye Backend (auth, privacy rules, rate limits)
 *   → User Business DNA (Supabase / Postgres)
 *   → Archive / sessions / reports (database)
 *   → Privacy rules engine (approved data only)
 *   → OpenRouter / AI models (server-side keys only)
 *   → Structured intelligence reports
 *
 * OpenRouter and master API keys must never be stored in browser, desktop, or mobile apps.
 */

export {};
