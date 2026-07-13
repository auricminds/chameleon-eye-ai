import type { DnaConfig } from "./types";

export type DnaProfile = {
  role: string;
  mainFocus: string;
  preferredStyle: string;
  privacyMode: string;
  recommendedStart: string;
  startScanHref: string;
  tags: string[];
  aiInstructionSummary: string;
};

export function buildDnaProfile(config: DnaConfig, answers: Record<string, number>): DnaProfile {
  const pick = (qid: string) => {
    const question = config.questions.find((q) => q.id === qid)!;
    const index = answers[qid] ?? 0;
    return question.options[index];
  };

  const role = pick("role");
  const businessType = pick("businessType");
  const worry = pick("biggestWorry");
  const decisionStyle = pick("decisionStyle");
  const output = pick("preferredOutput");
  const tone = pick("tone");
  const earlyWarning = pick("earlyWarning");
  const dataType = pick("dataType");
  const sensitivity = pick("sensitivity");
  const privacy = pick("privacyMode");

  const focus1Tag = worry.tags[0];
  const focus2Tag = earlyWarning.tags[0];
  const focus1 = config.focusMap[focus1Tag];
  const focus2 = config.focusMap[focus2Tag];
  const sameFocus = focus1Tag === focus2Tag;

  const mainFocus = sameFocus ? focus1.label : `${focus1.label} + ${focus2.label}`;
  const preferredStyle = output.label;
  const privacyMode = privacy.label;
  const scanWord = config.locale === "ar" ? "فحص سريع" : "Quick Scan";
  const recommendedStart = `${scanWord} + ${focus1.reportLabel}`;
  const startScanHref = `${config.hrefs.freeToolsBase}/${focus1.toolSlug}`;

  const tagIds = Array.from(
    new Set([
      ...role.tags,
      ...businessType.tags,
      ...worry.tags,
      ...(sameFocus ? [] : earlyWarning.tags),
      ...output.tags,
      ...privacy.tags,
      ...decisionStyle.tags,
    ]),
  );
  const tags = tagIds.map((id) => config.tagLabels[id] ?? id).filter(Boolean);

  const aiInstructionSummary =
    config.locale === "ar"
      ? `اكتب التقارير بأسلوب "${tone.label}"، بصيغة: ${output.label}. أعطِ الأولوية للإشارات المتعلقة بـ ${focus1.label}${
          sameFocus ? "" : ` و${focus2.label}`
        }. تتخذ هذه الشركة قراراتها بأسلوب "${decisionStyle.label}". تعامل مع ${dataType.label} باعتبارها ${sensitivity.label}، والوضع الافتراضي هو: ${privacy.label}.`
      : `Write reports in a "${tone.label}" tone, formatted as: ${output.label}. Prioritize signals about ${focus1.label}${
          sameFocus ? "" : ` and ${focus2.label}`
        }. This business tends to make decisions in a "${decisionStyle.label}" style. Treat ${dataType.label} as ${sensitivity.label}, and default to: ${privacy.label}.`;

  return {
    role: role.label,
    mainFocus,
    preferredStyle,
    privacyMode,
    recommendedStart,
    startScanHref,
    tags,
    aiInstructionSummary,
  };
}
