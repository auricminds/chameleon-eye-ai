export const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "API", href: "/api" },
  { label: "Desktop", href: "/desktop" },
  { label: "Private Mode", href: "/private-mode" },
  { label: "AI Reports", href: "/reports" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: "Contact", href: "/contact" },
] as const;

export const PRIVACY_SENTENCE =
  "If a file stays on your device, Chameleon Eye AI cannot see it. You decide what is shared.";

export const SECURITY_SENTENCE =
  "Master API keys stay protected on the server side — never inside desktop or mobile applications.";

export const API_SECURITY_INTRO =
  "Chameleon Eye API is designed for secure product integration. Your website, mobile app, desktop app, game, marketplace, or internal system can connect to Chameleon Eye AI without exposing master keys to end users.";

export const API_SECURITY_NOTE =
  "For best security, API keys should remain on a backend server. Desktop and mobile apps should use short-lived tokens, device activation, or a customer backend.";

export const HERO_PROMPTS = [
  {
    label: "Find hidden cash waste",
    preview: {
      riskLevel: "High",
      signals: [
        "rising spend without conversion lift",
        "weak audience fit",
        "unclear offer positioning",
      ],
      nextAction: "Pause weak campaigns and review offer/message fit.",
    },
  },
  {
    label: "Review this report",
    preview: {
      riskLevel: "Medium",
      signals: [
        "missing ownership details",
        "inconsistent timeline data",
        "unclear escalation path",
      ],
      nextAction: "Request missing facts before executive review.",
    },
  },
  {
    label: "Analyze team effectiveness",
    preview: {
      riskLevel: "Medium",
      signals: [
        "repeated delay pattern",
        "weak handover process",
        "unclear ownership",
      ],
      nextAction: "Review the process bottleneck before scaling.",
    },
  },
  {
    label: "Detect customer journey friction",
    preview: {
      riskLevel: "High",
      signals: [
        "form abandonment spike",
        "slow response on step 3",
        "unclear next-step guidance",
      ],
      nextAction: "Simplify the signup flow and add progress guidance.",
    },
  },
  {
    label: "Generate executive report",
    preview: {
      riskLevel: "Low",
      signals: [
        "stable core metrics",
        "minor reporting gaps",
        "clear decision options",
      ],
      nextAction: "Publish executive summary with recommended next actions.",
    },
  },
  {
    label: "Check operational risk",
    preview: {
      riskLevel: "High",
      signals: [
        "repeated service delays",
        "manual workaround dependency",
        "single-point process failure",
      ],
      nextAction: "Assign owner and fix the recurring bottleneck this week.",
    },
  },
] as const;

export const REPORT_TABS = [
  {
    id: "cash-waste",
    label: "Cash Waste",
    situation:
      "Marketing spend is increasing, but lead quality and conversion are not improving.",
    signals: [
      "weak audience fit",
      "landing-page friction",
      "repeated campaign changes",
    ],
    riskLevel: "High",
    action: "Pause weak campaigns and review offer/message fit.",
  },
  {
    id: "team-effectiveness",
    label: "Team Effectiveness",
    situation:
      "Delivery timelines are slipping despite stable team size and workload.",
    signals: [
      "unclear task ownership",
      "weak handover between teams",
      "repeated delay pattern",
    ],
    riskLevel: "Medium",
    action: "Review handover process before scaling.",
  },
  {
    id: "customer-journey",
    label: "Customer Journey",
    situation:
      "Users start onboarding but abandon before completing key steps.",
    signals: [
      "form abandonment spike",
      "unclear next-step guidance",
      "slow response on step 3",
    ],
    riskLevel: "High",
    action: "Simplify the signup flow and add progress guidance.",
  },
  {
    id: "marketing",
    label: "Marketing",
    situation:
      "Campaign messaging is inconsistent and audience targeting is too broad.",
    signals: [
      "unclear value proposition",
      "audience mismatch",
      "budget spread across weak channels",
    ],
    riskLevel: "Medium",
    action: "Focus on one audience segment and tighten message fit.",
  },
  {
    id: "operational-risk",
    label: "Operational Risk",
    situation:
      "Operational logs show repeated errors and manual workarounds.",
    signals: [
      "repeated service delays",
      "manual workaround dependency",
      "single-point process failure",
    ],
    riskLevel: "High",
    action: "Assign owner and fix the recurring bottleneck this week.",
  },
  {
    id: "executive-decision",
    label: "Executive Decision",
    situation:
      "Leadership needs a clear decision memo with options, risks, and next steps.",
    signals: [
      "two viable expansion paths",
      "moderate budget exposure",
      "timing pressure this quarter",
    ],
    riskLevel: "Medium",
    action: "Approve phased rollout with milestone review gates.",
  },
] as const;

export const PRICING_PLANS = [
  {
    name: "Private Starter",
    price: "$10/mo",
    description: "For individuals and small teams testing private intelligence.",
    features: [
      "private workspace",
      "basic reports",
      "limited monthly analyses",
      "local/private mode preview",
      "standard support",
    ],
    cta: "Start Starter",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$50/mo",
    description: "For companies using Chameleon Eye AI regularly.",
    features: [
      "more analyses",
      "report templates",
      "team workflows",
      "AI + API access starter",
      "Pulse events preview",
      "priority support",
    ],
    cta: "Choose Business",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "API Business",
    price: "$99/mo",
    description: "For platforms embedding Chameleon Eye.",
    features: [
      "API workflows",
      "structured outputs",
      "usage dashboard",
      "rate limits",
      "safe drafts",
      "custom workflow starter",
    ],
    cta: "Request API Plan",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "From $399/mo",
    description: "For private company intelligence systems.",
    features: [
      "custom workflows",
      "private setup",
      "desktop connector",
      "advanced reports",
      "dedicated support",
      "optional private deployment",
      "custom volume",
    ],
    cta: "Request Enterprise",
    href: "/contact",
    highlighted: false,
  },
] as const;
