import type { Locale } from "@/lib/i18n/locale";

type DesktopFlowDiagramProps = {
  variant?: "home" | "page";
  locale?: Locale;
};

const EN_OPTIONS = {
  home: [
    {
      title: "Option 1",
      steps: [
        "Desktop App",
        "Customer Backend",
        "Chameleon Eye API",
        "Intelligence Report",
      ],
      copy: undefined,
    },
    {
      title: "Option 2",
      steps: [
        "Desktop App",
        "Device Activation",
        "Short-lived Token",
        "Chameleon Eye API",
        "Intelligence Report",
      ],
      copy: undefined,
    },
  ],
  page: [
    {
      title: "Company Backend Protection",
      steps: [
        "Desktop App",
        "Company Backend",
        "Chameleon Eye API",
        "Intelligence Report",
      ],
      copy: "Best for companies that already have their own server or internal system. The desktop app talks to the company backend, and the backend securely calls Chameleon Eye AI.",
    },
    {
      title: "Device Activation",
      steps: [
        "Desktop App",
        "Secure Login",
        "Short-lived Device Token",
        "Chameleon Eye API",
        "Intelligence Report",
      ],
      copy: "Best for smaller companies or private tools. The app activates the device, receives a temporary token, and can be revoked if the device is lost or access should stop.",
    },
  ],
} as const;

const AR_OPTIONS = {
  home: [
    {
      title: "الخيار 1",
      steps: [
        "تطبيق سطح المكتب",
        "خادم الشركة",
        "Chameleon Eye API",
        "تقرير استخبارات منظم",
      ],
      copy: undefined,
    },
    {
      title: "الخيار 2",
      steps: [
        "تطبيق سطح المكتب",
        "تفعيل الجهاز",
        "رمز قصير المدة",
        "Chameleon Eye API",
        "تقرير استخبارات منظم",
      ],
      copy: undefined,
    },
  ],
  page: [
    {
      title: "حماية خادم الشركة",
      steps: [
        "تطبيق سطح المكتب",
        "خادم الشركة",
        "Chameleon Eye API",
        "تقرير استخبارات منظم",
      ],
      copy: "مناسب للشركات التي لديها خادم أو نظام داخلي. يتحدث تطبيق سطح المكتب مع خادم الشركة، والخادم يستدعي Chameleon Eye AI بشكل آمن.",
    },
    {
      title: "تفعيل الجهاز",
      steps: [
        "تطبيق سطح المكتب",
        "تسجيل دخول آمن",
        "رمز جهاز قصير المدة",
        "Chameleon Eye API",
        "تقرير استخبارات منظم",
      ],
      copy: "مناسب للشركات الصغيرة أو الأدوات الخاصة. يتم تفعيل الجهاز، ويحصل التطبيق على رمز مؤقت يمكن إلغاؤه إذا فُقد الجهاز أو انتهت صلاحية الوصول.",
    },
  ],
} as const;

export function DesktopFlowDiagram({
  variant = "home",
  locale = "en",
}: DesktopFlowDiagramProps) {
  const options = locale === "ar" ? AR_OPTIONS[variant] : EN_OPTIONS[variant];

  return (
    <div className={`grid gap-6 ${variant === "home" ? "md:grid-cols-2" : "lg:grid-cols-2"}`}>
      {options.map((option) => (
        <FlowCard
          key={option.title}
          title={option.title}
          steps={[...option.steps]}
          copy={option.copy}
        />
      ))}
    </div>
  );
}

function FlowCard({
  title,
  steps,
  copy,
}: {
  title: string;
  steps: string[];
  copy?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-panel p-6">
      <p className="text-sm font-medium text-gold">{title}</p>
      <div className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <div key={`${step}-${index}`}>
            <div
              className={`rounded-xl border border-emerald/20 bg-panel2 px-4 py-3 text-sm text-foreground ${
                step.includes("/") || step.includes("API") ? "ltr text-start" : ""
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 ? (
              <div className="flex justify-center py-1 text-emerald">↓</div>
            ) : null}
          </div>
        ))}
      </div>
      {copy ? <p className="mt-4 text-sm leading-7 text-muted">{copy}</p> : null}
    </div>
  );
}
