# Chameleon Eye AI — Multi-Platform Apps

## Overview

Chameleon Eye AI uses **one web core** (Next.js) accessed through multiple shells:

| Platform | Technology | Status |
|----------|------------|--------|
| Web | Next.js on Vercel | Available |
| PWA | Web manifest + service worker | Available |
| Windows / macOS | Tauri 2 | Scaffold ready |
| iOS (iPhone / iPad) | Capacitor 7 | Scaffold ready |

**Security rule:** No OpenRouter keys, master API keys, or Supabase service keys in frontend, desktop, or mobile shells. All future AI calls go through the Chameleon Eye backend.

---

## Web / PWA

### Build

```bash
npm run build:web
# or
npm run build
```

### Dev

```bash
npm run dev:web
# or
npm run dev
```

### PWA assets

- Manifest: `public/manifest.webmanifest`
- Icons: `public/icons/` (generate with `npm run icons:generate`)
- Service worker: `public/sw.js` (offline page only — does not cache sensitive demo data)
- Offline page: `/offline`

### Install (PWA)

1. Open the site in Chrome, Edge, or Safari.
2. Complete signup / Business DNA if needed.
3. **Chrome/Edge:** Menu → Install app.
4. **iOS Safari:** Share → Add to Home Screen.

Start URL: `/terminal`

---

## Tauri Desktop (Windows + macOS)

### Prerequisites

- [Rust](https://rustup.rs/) (`rustc`, `cargo`)
- Platform tools:
  - **macOS:** Xcode Command Line Tools
  - **Windows:** Visual Studio Build Tools + WebView2

### Install dependencies

Already in `package.json`:

```bash
npm install
```

### Generate desktop icons (optional)

```bash
npm run icons:generate
npx tauri icon public/icons/icon-512.png
```

### Development

Starts Next.js on port 3001, then opens Tauri window at `/terminal`:

```bash
npm run app:desktop:dev
```

### Production build

```bash
npm run app:desktop:build
```

Output: `src-tauri/target/release/bundle/`

### First-version behavior

- **Dev:** `http://localhost:3001/terminal`
- **Release:** `https://chameleon-eye-ai-tau.vercel.app/terminal`
- Fallback shell: `desktop-shell/index.html` (offline message)
- Bundle ID: `com.chameleoneye.ai`

### Native menu

- New Terminal Session → `/terminal`
- Archive → `/archive`
- Business DNA → `/settings/business-dna`
- Reload / Quit

---

## Capacitor iOS (iPhone + iPad)

### Prerequisites

- macOS with [Xcode](https://developer.apple.com/xcode/)
- Apple Developer account (for device testing / App Store)
- CocoaPods (`sudo gem install cocoapods`)

### Add iOS platform (first time)

```bash
npx cap add ios
```

### Sync web assets

```bash
npm run app:ios:sync
```

### Open in Xcode

```bash
npm run app:ios:open
```

### First-version behavior

- Loads hosted URL: `https://chameleon-eye-ai-tau.vercel.app/terminal`
- App ID: `com.chameleoneye.ai`
- Local fallback: `capacitor-web/index.html`

### Microphone / speech permissions

After `cap add ios`, verify in `ios/App/App/Info.plist`:

- `NSMicrophoneUsageDescription` — Chameleon Eye AI uses the microphone when you choose to speak to Chameleon.
- `NSSpeechRecognitionUsageDescription` — Chameleon Eye AI uses speech recognition to turn your voice into text when you choose voice input.

These are added automatically via `ios/App/App/Info.plist` patches when the platform is generated.

---

## Environment rules

- Do **not** put API keys in `.env` files consumed by client, Tauri, or Capacitor.
- Do **not** commit secrets.
- Demo mode uses `localStorage` only.

---

## Future backend integration

```
App Shell (Browser / PWA / Desktop / iOS)
  → Chameleon Eye Backend
  → Supabase (auth + database)
  → Business DNA memory
  → Archive
  → OpenRouter (server-side only)
  → Voice provider
  → Structured intelligence reports
```

---

## App Store / installer checklist (manual)

- [ ] Apple Developer Program enrollment
- [ ] Xcode signing & provisioning profiles
- [ ] App Store Connect listing
- [ ] Windows code signing certificate
- [ ] macOS notarization
- [ ] Real `.exe` / `.msi` / `.dmg` installers
- [ ] Backend auth + device activation
- [ ] Production voice provider
- [ ] Replace “Coming Soon” on `/apps` with real download links

---

## Commands reference

| Command | Description |
|---------|-------------|
| `npm run build` | Next.js production build (unchanged) |
| `npm run build:web` | Same as `npm run build` |
| `npm run dev:web` | Next.js dev server (port 3001) |
| `npm run icons:generate` | Generate PWA PNG icons |
| `npm run app:desktop:dev` | Tauri dev (requires Rust) |
| `npm run app:desktop:build` | Tauri release build |
| `npm run app:ios:sync` | Capacitor sync iOS |
| `npm run app:ios:open` | Open Xcode project |
