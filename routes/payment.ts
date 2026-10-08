import { Router } from "express";
import crypto from "crypto";
import querystring from "querystring";
import { insertPayment, updatePaymentStatus } from "../database.js";
import type { PaymentInput, YocoApiConfig } from "../types.js";

const router = Router();

const yocoApiKey = process.env.YOCO_API_KEY || "pk_live_620dcbf5mWJDoLVdaf14"; // Replace with your actual Yoco API key

router.post("/yoco-initiate", async (req, res) => {
  const { amount, email } = req.body;
  const response = await fetch("https://online.yoco.com/v1/payments", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${yocoApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount_in_cents: Math.round(amount * 100),
      currency: "ZAR",
      email,
    }),
  });

  const data = await response.json();
  res.json(data);
});

const yocoConfig: YocoApiConfig = {
  merchantId: process.env.YOCO_MERCHANT_ID || "KAGISOMOKUA74@GMAIL.COM",
  merchantKey: process.env.YOCO_MERCHANT_KEY || "pk_live_620dcbf5mWJDoLVdaf14",
  passphrase: process.env.YOCO_PASSPHRASE,
  sandbox: process.env.YOCO_SANDBOX !== "false",
};

const yocoHost = yocoConfig.sandbox
  ? "sandbox.yoco.com"
  : "online.yoco.com";

function generateSignature(data: Record<string, string>, passphrase?: string): string {
  const filtered: Record<string, string> = {};
  for (const key of Object.keys(data).sort()) {
    if (data[key] !== undefined && data[key] !== "" && key !== "signature") {
      filtered[key] = data[key];
    }
  }

  let signatureString = querystring.stringify(filtered, "&", "=");
  if (passphrase) {
    signatureString += `&passphrase=${encodeURIComponent(passphrase)}`;
  }

  return crypto.createHash("md5").update(signatureString).digest("hex");
}

router.post("/initiate", async (req, res) => {
  try {
    const { amount, item_name, name, email, cell, reference }: PaymentInput = req.body;

    if (!amount || amount <= 0 || !name || !email || !cell) {
      res.status(400).json({ message: "Please provide valid payment details." });
      return;
    }

    const result = insertPayment.run(
      amount,
      item_name,
      name,
      email,
      cell,
      reference
    );
    const paymentId = Number(result.lastInsertRowid);

    const returnUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment/success`;
    const cancelUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment`;
    const notifyUrl = `${process.env.API_BASE_URL || "http://localhost:3001/api"}/payments/notify`;

    const paymentData: Record<string, string> = {
      merchant_id: yocoConfig.merchantId,
      merchant_key: yocoConfig.merchantKey,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      name_first: name,
      email_address: email,
      cell_number: cell,
      m_payment_id: paymentId.toString(),
      amount: amount.toFixed(2),
      item_name: item_name || "Riifs Projects Payment",
      custom_str1: reference || "",
    };

    paymentData.signature = generateSignature(paymentData, yocoConfig.passphrase);

    const formHtml = `
      <form action="https://${yocoHost}/eng/process" method="POST" id="yoco-form">
        ${Object.entries(paymentData)
          .map(
            ([key, value]) =>
              `<input type="hidden" name="${key}" value="${value.replace(/"/g, "&quot;")}" />`
          )
          .join("")}
        <p class="text-center text-steel-600 mb-4">Click below to complete your secure payment on Yoco.</p>
        <button type="submit" class="w-full rounded-full bg-weld-600 px-8 py-4 font-semibold text-white hover:bg-weld-700">
          Pay Now R${amount.toFixed(2)}
        </button>
      </form>
    `;

    res.json({ formHtml });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ message: "Failed to initiate payment." });
  }
});

router.post("/notify", async (req, res) => {
  try {
    const payload = req.body;
    const signature = payload.signature;

    const calculated = generateSignature(payload, yocoConfig.passphrase);

    if (signature !== calculated) {
      res.status(400).send("Invalid signature");
      return;
    }

    const paymentId = Number(payload.m_payment_id);
    const yocoPaymentId = payload.yoco_payment_id as string;
    const paymentStatus = payload.payment_status as string;

    if (paymentId && yocoPaymentId) {
      updatePaymentStatus.run(
        paymentStatus === "COMPLETE" ? "complete" : paymentStatus.toLowerCase(),
        yocoPaymentId,
        paymentId
      );
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Yoco ITN error:", error);
    res.status(500).send("Error");
  }
});

export default router;
