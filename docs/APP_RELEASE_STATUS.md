# App Release Status

**Last reviewed:** 2026-07-17

This document tracks the release status of all Chameleon Eye AI applications.

---

## Web App

| Item | Status |
|---|---|
| Publicly accessible | Yes |
| Authentication | Demo mode only (localStorage) — no cloud accounts created |
| Production cloud accounts | Not yet active |
| Billing | Not active |
| Public status badge | Development Preview |

---

## Progressive Web App (PWA)

| Item | Status |
|---|---|
| Installable from browser | Yes |
| Install instructions available | Yes — via /apps page |
| Public status badge | Development Preview |

---

## macOS Desktop App

| Item | Status |
|---|---|
| Download available | Yes — v0.2.0 for Apple Silicon (arm64) |
| Download URL | https://github.com/auricminds/chameleon-eye-ai/releases/download/v0.2.0/ChameleonEyeDesktop-0.2.0-arm64.dmg |
| Signing | Ad-hoc signed only |
| Apple Developer ID signed | No |
| Notarized by Apple | No |
| Gatekeeper warning on launch | Yes — users see "damaged" or "unidentified developer" warning |
| Bypass instructions | Right-click the app > Open, then click Open in the dialog |
| Requires macOS version | 12+ (Ventura or later) |
| Architecture | Apple Silicon (arm64) only |
| Intel Mac support | Not available |
| Public status badge | Early Access |

**Important:** Until the app is notarized with a valid Apple Developer ID, every macOS user will see a security warning. The current build is suitable for early access testing only.

---

## Windows Desktop App

| Item | Status |
|---|---|
| Download available | No |
| Status | In development |
| Public status badge | Coming Soon |

---

## iOS App

| Item | Status |
|---|---|
| Available on App Store | No |
| Status | In development |
| Public status badge | In Development |

---

## Android App

| Item | Status |
|---|---|
| Available on Play Store | No |
| Status | Not yet planned |
| Public status badge | Not shown |

---

## How to Update

When a new release is published:
1. Update the download URL in `components/DesktopDownloadCards.tsx` and `components/AppsAccessSection.tsx`.
2. Update version numbers in the component copy.
3. Update this document with the new release details.
4. If the macOS app is notarized, remove the Gatekeeper warning from both components and update the badge from "Early Access" to "Available".
