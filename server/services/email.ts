import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const fromEmail = process.env.FROM_EMAIL || smtpUser || "noreply@riifsprojects.co.za";

const hasCredentials = smtpUser && smtpPass;

const transporter = hasCredentials
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })
  : null;

// Verify SMTP at startup
if (transporter) {
  transporter.verify()
    .then(() => console.log("✅ SMTP connection verified"))
    .catch((err) => console.warn("⚠️ SMTP verification failed:", err.message));
} else {
  console.warn("⚠️ SMTP credentials missing — emails will be mocked");
}

export async function sendOtpEmail(to: string, name: string, otp: string) {
  if (!transporter) {
    console.log(`[EMAIL MOCK] OTP ${otp} sent to ${to}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Riifs Projects" <${fromEmail}>`,
      to,
      subject: "Your Riifs Projects Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Verify Your Enquiry</h2>
          <p>Hi ${name},</p>
          <p>Please use the verification code below:</p>
          <div style="padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #d97706;">${otp}</span>
          </div>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br><strong>Riifs Projects Team</strong></p>
        </div>
      `,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err: any) {
    console.error("❌ Email send failed:", err.message);
  }
}

export async function sendEnquiryNotification(to: string, name: string) {
  if (!transporter) {
    console.log(`[EMAIL MOCK] Notification sent to ${to}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Riifs Projects" <${fromEmail}>`,
      to,
      subject: "We Have Received Your Enquiry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Enquiry Received</h2>
          <p>Hi ${name},</p>
          <p>Your enquiry has been verified. Our team will get back to you within 24 hours.</p>
          <p>Best regards,<br><strong>Riifs Projects Team</strong></p>
        </div>
      `,
    });
  } catch (err: any) {
    console.error("❌ Notification email failed:", err.message);
  }
}

export async function sendAdminNotification(enquiry: {
  name: string; email: string; phone: string;
  company?: string; service: string; message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || smtpUser;
  if (!transporter || !adminEmail) {
    console.log("[EMAIL MOCK] Admin notification skipped");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Riifs Projects Website" <${fromEmail}>`,
      to: adminEmail,
      subject: "New Verified Enquiry - Riifs Projects",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">New Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Name</td><td style="padding: 8px;">${enquiry.name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td><td style="padding: 8px;">${enquiry.email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone</td><td style="padding: 8px;">${enquiry.phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Service</td><td style="padding: 8px;">${enquiry.service}</td></tr>
          </table>
          <p style="font-weight: bold; margin-top: 16px;">Message:</p>
          <p style="white-space: pre-wrap;">${enquiry.message}</p>
        </div>
      `,
    });
  } catch (err: any) {
    console.error("❌ Admin notification failed:", err.message);
  }
}