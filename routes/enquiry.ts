import { Router } from "express";
import crypto from "crypto";
import { insertEnquiry, getEnquiryById, verifyEnquiry } from "../database.js";
import { sendOtpEmail, sendEnquiryNotification, sendAdminNotification } from "../services/email.js";
import { sendOtpSms } from "../services/sms.js";
import type { EnquiryInput } from "../types.js";


const router = Router();

function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, service, message }: EnquiryInput = req.body;

    if (!name || !email || !phone || !service || !message) {
      res.status(400).json({ message: "Please fill in all required fields." });
      return;
    }

    const otp = generateOtp();

    const result = insertEnquiry.run(
      name,
      email,
      phone,
      company,
      service,
      message,
      otp
    );

    const enquiryId = Number(result.lastInsertRowid);

    await Promise.all([
      sendOtpEmail(email, name, otp),
      sendOtpSms(phone, otp),
    ]);

    res.status(201).json({
      message: "Enquiry created. Please verify with the code sent to your email and phone.",
      enquiryId,
    });
  } catch (error) {
    console.error("Enquiry creation error:", error);
    res.status(500).json({ message: "Failed to create enquiry." });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { enquiryId, otp } = req.body;

    if (!enquiryId || !otp) {
      res.status(400).json({ message: "Enquiry ID and OTP are required." });
      return;
    }

    const enquiry = getEnquiryById.get(enquiryId) as
      | {
          id: number;
          name: string;
          email: string;
          phone: string;
          company?: string;
          service: string;
          message: string;
          otp: string;
          verified: number;
        }
      | undefined;

    if (!enquiry) {
      res.status(404).json({ message: "Enquiry not found." });
      return;
    }

    if (enquiry.verified) {
      res.status(400).json({ message: "Enquiry already verified." });
      return;
    }

    if (enquiry.otp !== otp.trim()) {
      res.status(400).json({ message: "Invalid verification code." });
      return;
    }

    verifyEnquiry.run(enquiryId);

    await Promise.all([
      sendEnquiryNotification(enquiry.email, enquiry.name),
      sendAdminNotification(enquiry),
    ]);

    res.json({ message: "Enquiry verified successfully." });
  } catch (error) {
    console.error("Enquiry verification error:", error);
    res.status(500).json({ message: "Failed to verify enquiry." });
  }
});

router.post("/resend", async (req, res) => {
  try {
    const { enquiryId } = req.body;

    if (!enquiryId) {
      res.status(400).json({ message: "Enquiry ID is required." });
      return;
    }

    const enquiry = getEnquiryById.get(enquiryId) as
      | { name: string; email: string; phone: string; otp: string; verified: number }
      | undefined;

    if (!enquiry) {
      res.status(404).json({ message: "Enquiry not found." });
      return;
    }

    if (enquiry.verified) {
      res.status(400).json({ message: "Enquiry already verified." });
      return;
    }

    await Promise.all([
      sendOtpEmail(enquiry.email, enquiry.name, enquiry.otp),
      sendOtpSms(enquiry.phone, enquiry.otp),
    ]);

    res.json({ message: "Verification code resent." });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Failed to resend verification code." });
  }
});

export default router;