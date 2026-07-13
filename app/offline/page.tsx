import Link from "next/link";

export const metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-sm font-semibold text-emerald">Chameleon Eye AI</p>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">You are offline</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted">
        Chameleon Terminal demo data in this browser may still be available when you reconnect.
        Live AI and account features require an internet connection.
      </p>
      <Link
        href="/terminal"
        className="mt-6 rounded-xl border border-emerald/30 bg-emerald px-5 py-2.5 text-sm font-medium text-background"
      >
        Open Terminal
      </Link>
    </div>
  );
}
