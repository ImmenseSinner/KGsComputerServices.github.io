import "./config.js";
import express from "express";
// ... rest of imports
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
// Try loading .env from multiple locations
dotenv.config({ path: path.resolve(__dirname, ".env") });           // server/.env
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });     // project-root/.env
dotenv.config();


import cors from "cors";
import enquiryRoutes from "./routes/enquiry.js";
import paymentRoutes from "./routes/payment.js";

const app = express();
const PORT = Number(process.env.PORT || 3001);
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL || "",
  process.env.FRONTEND_URL_WWW || "",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (origin.match(/^https?:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/)) {
        return callback(null, true);
      }
       if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Riifs Projects API server running on port ${PORT}`);
  console.log("Allowed origins:", allowedOrigins);
  console.log("SMTP_USER loaded:", !!process.env.SMTP_USER);
  console.log("TWILIO_ACCOUNT_SID loaded:", !!process.env.TWILIO_ACCOUNT_SID);
  console.log("TWILIO_PHONE_NUMBER loaded:", !!process.env.TWILIO_PHONE_NUMBER);
});