# OpenRouter Trust Configuration Guide
# Chairman AI — Internal Developer Reference
# DO NOT share publicly or commit API keys

## Purpose
This guide explains how to configure the OpenRouter workspace for Chairman AI
to maximise privacy, security, and trust compliance.

## Step 1: Create OpenRouter Workspace
- Name: Chairman Production
- Purpose: production API calls only

## Step 2: Create Server API Key
- Name: chairman-api-production
- Store in: OPENROUTER_API_KEY environment variable (server-side only)
- Never: commit to git, paste in frontend, log in console, share in tickets

## Step 3: Set Budget Guardrail
- Set monthly credit limit
- Set alert threshold at 80%
- Prevents unexpected cost overruns

## Step 4: Enable Approved Model Allowlist
- Only allow models approved by Chairman tech review
- Remove access to untested or privacy-incompatible models
- Review quarterly

## Step 5: Configure Zero Data Retention (ZDR)
- Enable ZDR for privacy-sensitive routes where available
- Route private mode requests through ZDR-eligible providers
- Note: ZDR availability depends on provider and model

## Step 6: Configure Sensitive Information Guardrail
- Enable sensitive info detection for: emails, phone numbers, credit cards, national IDs, personal identifiers
- Action: redact or block depending on route type
- Do not log sensitive content in OpenRouter

## Step 7: Disable Private Prompt/Output Logging
- Disable prompt logging unless specifically needed for debugging
- Review any debugging session logs and purge after fix
- Do not leave prompt logging enabled in production

## Step 8: Provider Routing Preferences
- Require ZDR for private cloud mode
- Deny data collection where available
- Allow fallbacks only to approved privacy-compatible routes
- Document approved fallback chain

## Step 9: Key Rotation Schedule
- Rotate production key every 90 days
- Rotate immediately if: key exposed, employee departure, security incident
- Update Vercel environment variable after rotation

## Step 10: Key Safety Rules
NEVER paste OpenRouter keys into:
- Frontend code
- Electron renderer process
- GitHub commits or pull requests
- Screenshots or screen recordings
- Support tickets
- Slack or email messages
- Console.log statements

## Security Contact
security@chameleoneye.ai
