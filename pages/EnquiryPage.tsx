import { useState } from "react";
import { Send, CheckCircle, Loader2, Phone, Mail, User, Building, FileText } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function EnquiryPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [step, setStep] = useState<"form" | "verify" | "success">("form");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enquiryId, setEnquiryId] = useState<number | null>(null);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Sending to:", `${API_URL}/enquiries`);
    console.log("Data:", formData);

      const res = await fetch(`${API_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      setEnquiryId(data.enquiryId);
      setStep("verify");
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/enquiries/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!enquiryId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/enquiries/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setError("A new verification code has been sent.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-steel-900 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-weld-400">
              Enquiry
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Request a Quote
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-steel-300">
              Tell us about your project and we will respond within 24 hours.
              Verify your contact details with the code sent to your email and
              phone.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-steel-100 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-12">
            {step === "form" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-steel-700">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-steel-200 bg-steel-50 py-3 pl-10 pr-4 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-steel-700">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-steel-200 bg-steel-50 py-3 pl-10 pr-4 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-steel-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-steel-200 bg-steel-50 py-3 pl-10 pr-4 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-steel-700">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-steel-200 bg-steel-50 py-3 pl-10 pr-4 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                        placeholder="+27 78 341 551"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-steel-700">
                    Service Required *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-400" />
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-steel-200 bg-steel-50 py-3 pl-10 pr-4 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                    >
                      <option value="">Select a service</option>
                      <option value="Steel Construction">Steel Construction</option>
                      <option value="Structural Fabrication">Structural Fabrication</option>
                      <option value="Steel Erection">Steel Erection</option>
                      <option value="Plant Maintenance">Plant Maintenance</option>
                      <option value="Engineering Design">Engineering Design</option>
                      <option value="EPCM Solutions">EPCM Solutions</option>
                      <option value="Mining Infrastructure">Mining Infrastructure</option>
                      <option value="Bridge Construction">Bridge Construction</option>
                      <option value="Boilermaking">Boilermaking</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-steel-700">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-steel-200 bg-steel-50 p-4 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                    placeholder="Describe your project, timeline and any specific requirements..."
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-steel-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-steel-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-steel-500">
                  By submitting, you agree to receive a verification code via
                  email and SMS.
                </p>
              </form>
            )}

            {step === "verify" && (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-weld-100 text-weld-600">
                  <Mail className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-steel-900">
                  Verify Your Contact Details
                </h2>
                <p className="mt-3 text-steel-600">
                  We sent a 6-digit verification code to your email and phone.
                  Enter it below to confirm your enquiry.
                </p>

                <form onSubmit={handleVerify} className="mt-8 space-y-6">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="mx-auto block w-48 rounded-xl border border-steel-200 bg-steel-50 py-4 text-center text-2xl font-bold tracking-[0.5em] text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                    placeholder="000000"
                  />

                  {error && (
                    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-weld-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-weld-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Send Enquiry"
                    )}
                  </button>
                </form>

                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="mt-6 text-sm font-semibold text-steel-600 hover:text-weld-600 disabled:opacity-70"
                >
                  Didn&apos;t receive it? Resend code
                </button>
              </div>
            )}

            {step === "success" && (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-steel-900">
                  Enquiry Submitted Successfully
                </h2>
                <p className="mt-3 text-steel-600">
                  Thank you for contacting Riifs Projects. Our team will review
                  your request and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setStep("form");
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      service: "",
                      message: "",
                    });
                    setOtp("");
                    setEnquiryId(null);
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-steel-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-steel-800"
                >
                  Submit Another Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
