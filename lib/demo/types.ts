export const STORAGE_KEYS = {
  DEMO_USER: "chameleon_demo_user",
  BUSINESS_DNA: "chameleon_business_dna_demo",
  TERMINAL_SESSIONS: "chameleon_terminal_sessions",
  ACTIVE_SESSION: "chameleon_active_session_id",
  VOICE_ENABLED: "chameleon_voice_enabled",
  TERMINAL_LANGUAGE: "chameleon_terminal_language",
  PROJECTS: "chameleon_demo_projects",
  ACTIVE_PROJECT: "chameleon_active_project_id",
  SCHEDULES: "chameleon_demo_schedules",
  RISK_REVIEWS: "chameleon_risk_reviews_demo",
} as const;

export type DemoUser = {
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  role: string;
  createdAt: string;
};

export type BusinessDnaRecord = {
  userId: string;
  role: string;
  businessType: string;
  mainGoal: string;
  biggestConcern: string;
  decisionStyle: string;
  outputPreference: string;
  communicationTone: string;
  hiddenCostConcern: string;
  earlyWarningTarget: string;
  expectedDataTypes: string;
  sensitivityLevel: string;
  privacyMode: string;
  intelligenceTags: string[];
  profileSummary: string;
  aiInstruction: string;
  createdAt: string;
  updatedAt: string;
};

export type IntelligenceMode =
  | "quick_scan"
  | "deep_review"
  | "cash_waste"
  | "team_effectiveness"
  | "customer_journey"
  | "marketing"
  | "operational_risk"
  | "decision_memo"
  | "api_workflow"
  | "private_mode";

export type TerminalMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  structured?: ChameleonStructuredResponse;
  riskReview?: RiskReview;
  createdAt: string;
};

export type ChameleonStructuredResponse = {
  directAnswer: string;
  whatISee: string;
  hiddenRisk: string;
  missingFacts: string[];
  nextAction: string;
  suggestedReport: string;
  riskLevel?: "low" | "medium" | "high";
};

export type SavedReport = {
  id: string;
  sessionId: string;
  title: string;
  summary: string;
  reportType: string;
  createdAt: string;
  language: "en" | "ar";
};

export type TerminalSession = {
  id: string;
  title: string;
  language: "en" | "ar";
  createdAt: string;
  updatedAt: string;
  messages: TerminalMessage[];
  tags: string[];
  mode: IntelligenceMode;
  savedReport?: SavedReport;
  isDecision?: boolean;
  isRiskReview?: boolean;
};

export type ProjectType =
  | "company_review"
  | "client_work"
  | "marketing"
  | "operations"
  | "hr_team"
  | "investment"
  | "api_product"
  | "other";

export type DemoProject = {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  createdAt: string;
  updatedAt: string;
  sessionIds: string[];
  language: "en" | "ar";
};

export type ScheduleCheckType =
  | "cash_waste"
  | "operational_risk"
  | "customer_journey"
  | "marketing_intel"
  | "team_effectiveness"
  | "decision_followup"
  | "private_mode"
  | "custom";

export type ScheduleFrequency = "one_time" | "daily" | "weekly" | "monthly" | "quarterly";

export type ScheduleStatus = "upcoming" | "done";

export type DemoSchedule = {
  id: string;
  title: string;
  checkType: ScheduleCheckType;
  frequency: ScheduleFrequency;
  projectId: string | null;
  nextRunLabel: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  status: ScheduleStatus;
  language: "en" | "ar";
};

export type RiskReviewFocusArea =
  | "cash_waste"
  | "operations"
  | "customer_journey"
  | "team_effectiveness"
  | "marketing"
  | "api_product"
  | "private_data"
  | "security_incident"
  | "business_decision"
  | "other";

export type RiskReviewSeriousness = "low" | "medium" | "high" | "critical" | "not_sure";
export type RiskReviewPattern = "one_time" | "repeated" | "increasing" | "unknown";
export type RiskReviewImpact =
  | "money_loss"
  | "time_loss"
  | "customer_loss"
  | "team_confusion"
  | "reputation"
  | "compliance"
  | "delayed_decision"
  | "poor_reporting";
export type RiskReviewAffectedGroup =
  | "owner_ceo"
  | "operations_team"
  | "sales_marketing"
  | "hr_team"
  | "customers_users"
  | "investors_partners"
  | "product_tech"
  | "multiple_teams";
export type RiskReviewEvidence =
  | "numbers_reports"
  | "complaints"
  | "team_feedback"
  | "delays"
  | "lost_sales"
  | "system_logs"
  | "personal_observation"
  | "no_evidence";
export type RiskReviewFinancialExposure = "small" | "medium" | "large" | "unknown" | "not_financial";
export type RiskReviewUrgency = "today" | "this_week" | "this_month" | "monitor_only" | "not_sure";
export type RiskReviewRequestedOutput =
  | "risk_map"
  | "missing_facts"
  | "executive_summary"
  | "action_plan"
  | "decision_memo"
  | "followup_schedule"
  | "team_questions"
  | "management_report";
export type RiskReviewPrivacyLevel =
  | "normal"
  | "confidential"
  | "hr_info"
  | "customer_info"
  | "financial_info"
  | "local_private"
  | "not_sure";
export type RiskReviewFollowUp = "none" | "tomorrow" | "next_week" | "next_month" | "custom_later";
export type RiskReviewOutputFormat =
  | "short_summary"
  | "full_review"
  | "table"
  | "risk_score"
  | "executive_memo"
  | "action_checklist";
export type RiskReviewLevel = "low" | "medium" | "high" | "critical";

export type RiskReview = {
  id: string;
  sessionId: string;
  createdAt: string;
  language: "en" | "ar";
  focusArea: RiskReviewFocusArea;
  seriousness: RiskReviewSeriousness;
  pattern: RiskReviewPattern;
  impact: RiskReviewImpact;
  affectedGroup: RiskReviewAffectedGroup;
  evidence: RiskReviewEvidence;
  financialExposure: RiskReviewFinancialExposure;
  urgency: RiskReviewUrgency;
  requestedOutput: RiskReviewRequestedOutput;
  privacyLevel: RiskReviewPrivacyLevel;
  followUp: RiskReviewFollowUp;
  outputFormat: RiskReviewOutputFormat;
  riskScore: number;
  riskLevel: RiskReviewLevel;
  summary: string;
  missingFacts: string[];
  recommendedAction: string;
  suggestedReport: string;
};

export type DnaQuestionOption = { label: string; tags: string[] };
export type DnaQuestionDef = {
  id: keyof Pick<
    BusinessDnaRecord,
    | "role"
    | "businessType"
    | "mainGoal"
    | "biggestConcern"
    | "decisionStyle"
    | "outputPreference"
    | "communicationTone"
    | "hiddenCostConcern"
    | "earlyWarningTarget"
    | "expectedDataTypes"
    | "sensitivityLevel"
    | "privacyMode"
  >;
  text: string;
  options: DnaQuestionOption[];
};
