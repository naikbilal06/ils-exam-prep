import dotenv from "dotenv";
import { sendWhatsAppOtp } from "../lib/whatsapp.js";

dotenv.config({ path: ".env" });

const testNumber = process.argv[2];

if (!testNumber) {
  console.log(`
=============================================================
ILS Ranker — WhatsApp Cloud API Tester
=============================================================
Usage:
  node scripts/test-whatsapp.js <10-digit-mobile-number>

Example:
  node scripts/test-whatsapp.js 9876543210
=============================================================
`);
  process.exit(1);
}

const mockOtp = "123456";

console.log("=== Testing Meta WhatsApp Cloud API ===");
console.log("Recipient:", testNumber);
console.log("Generated Mock OTP:", mockOtp);
console.log("Phone Number ID:", process.env.WHATSAPP_PHONE_NUMBER_ID || "(Not set)");
console.log("Template:", process.env.WHATSAPP_TEMPLATE_NAME || "ils_otp_verification");
console.log("========================================");

sendWhatsAppOtp({ mobile: testNumber, otp: mockOtp })
  .then((result) => {
    console.log("\nResult:", result);
    if (result.sent) {
      console.log("\nSUCCESS! Check your WhatsApp for the test message.");
    } else {
      console.log("\nNOTE: Simulated mode active because credentials are missing in .env.");
    }
  })
  .catch((err) => {
    console.error("\nTEST FAILED:", err.message);
  });
