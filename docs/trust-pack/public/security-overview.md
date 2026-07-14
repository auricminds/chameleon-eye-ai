# Security Overview — Chairman AI

Chairman AI by Chairmans Holding maintains the following security controls:

## API Authentication

Chairman API is authenticated. All requests require valid, scoped API keys. Keys are separated by type (live, test, read-only) and can be revoked at any time.

## Server-Side Key Protection

Provider API keys remain server-side and are not embedded in desktop, web, or mobile clients. The browser communicates only with Chairman AI-controlled API routes.

## No Raw Prompt Logging

Chairman AI does not log raw private prompts, full AI responses, private files, or secrets in normal application logs. Usage metadata may be stored for billing, abuse prevention, and audit integrity.

## Data Isolation

Customer data is separated by account and protected through application authorization and database access controls.

## Local Private Mode

Private Intelligence can run on the user's device when the local Chairman Brain is installed. In local mode, no data is transmitted to Chairman AI or any AI provider.

## Cloud Approval Controls

Private content is not sent to cloud intelligence without user approval. A consent gate is presented before any selected text is transmitted to cloud intelligence.

## Security Contact

security@chairmans.uk
