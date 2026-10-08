# Riifs Projects Website

A modern, production-ready website for **Riifs Projects**, a steel construction, fabrication and engineering company based in Rustenburg, South Africa.

## Features

- **Company Website** – Tailored industrial design with Home, About, Services, Contact, Enquiry and Payment pages.
- **Enquiry Form with Verification** – Submit project enquiries and verify contact details via OTP sent by **email** and **SMS**.
- **SQLite Database** – All enquiries and payment records are stored locally.
- **Payment Gateway** – Secure payments through **PayFast** (South Africa) with server-side signature generation and ITN webhook.
- **Responsive Design** – Fully responsive using React, Vite and Tailwind CSS.

## Tech Stack

- **Frontend:** React 19, React Router, Vite 7, Tailwind CSS 4, Lucide icons
- **Backend:** Express.js, better-sqlite3, TypeScript
- **Email:** Nodemailer (SMTP)
- **SMS:** Twilio
- **Payments:** PayFast

## Project Structure

```
├── index.html                 # HTML entry point
├── package.json
├── src/
│   ├── App.tsx                # React app with router
│   ├── index.css              # Tailwind + custom styles
│   ├── main.tsx               # React root render
│   ├── components/            # Navbar, Footer
│   └── pages/                 # Home, About, Services, Enquiry, Payment, Contact
├── server/
│   ├── index.ts               # Express server entry
│   ├── database.ts            # SQLite database setup
│   ├── routes/
│   │   ├── enquiry.ts         # Enquiry + OTP API
│   │   └── payment.ts         # PayFast payment API
│   ├── services/
│   │   ├── email.ts           # Nodemailer service
│   │   └── sms.ts             # Twilio service
│   ├── types.ts               # Shared TypeScript types
│   └── .env.example           # Environment variables template
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your credentials:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your SMTP, Twilio and PayFast credentials.

### 3. Run the backend server

```bash
npx tsx server/index.ts
```

The API will run on `http://localhost:3001`.

### 4. Run the frontend

```bash
npm run dev
```

The website will open on `http://localhost:5173`.

### 5. Build for production

```bash
npm run build
```

The static frontend build is output to `dist/`.

## PayFast Configuration

- Use the sandbox credentials for testing:
  - `PAYFAST_MERCHANT_ID=10000100`
  - `PAYFAST_MERCHANT_KEY=46f0cd694581a`
  - `PAYFAST_SANDBOX=true`
- For live payments, set your real PayFast merchant credentials and `PAYFAST_SANDBOX=false`.
- Add a passphrase in your PayFast account and set it in `PAYFAST_PASSPHRASE`.

## Email & SMS

- Email and SMS are mocked in the console if credentials are not configured.
- Configure SMTP and Twilio details in `server/.env` to enable real delivery.

## Deployment Notes

- Deploy the frontend build (`dist/`) to any static host (Netlify, Vercel, Cloudflare Pages, etc.).
- Deploy the backend (`server/`) to a Node.js host (Render, Railway, VPS, etc.).
- Set `VITE_API_URL` in your frontend environment to point to your deployed backend.
- Ensure the backend can receive PayFast ITN callbacks on `/api/payments/notify`.

## License

© Riifs Projects. All rights reserved.
