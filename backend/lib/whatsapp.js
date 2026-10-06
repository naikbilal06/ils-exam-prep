/**
 * Meta WhatsApp Cloud API Client for ILS Ranker
 */

export async function sendWhatsAppOtp({ mobile, otp }) {
  const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || "ils_otp_verification";
  const languageCode = process.env.WHATSAPP_TEMPLATE_LANG || "en_US";
  const templateType = (process.env.WHATSAPP_TEMPLATE_TYPE || "utility").toLowerCase();

  // Clean and format recipient number (Meta Cloud API requires country code without '+' or leading 0s)
  const cleanNumber = String(mobile || "").replace(/\D/g, "");
  // Default to Indian country code 91 if 10-digit number
  const fullRecipient = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;

  if (!token || !phoneNumberId) {
    console.warn(
      `[WhatsApp Cloud API] WHATSAPP_CLOUD_API_TOKEN or WHATSAPP_PHONE_NUMBER_ID is not configured in .env. Skipping real dispatch. OTP: ${otp}`
    );
    return {
      sent: false,
      simulated: true,
      message: "WhatsApp credentials not configured; OTP logged to server console.",
    };
  }

  // Construct components based on template type
  let components = [];
  if (templateType === "authentication") {
    // Standard Meta Authentication Template (with optional COPY_CODE button)
    components = [
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: String(otp),
          },
        ],
      },
      {
        type: "button",
        sub_type: "url",
        index: "0",
        parameters: [
          {
            type: "text",
            text: String(otp),
          },
        ],
      },
    ];
  } else if (templateName === "hello_world") {
    components = [];
  } else {
    // Standard Utility Template with 1 variable {{1}} for the OTP code
    components = [
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: String(otp),
          },
        ],
      },
    ];
  }

  const templatePayload = {
    name: templateName,
    language: {
      code: languageCode,
    },
  };

  if (components.length > 0) {
    templatePayload.components = components;
  }

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: fullRecipient,
    type: "template",
    template: templatePayload,
  };

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    const errorMsg = data?.error?.message || `WhatsApp Cloud API error (Status ${response.status})`;
    console.error("[WhatsApp Cloud API Error]:", JSON.stringify(data.error || data, null, 2));
    throw new Error(errorMsg);
  }

  console.log(`[WhatsApp Cloud API] OTP dispatched to +${fullRecipient}. Message ID:`, data.messages?.[0]?.id);

  return {
    sent: true,
    messageId: data.messages?.[0]?.id,
  };
}
