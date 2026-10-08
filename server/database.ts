import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.resolve(dataDir, "riifs.db");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// Enquiries table
db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    otp TEXT NOT NULL,
    verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Payments table
db.exec(`
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    item_name TEXT NOT NULL,
    payer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    cell TEXT NOT NULL,
    reference TEXT,
    payfast_payment_id TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Prepared statements
export const insertEnquiry = db.prepare<
  [string, string, string, string | undefined, string, string, string]
>(`
  INSERT INTO enquiries (name, email, phone, company, service, message, otp)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

export const getEnquiryById = db.prepare<[number]>(`
  SELECT * FROM enquiries WHERE id = ?
`);

export const verifyEnquiry = db.prepare<[number]>(`
  UPDATE enquiries SET verified = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?
`);

export const insertPayment = db.prepare<
  [number, string, string, string, string, string | undefined]
>(`
  INSERT INTO payments (amount, item_name, payer_name, email, cell, reference)
  VALUES (?, ?, ?, ?, ?, ?)
`);

export const updatePaymentStatus = db.prepare<[string, string, number]>(`
  UPDATE payments
  SET status = ?, payfast_payment_id = ?, updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);
