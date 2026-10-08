import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

const contactDetails = [
  {
    icon: MapPin,
    title: "Address",
    lines: [
      "Ext 3 Phatsima",
      "Rustenburg, North West",
      "South Africa",
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["067 115 6426"],
    href: "tel:0671156426",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["kgscomputerservices.info@gmail.com"],
    href: "mailto:kgscomputerservices.info@gmail.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: [
      "Mon - Fri: 08:00 - 17:00",
      "Saturday: 08:00 - 13:00",
      "Sunday: Closed",
    ],
  },
  {
    icon: User,
    title: "Contact Person",
    lines: ["Kagiso 'KG'"],
  },
  {
    icon: Briefcase,
    title: "Company Manager",
    lines: ["Kagiso Mokua"],
  },
];

export function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-steel-900 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-weld-400">
              Contact
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-steel-300">
              Visit our office in Rustenburg or reach out by phone or email. We
              look forward to partnering with you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contactDetails.map((detail) => (
              <div
                key={detail.title}
                className="rounded-2xl border border-steel-200 bg-steel-50 p-8 transition-all hover:border-weld-300 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-weld-400 to-weld-600 text-white shadow-md">
                  <detail.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-steel-900">
                  {detail.title}
                </h3>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-steel-600 transition-colors hover:text-weld-600"
                  >
                    {detail.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </a>
                ) : (
                  <div className="text-steel-600">
                    {detail.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-steel-200 bg-steel-100 shadow-inner">
            <div className="aspect-[21/9] w-full">
              <iframe
                title="Riifs Projects Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114588.04806157927!2d27.17794065!3d-25.65461165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebe0f7a6f7b3d47%3A0x3e3f0c8e1e2e8b0!2sRustenburg!5e0!3m2!1sen!2sza!4v1699900000000!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-steel-900 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Prefer to send an enquiry online?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-steel-300">
              Complete our enquiry form and we will send you a verification code
              to confirm your request.
            </p>
            <Link
              to="/enquiry"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-weld-500 px-8 py-4 font-semibold text-steel-900 transition-colors hover:bg-weld-400"
            >
              Submit an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
