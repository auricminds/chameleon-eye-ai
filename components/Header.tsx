"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { SignOutModal } from "@/components/demo/SignOutModal";
import { useHasDemoUser } from "@/lib/demo/hooks";
import { useLocale } from "@/lib/i18n/use-locale";
import {
  getArchiveHref,
  getHomeHref,
  getLoginHref,
  getNavLinks,
  getSignupHref,
  getTerminalHref,
  UI,
} from "@/lib/i18n/ui";
import { Button } from "./Button";

export function Header() {
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const demoUser = useHasDemoUser();
  const [signOutOpen, setSignOutOpen] = useState(false);
  const navLinks = getNavLinks(locale);
  const ui = UI[locale];
  const homeHref = getHomeHref(locale);
  const loginHref = getLoginHref(locale);
  const signupHref = getSignupHref(locale);
  const terminalHref = getTerminalHref(locale);
  const archiveHref = getArchiveHref(locale);
  const isArabic = locale === "ar";

  function handleSignedOut() {
    router.push(homeHref);
  }

  return (
    <>
      <header
        dir={isArabic ? "rtl" : "ltr"}
        className="sticky top-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
          <Link
            href={homeHref}
            className="flex shrink-0 items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40 focus-visible:rounded-md"
          >
            <Image src="/logo.png" alt="Chameleon Eye AI" width={56} height={56} className="h-14 w-14 object-contain" priority />
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              <span className="text-emerald">Chameleon Eye</span> AI
            </span>
          </Link>

          <nav className="hidden items-center gap-4 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:rounded focus-visible:ring-1 focus-visible:ring-emerald/40"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <LanguageSwitch />
            {demoUser ? (
              <>
                <Button href={terminalHref} variant="ghost">
                  {ui.terminal}
                </Button>
                <Button href={archiveHref} variant="ghost">
                  {ui.archive}
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
                <Button href={signupHref}>{ui.startFree}</Button>
              </>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <LanguageSwitch />
            <button
              type="button"
              aria-label={ui.toggleMenu}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40"
            >
              <span className="sr-only">{ui.menu}</span>
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-white/8 bg-panel lg:hidden">
            <nav
              className={`mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 ${isArabic ? "items-stretch text-right" : ""}`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald/40 ${isArabic ? "text-right" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/8 pt-4">
                {demoUser ? (
                  <>
                    <Button href={terminalHref} variant="ghost" className="w-full">
                      {ui.terminal}
                    </Button>
                    <Button href={archiveHref} variant="ghost" className="w-full">
                      {ui.archive}
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        setOpen(false);
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
            </nav>
          </div>
        ) : null}
      </header>

      <SignOutModal
        locale={locale}
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onSignedOut={handleSignedOut}
      />
    </>
  );
}
