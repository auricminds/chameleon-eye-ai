import { NextRequest } from "next/server";

const ALLOWED_DOCUMENTS = [
  "DPA",
  "SOC 2 Type II Report",
  "ISO/IEC 27001 Certificate",
  "Penetration Test Summary",
  "Security Questionnaire",
  "Vendor Risk Pack",
  "Compliance Evidence Summary",
];

// Basic in-memory rate limiter: 3 requests per hour per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const limit = 3;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    fullName,
    companyName,
    workEmail,
    requestedDocument,
    reason,
    ndaRequired,
  } = body as Record<string, unknown>;

  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
    errors.fullName = "Full name is required.";
  }
  if (!companyName || typeof companyName !== "string" || !companyName.trim()) {
    errors.companyName = "Company name is required.";
  }
  if (!workEmail || typeof workEmail !== "string" || !workEmail.trim()) {
    errors.workEmail = "Work email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
    errors.workEmail = "Work email must be a valid email address.";
  }
  if (
    !requestedDocument ||
    typeof requestedDocument !== "string" ||
    !ALLOWED_DOCUMENTS.includes(requestedDocument)
  ) {
    errors.requestedDocument = "A valid document selection is required.";
  }
  if (
    !reason ||
    typeof reason !== "string" ||
    reason.trim().length < 10
  ) {
    errors.reason = "Reason must be at least 10 characters.";
  }
  if (typeof ndaRequired !== "boolean") {
    errors.ndaRequired = "NDA required field must be a boolean.";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Validation failed.", errors }, { status: 400 });
  }

  // TODO: Insert into Supabase when backend is connected
  // const { error: dbError } = await supabase.from("trust_document_requests").insert({
  //   full_name: fullName,
  //   company_name: companyName,
  //   work_email: workEmail,
  //   requested_document: requestedDocument,
  //   reason: reason,
  //   nda_required: ndaRequired,
  //   status: "received",
  // });

  return Response.json(
    {
      success: true,
      message:
        "Request received. Chameleon Eye will review and respond within 2 business days.",
    },
    { status: 201 }
  );
}
