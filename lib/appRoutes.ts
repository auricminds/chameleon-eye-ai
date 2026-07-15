/** Routes that use the Terminal app shell — no marketing header/footer. */
export function isAppRoute(pathname: string): boolean {
  return /^(\/ar)?\/(terminal|archive|settings\/business-dna|business-dna)(\/|$)/.test(
    pathname,
  ) || /^\/admin(\/|$)/.test(pathname);
}
