"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { SignOutModal } from "@/components/demo/SignOutModal";
import { useHasDemoUser } from "@/lib/demo/hooks";
import { useLocale } from "@/lib/i18n/use-locale";
import {
  getHomeHref,
  getLoginHref,
  getNavItems,
  getSignupHref,
  getTerminalHref,
  UI,
  type NavItem,
} from "@/lib/i18n/ui";
import { Button } from "./Button";

/**
 * Maps the current pathname to a top-level nav section key.
 * Used to apply the active state to the correct nav item.
 */
function getActiveSection(pathname: string): string {
  const p = pathname.replace(/^\/ar/, "") || "/";
  if (
    p.startsWith("/product") ||
    p.startsWith("/private-mode") ||
    p.startsWith("/local-mode") ||
    p.startsWith("/ai-routing")
  )
    return "product";
  if (p.startsWith("/enterprise")) return "solutions";
  if (p.startsWith("/reports")) return "reports";
  if (p.startsWith("/apps") || p.startsWith("/desktop")) return "apps";
  if (
    p.startsWith("/api") ||
    p.startsWith("/api-docs") ||
    p.startsWith("/developers") ||
    p.startsWith("/terminal") ||
    p.startsWith("/changelog")
  )
    return "developers";
  if (
    p.startsWith("/compare") ||
    p.startsWith("/free-tools") ||
    p.startsWith("/trust") ||
    p.startsWith("/security") ||
    p.startsWith("/privacy") ||
    p.startsWith("/architecture")
  )
    return "resources";
  return "";
}

// ─── Chevron icon ────────────────────────────────────────────────────────────

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1.5 3.5l3.5 3 3.5-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Desktop dropdown panel ──────────────────────────────────────────────────

function DropdownPanel({
  item,
  isArabic,
  onClose,
}: {
  item: NavItem;
  isArabic: boolean;
  onClose: () => void;
}) {
  if (!item.children?.length) return null;
  return (
    <div
      className={`absolute top-[calc(100%+6px)] z-10 min-w-[240px] overflow-hidden rounded-2xl border border-white/8 bg-panel shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
        isArabic ? "end-0" : "start-0"
      }`}
    >
      <div className="p-1.5">
        {item.children.map((group, gi) => (
          <div key={gi}>
            {group.heading ? (
              <p className="px-3 pb-1 pt-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted/50">
                {group.heading}
              </p>
            ) : null}
            {group.items.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="group flex flex-col rounded-xl px-3 py-2.5 transition-colors duration-100 hover:bg-white/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                    {child.label}
                  </span>
                  {child.badge ? (
                    <span className="rounded-full border border-emerald/25 bg-emerald/10 px-1.5 py-0.5 text-[10px] leading-none text-emerald">
                      {child.badge}
                    </span>
                  ) : null}
                </div>
                {child.description ? (
                  <span className="mt-0.5 text-[12px] leading-snug text-muted">
                    {child.description}
                  </span>
                ) : null}
              </Link>
            ))}
            {gi < item.children!.length - 1 ? (
              <div className="my-1 h-px bg-white/6" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const demoUser = useHasDemoUser();
  const [signOutOpen, setSignOutOpen] = useState(false);
  const navItems = getNavItems(locale);
  const ui = UI[locale];
  const homeHref = getHomeHref(locale);
  const loginHref = getLoginHref(locale);
  const signupHref = getSignupHref(locale);
  const terminalHref = getTerminalHref(locale);
  const activeSection = getActiveSection(pathname);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll detection — adds subtle shadow/blur after 30px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop dropdown on click outside header
  useEffect(() => {
    if (!openDropdown) return;
    function onMouseDown(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [openDropdown]);

  // Escape key closes dropdown and mobile menu
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  function handleSignedOut() {
    router.push(homeHref);
  }

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  function toggleMobileExpanded(label: string) {
    setMobileExpanded((prev) => (prev === label ? null : label));
  }

  return (
    <>
      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        dir={isArabic ? "rtl" : "ltr"}
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "border-b border-white/10 bg-background/96 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            : "border-b border-white/6 bg-background/90 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 sm:px-6 lg:px-10 xl:px-12">

          {/* Logo */}
          <Link
            href={homeHref}
            className="flex shrink-0 items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
          >
            <Image
              src="/logo.png"
              alt="Chameleon Eye AI"
              width={44}
              height={44}
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              priority
            />
            <span className="text-lg font-bold tracking-tight sm:text-xl">
              <span className="text-emerald">Chameleon Eye</span>
              <span className="text-foreground"> AI</span>
            </span>
          </Link>

          {/* ── Desktop navigation ────────────────────────────────────────── */}
          <nav
            className="hidden xl:flex"
            aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}
          >
            <ul className="flex items-center gap-0.5" role="list">
              {navItems.map((item) => {
                const hasDropdown = !!(item.children?.length);
                const isItemActive = activeSection === item.activeKey;
                const isOpen = openDropdown === item.label;

                return (
                  <li key={item.label} className="relative">
                    {hasDropdown ? (
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onClick={() => toggleDropdown(item.label)}
                        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40 ${
                          isItemActive || isOpen
                            ? "text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-2.5 w-2.5 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href ?? "#"}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40 ${
                          isItemActive
                            ? "text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Active underline indicator */}
                    {isItemActive ? (
                      <span
                        className="pointer-events-none absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-emerald/50"
                        aria-hidden="true"
                      />
                    ) : null}

                    {/* Dropdown panel */}
                    {hasDropdown && isOpen ? (
                      <DropdownPanel
                        item={item}
                        isArabic={isArabic}
                        onClose={() => setOpenDropdown(null)}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Desktop right actions ─────────────────────────────────────── */}
          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <LanguageSwitch />
            {demoUser ? (
              <>
                <Button href={terminalHref} variant="ghost">
                  {ui.terminal}
                </Button>
                <Button variant="secondary" onClick={() => setSignOutOpen(true)}>
                  {ui.signOut}
                </Button>
              </>
            ) : (
              <>
                <Button href={loginHref} variant="ghost">
                  {ui.signIn}
                </Button>
                <Button href={signupHref} className="hover:-translate-y-px">
                  {ui.startFree}
                </Button>
              </>
            )}
          </div>

          {/* ── Mobile controls ───────────────────────────────────────────── */}
          <div className="flex shrink-0 items-center gap-3 lg:hidden">
            <LanguageSwitch />
            <button
              type="button"
              aria-label={ui.toggleMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
            >
              <span className="sr-only">{ui.menu}</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <div
        id="mobile-nav"
        dir={isArabic ? "rtl" : "ltr"}
        className={`fixed inset-y-0 z-50 flex w-[min(100vw,360px)] flex-col bg-panel shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isArabic ? "left-0 border-e border-white/8" : "right-0 border-s border-white/8"
        } ${
          mobileOpen
            ? "translate-x-0"
            : isArabic
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        style={{ visibility: mobileOpen ? "visible" : "hidden" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/8 p-4">
          <Link
            href={homeHref}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
          >
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
            />
            <span className="text-base font-bold">
              <span className="text-emerald">Chameleon Eye</span>
              <span className="text-foreground"> AI</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg border border-white/10 p-1.5 text-muted transition-colors hover:border-white/20 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
            aria-label={isArabic ? "إغلاق القائمة" : "Close menu"}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Drawer nav */}
        <nav
          className="flex-1 overflow-y-auto p-3"
          aria-label={isArabic ? "قائمة التنقل" : "Navigation menu"}
        >
          <ul className="space-y-0.5" role="list">
            {navItems.map((item) => {
              const hasDropdown = !!(item.children?.length);
              const isExpanded = mobileExpanded === item.label;

              return (
                <li key={item.label}>
                  {hasDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMobileExpanded(item.label)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown
                          className={`h-3 w-3 flex-shrink-0 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isExpanded ? (
                        <ul
                          className="ms-4 mt-0.5 space-y-0.5 border-s border-white/8 ps-3"
                          role="list"
                        >
                          {item.children!.flatMap((g) => g.items).map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
                              >
                                <span>{child.label}</span>
                                {child.badge ? (
                                  <span className="rounded-full border border-emerald/25 bg-emerald/10 px-1.5 py-0.5 text-[10px] leading-none text-emerald">
                                    {child.badge}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="space-y-2.5 border-t border-white/8 p-4">
          <div className={isArabic ? "flex justify-end" : ""}>
            <LanguageSwitch />
          </div>
          {demoUser ? (
            <>
              <Button href={terminalHref} variant="ghost" className="w-full">
                {ui.terminal}
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  setSignOutOpen(true);
                }}
              >
                {ui.signOut}
              </Button>
            </>
          ) : (
            <>
              <Button href={loginHref} variant="ghost" className="w-full">
                {ui.signIn}
              </Button>
              <Button href={signupHref} className="w-full">
                {ui.startFree}
              </Button>
            </>
          )}
        </div>
      </div>

      <SignOutModal
        locale={locale}
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onSignedOut={handleSignedOut}
      />
    </>
  );
}
