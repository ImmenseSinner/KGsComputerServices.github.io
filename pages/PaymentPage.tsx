import { useState } from "react";
import { CreditCard, Loader2, ShieldCheck, Lock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentFormHtml, setPaymentFormHtml] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/payments/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          item_name: `Riifs Projects Payment - ${reference || "General"}`,
          name,
          email,
          cell,
          reference,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to initiate payment");
      }

      setPaymentFormHtml(data.formHtml);
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
              Payment
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Make a Secure Payment
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-steel-300">
              Pay invoices, deposits or project fees securely through PayFast,
              South Africa&apos;s trusted payment gateway.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="bg-steel-100 py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-12">
            <div className="mb-8 flex items-center gap-4 rounded-2xl bg-green-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-steel-900">Secure Checkout</h3>
                <p className="text-sm text-steel-600">
                  Payments are processed securely by PayFast. We do not store
                  your banking details.
                </p>
              </div>
            </div>

            {paymentFormHtml ? (
              <div
                className="space-y-6"
                dangerouslySetInnerHTML={{ __html: paymentFormHtml }}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-steel-700">
                    Payment Amount (ZAR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-steel-400">
                      R
                    </span>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-xl border border-steel-200 bg-steel-50 py-3 pl-10 pr-4 text-lg font-semibold text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-steel-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-steel-200 bg-steel-50 px-4 py-3 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-steel-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-steel-200 bg-steel-50 px-4 py-3 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-steel-700">
                      Cell Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={cell}
                      onChange={(e) => setCell(e.target.value)}
                      className="w-full rounded-xl border border-steel-200 bg-steel-50 px-4 py-3 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                      placeholder="+27 78 341 551"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-steel-700">
                    Invoice / Reference Number
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full rounded-xl border border-steel-200 bg-steel-50 px-4 py-3 text-steel-900 outline-none transition-colors focus:border-weld-500 focus:bg-white focus:ring-2 focus:ring-weld-500/20"
                    placeholder="INV-00123"
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Proceed to PayFast
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-steel-500">
                  <Lock className="h-4 w-4" />
                  <span>SSL-encrypted connection</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
