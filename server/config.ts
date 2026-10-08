import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

console.log("=== ENV CHECK ===");
console.log("SMTP_USER:", !!process.env.SMTP_USER);
console.log("TWILIO_ACCOUNT_SID:", !!process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO_PHONE_NUMBER:", !!process.env.TWILIO_PHONE_NUMBER);
console.log("=================");