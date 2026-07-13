export const KN_EMAIL_DOMAINS = ["katoennatie.com", "katoen-natie.com"] as const;

export type EmailType = "corporate" | "personal";

export function isKatoenNatieEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return KN_EMAIL_DOMAINS.some((d) => d === domain);
}

export function getEmailType(email: string): EmailType {
  return isKatoenNatieEmail(email) ? "corporate" : "personal";
}

export function getApprovalStatusForEmail(email: string): "approved" | "pending" {
  return isKatoenNatieEmail(email) ? "approved" : "pending";
}