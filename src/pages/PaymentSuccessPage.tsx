import { Link } from "react-router-dom";
import { CheckCircle, Home, FileText } from "lucide-react";

export function PaymentSuccessPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-steel-100 pt-20 pb-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-steel-900 sm:text-3xl">
            Payment Successful
          </h1>
          <p className="mt-4 text-steel-600">
            Thank you for your payment. A confirmation will be sent to your
            email address once the transaction has been processed by PayFast.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-steel-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-steel-800"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              to="/enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-steel-300 bg-white px-6 py-3 font-semibold text-steel-700 transition-colors hover:bg-steel-50"
            >
              <FileText className="h-4 w-4" />
              Submit Enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
