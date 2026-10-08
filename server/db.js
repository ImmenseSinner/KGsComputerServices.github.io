// db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'riifs_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Enquiries queries
export const insertEnquiry = async (data) => {
    const [result] = await pool.execute(
        `INSERT INTO enquiries (name, email, phone, company, service, message, otp)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [data.name, data.email, data.phone, data.company, data.service, data.message, data.otp]
    );
    return result.insertId;
};

export const getEnquiryById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT * FROM enquiries WHERE id = ?',
        [id]
    );
    return rows[0];
};

export const verifyEnquiry = async (id) => {
    await pool.execute(
        'UPDATE enquiries SET verified = 1 WHERE id = ?',
        [id]
    );
};

export const getEnquiryByOtp = async (otp) => {
    const [rows] = await pool.execute(
        'SELECT * FROM enquiries WHERE otp = ?',
        [otp]
    );
    return rows[0];
};

// Payments queries
export const insertPayment = async (data) => {
    const [result] = await pool.execute(
        `INSERT INTO payments (amount, item_name, payer_name, email, cell, reference)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [data.amount, data.itemName, data.payerName, data.email, data.cell, data.reference]
    );
    return result.insertId;
};

export const updatePaymentStatus = async (id, status, payfastPaymentId) => {
    await pool.execute(
        'UPDATE payments SET status = ?, payfast_payment_id = ? WHERE id = ?',
        [status, payfastPaymentId, id]
    );
};

export const getPaymentByReference = async (reference) => {
    const [rows] = await pool.execute(
        'SELECT * FROM payments WHERE reference = ?',
        [reference]
    );
    return rows[0];
};

export default pool;