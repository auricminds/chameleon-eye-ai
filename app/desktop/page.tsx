import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DesktopDownloadCards } from "@/components/DesktopDownloadCards";
import { DesktopFlowDiagram } from "@/components/DesktopFlowDiagram";
import { SectionTitle } from "@/components/SectionTitle";
import { PRIVACY_SENTENCE } from "@/lib/constants";

export const metadata = {
  title: "Desktop Connector",
};

const protects = [
  "master API keys",
  "private company data",
  "device access",
  "user accounts",
  "usage limits",
  "local/private files",
];

const bestFor = [
  "desktop business software",
  "internal company tools",
  "local-first file analysis",
  "sensitive documents",
  "offline-first workflows",
  "private company systems",
];

export default function DesktopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Desktop Connector"
        subtitle="Connect installed desktop applications to Chameleon Eye AI safely, without exposing private keys or sensitive company files."
      />

      <div className="mt-16 space-y-10">
        <Card>
          <h2 className="text-xl font-semibold text-foreground">
            Secure connection for installed desktop apps
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Your desktop software can reach Chameleon Eye AI through the internet,
            just like a website connects to a secure backend. The difference is
            that desktop apps need extra protection because installed software can
            be copied, inspected, or used on multiple devices.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Installed desktop applications can connect safely to Chameleon Eye AI
            through secure authentication, device activation, or a company
            backend. This protects your account, your API access, and your private
            business data.
          </p>
          <p className="mt-4 text-sm leading-7 text-gold">
            For security, master API keys should never be placed inside desktop or
            mobile applications. Chameleon Eye AI uses safer connection methods
            such as short-lived tokens, device activation, and backend-protected
            access.
          </p>
        </Card>

        <DesktopDownloadCards />

        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            How desktop apps connect safely
          </h2>
          <DesktopFlowDiagram variant="page" />
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-foreground">What this protects</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {protects.map((item) => (
              <p key={item} className="text-sm text-muted">
                {item}
              </p>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-foreground">Best for</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bestFor.map((item) => (
              <p key={item} className="text-sm text-muted">
                {item}
              </p>
            ))}
          </div>
        </Card>

        <Card className="border-emerald/20 bg-panel2">
          <h2 className="text-xl font-semibold text-foreground">Local-first privacy</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            When files stay on the customer&apos;s device in local/private mode,
            Chameleon Eye AI cannot see those files. The customer decides what is
            shared with cloud intelligence or API workflows.
          </p>
          <p className="mt-4 text-sm leading-7 text-gold">{PRIVACY_SENTENCE}</p>
        </Card>
      </div>

      <div className="mt-12">
        <Button href="/contact">Request Desktop Integration</Button>
      </div>
    </div>
  );
}
