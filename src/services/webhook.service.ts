import { matchCallingCode, formatFullPhone } from "@/lib/country-codes";

export interface LeadWebhookPayload {
  name: string;
  email: string;
  phone: string; // Guaranteed to include '+' and country code, e.g. "+968 91234567"
  message?: string;
  propertyId?: string;
  [key: string]: unknown;
}

/**
 * Forwards lead inquiries to any configured webhook URLs in .env
 * (e.g. WEBHOOK_URL, LEADS_WEBHOOK_URL, ZAPIER_WEBHOOK_URL, MAKE_WEBHOOK_URL)
 */
export async function forwardLeadToWebhook(payload: LeadWebhookPayload): Promise<void> {
  const webhookUrls = [
    process.env.WEBHOOK_URL,
    process.env.LEADS_WEBHOOK_URL,
    process.env.ZAPIER_WEBHOOK_URL,
    process.env.MAKE_WEBHOOK_URL,
  ].filter(Boolean) as string[];

  if (webhookUrls.length === 0) {
    return;
  }

  const formattedPhone = formatFullPhone(payload.phone);
  const matchedCode = matchCallingCode(formattedPhone) || "+968";
  const digitsOnly = formattedPhone.replace(/\D/g, "");
  const bareCode = matchedCode.replace("+", "");
  const subscriberNumber = digitsOnly.startsWith(bareCode)
    ? digitsOnly.slice(bareCode.length)
    : digitsOnly;

  const dataToSend = {
    ...payload,
    phone: formattedPhone, // e.g. "+968 91234567"
    fullPhone: `+${digitsOnly}`, // e.g. "+96891234567"
    countryCode: matchedCode, // e.g. "+968"
    subscriberNumber, // e.g. "91234567"
    submittedAt: new Date().toISOString(),
  };

  await Promise.allSettled(
    webhookUrls.map(async (url) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          console.warn(
            `[WEBHOOK_FORWARD] Webhook ${url} responded with status ${response.status}`
          );
        }
      } catch (error) {
        console.error(`[WEBHOOK_FORWARD] Failed to send to ${url}:`, error);
      }
    })
  );
}
