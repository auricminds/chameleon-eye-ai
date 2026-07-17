export type ClaimStatus =
  | "verified"
  | "in_progress"
  | "planned"
  | "not_available";

export interface TrustClaim {
  id: string;
  title: string;
  status: ClaimStatus;
  publicLabel: string;
  publicDescription: string;
  evidenceVerifiedAt?: string;
  visible: boolean;
}

export const TRUST_CLAIMS: TrustClaim[] = [
  {
    id: "soc2",
    title: "SOC 2",
    status: "planned",
    publicLabel: "SOC 2 — In Planning",
    publicDescription:
      "SOC 2 readiness programme is being planned. Report will be commissioned following product launch.",
    visible: true,
  },
  {
    id: "iso27001",
    title: "ISO/IEC 27001",
    status: "planned",
    publicLabel: "ISO 27001 — In Planning",
    publicDescription:
      "ISO/IEC 27001 preparation is planned following commercial launch.",
    visible: true,
  },
  {
    id: "pentest",
    title: "Penetration Testing",
    status: "planned",
    publicLabel: "Security Testing — Planned",
    publicDescription:
      "Independent security testing is planned before public commercial launch.",
    visible: true,
  },
  {
    id: "dpa",
    title: "Data Processing Agreement",
    status: "in_progress",
    publicLabel: "DPA — Available on Request",
    publicDescription:
      "Data Processing Agreements are available for enterprise customers. Contact us to request.",
    visible: true,
  },
  {
    id: "zdr",
    title: "Zero Data Retention",
    status: "planned",
    publicLabel: "ZDR — Planned",
    publicDescription:
      "Zero Data Retention routing is planned for enterprise deployments.",
    visible: true,
  },
];
