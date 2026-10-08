import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const fromNumber = process.env.TWILIO_PHONE_NUMBER || "";

let client: ReturnType<typeof twilio> | null = null;

// Only create client if credentials look valid
if (
  accountSid.startsWith("AC") &&
  authToken.length > 20 &&
  fromNumber.startsWith("+")
) {
  try {
    client = twilio(accountSid, authToken);
    console.log("✅ Twilio client initialized");
  } catch (err: any) {
    console.warn("⚠️ Twilio init failed:", err.message);
    client = null;
  }
} else {
  console.warn("⚠️ Twilio credentials missing or invalid — SMS will be mocked");
  console.warn("   TWILIO_ACCOUNT_SID starts with AC:", accountSid.startsWith("AC"));
  console.warn("   TWILIO_AUTH_TOKEN length > 20:", authToken.length > 20);
  console.warn("   TWILIO_PHONE_NUMBER starts with +:", fromNumber.startsWith("+"));
}

export async function sendOtpSms(to: string, otp: string) {
  if (!client || !fromNumber) {
    console.log(`[SMS MOCK] OTP ${otp} sent to ${to}`);
    return;
  }

  const formattedTo = to.startsWith("+") ? to : `+27${to.replace(/^0/, "")}`;

  try {
    await client.messages.create({
      body: `Your Riifs Projects verification code is: ${otp}`,
      from: fromNumber,
      to: formattedTo,
    });
    console.log(`✅ SMS sent to ${formattedTo}`);
  } catch (err: any) {
    console.error("❌ SMS send failed:", err.message);
    // Don't throw — don't crash the enquiry flow
  }
}