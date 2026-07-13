"use client";

import { useState } from "react";
import { AR_CONTACT_NEED_OPTIONS } from "@/lib/i18n/ar";
import { useLocale } from "@/lib/i18n/use-locale";
import { Button } from "./Button";
import { Card } from "./Card";

const EN_NEED_OPTIONS = [
  "Private AI Workspace",
  "API Integration",
  "Desktop Connector",
  "Local / Private Mode",
  "Enterprise Setup",
  "Custom Workflow",
  "Other",
] as const;

export function ContactForm() {
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const isArabic = locale === "ar";
  const needOptions = isArabic ? AR_CONTACT_NEED_OPTIONS : EN_NEED_OPTIONS;

  const copy = isArabic
    ? {
        thankYou: "شكراً لك.",
        success:
          "ستقوم Chameleon Eye بمراجعة طلبك والتواصل معك بسرية.",
        fullName: "الاسم الكامل",
        company: "الشركة",
        email: "البريد الإلكتروني للعمل",
        phone: "الهاتف / واتساب",
        country: "الدولة",
        need: "ماذا تحتاج؟",
        selectOption: "اختر خياراً",
        message: "الرسالة",
        submit: "إرسال الطلب",
      }
    : {
        thankYou: "Thank you.",
        success:
          "Chameleon Eye will review your request and contact you confidentially.",
        fullName: "Full name",
        company: "Company",
        email: "Work email",
        phone: "Phone / WhatsApp",
        country: "Country",
        need: "What do you need?",
        selectOption: "Select an option",
        message: "Message",
        submit: "Send Request",
      };

  if (submitted) {
    return (
      <Card
        className={`mx-auto max-w-2xl border-emerald/30 bg-panel2 text-center ${isArabic ? "text-right" : ""}`}
      >
        <p className="text-lg font-semibold text-foreground">{copy.thankYou}</p>
        <p className="mt-3 text-sm leading-7 text-muted">{copy.success}</p>
      </Card>
    );
  }

  return (
    <Card className={`mx-auto max-w-2xl ${isArabic ? "text-right" : ""}`}>
      <div dir={isArabic ? "rtl" : "ltr"}>
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <FormField label={copy.fullName} name="fullName" required isArabic={isArabic} />
        <FormField label={copy.company} name="company" required isArabic={isArabic} />
        <FormField label={copy.email} name="email" type="email" required isArabic={isArabic} />
        <FormField label={copy.phone} name="phone" isArabic={isArabic} />
        <FormField label={copy.country} name="country" required isArabic={isArabic} />

        <div>
          <label htmlFor="need" className="mb-2 block text-sm font-medium text-foreground">
            {copy.need}
          </label>
          <select
            id="need"
            name="need"
            required
            dir={isArabic ? "rtl" : "ltr"}
            className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/40"
          >
            <option value="">{copy.selectOption}</option>
            {needOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
            {copy.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            dir={isArabic ? "rtl" : "ltr"}
            className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/40"
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          {copy.submit}
        </Button>
      </form>
      </div>
    </Card>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required = false,
  isArabic = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  isArabic?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        dir={isArabic ? "rtl" : "ltr"}
        className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/40"
      />
    </div>
  );
}
