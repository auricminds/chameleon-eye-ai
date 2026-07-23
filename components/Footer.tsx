"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/use-locale";
import {
  EN_GROUPS,
  EN_COPY,
  AR_GROUPS,
  AR_COPY,
  type FooterGroup,
  type FooterLink,
} from "@/components/footer/footer-config";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="inline-block h-3 w-3 flex-shrink-0 opacity-50"
    >
      <path
        fillRule="evenodd"
        d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Single link ──────────────────────────────────────────────────────────────

function FooterLinkItem({ link }: { link: FooterLink }) {
  const cls =
    "inline-flex items-center gap-1.5 text-[14px] leading-snug text-muted/75 transition-colors duration-150 hover:text-foreground focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald/50";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
        <ExternalArrow />
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

// ─── Desktop column ───────────────────────────────────────────────────────────

function FooterColumn({ group }: { group: FooterGroup }) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted/50">
        {group.heading}
      </p>
      <ul className="space-y-2.5">
        {group.links.map((link) => (
          <li key={link.href}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Mobile accordion ─────────────────────────────────────────────────────────

function FooterAccordion({ group, isRtl }: { group: FooterGroup; isRtl: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = `footer-panel-${group.id}`;
  const btnId = `footer-btn-${group.id}`;

  return (
    <div className="border-b border-white/8 last:border-b-0">
      <button
        type="button"
        id={btnId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center py-3.5 text-sm font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 ${
          isRtl ? "flex-row-reverse justify-between text-right" : "justify-between"
        }`}
      >
        <span>{group.heading}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-muted/50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div id={panelId} role="region" aria-labelledby={btnId}>
          <ul className="space-y-2.5 pb-4">
            {group.links.map((link) => (
              <li key={link.href}>
                <FooterLinkItem link={link} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Brand area ───────────────────────────────────────────────────────────────

function FooterBrand({
  copy,
  isArabic,
}: {
  copy: typeof EN_COPY;
  isArabic: boolean;
}) {
  return (
    <div>
      <Link
        href={isArabic ? "/ar" : "/"}
        className="inline-block focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald/50"
        aria-label="Chameleon Eye AI — home"
      >
        <span className="text-[21px] font-semibold leading-none tracking-tight">
          <span className="text-emerald">Chameleon Eye</span>
          <span className="text-foreground"> AI</span>
        </span>
      </Link>

      <p className="mt-4 max-w-[280px] text-[14px] leading-relaxed text-muted/80">
        {copy.tagline}
      </p>

      <div className="mt-7 space-y-1.5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted/40">
          {copy.corp}
        </p>
        <a
          href="https://chameleoneye.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted/60 transition-colors duration-150 hover:text-foreground focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald/50"
        >
          {copy.corporateWebsiteLabel}
          <ExternalArrow />
        </a>
      </div>
    </div>
  );
}

// ─── Bottom bar ───────────────────────────────────────────────────────────────

function FooterBottomBar({
  copy,
  isArabic,
}: {
  copy: typeof EN_COPY;
  isArabic: boolean;
}) {
  return (
    <div className="border-t border-white/8">
      <div className="mx-auto max-w-[1440px] px-6 py-5 sm:px-8 lg:px-12">
        <div
          className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
            isArabic ? "sm:flex-row-reverse" : ""
          }`}
        >
          {/* Copyright + quick links */}
          <div
            className={`flex flex-wrap items-center gap-x-1 gap-y-1.5 text-[12px] text-muted/50 ${
              isArabic ? "justify-end" : ""
            }`}
          >
            <span>{copy.copyright}</span>
            {copy.bottomLinks.map((link) => (
              <span key={link.href} className="inline-flex items-center gap-1">
                <span className="px-1 text-white/15">·</span>
                <Link
                  href={link.href}
                  className="transition-colors duration-150 hover:text-foreground focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald/50"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          {/* Trust line */}
          <p
            className={`text-[12px] text-muted/40 ${
              isArabic ? "sm:text-left" : "sm:text-right"
            }`}
          >
            {copy.trustLine}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export function Footer() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const groups = isArabic ? AR_GROUPS : EN_GROUPS;
  const copy = isArabic ? AR_COPY : EN_COPY;

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="mt-auto border-t border-white/8 bg-panel"
      aria-label={isArabic ? "تذييل الموقع" : "Site footer"}
    >
      {/* Main grid */}
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">

        {/* ── Desktop layout ─────────────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 xl:grid-cols-[320px_1fr] xl:gap-24">
          <FooterBrand copy={copy} isArabic={isArabic} />
          <nav aria-label={isArabic ? "روابط التذييل" : "Footer navigation"}>
            <div className="grid grid-cols-2 gap-10 xl:grid-cols-4 xl:gap-8">
              {groups.map((group) => (
                <FooterColumn key={group.id} group={group} />
              ))}
            </div>
          </nav>
        </div>

        {/* ── Mobile / tablet layout ─────────────────────────────────────── */}
        <div className="lg:hidden">
          <div className={isArabic ? "text-right" : ""}>
            <FooterBrand copy={copy} isArabic={isArabic} />
          </div>
          <nav
            aria-label={isArabic ? "روابط التذييل" : "Footer navigation"}
            className="mt-8 border-t border-white/8"
          >
            {groups.map((group) => (
              <FooterAccordion key={group.id} group={group} isRtl={isArabic} />
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <FooterBottomBar copy={copy} isArabic={isArabic} />
    </footer>
  );
}
