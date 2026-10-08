import { CheckCircle, Users, Calendar, Award } from "lucide-react";

const companyDetails = [
  { label: "Company Name", value: "KGs Computer Services (PTY) LTD" },
  { label: "Address", value: "Ext 3 Phatsima, Rustenburg, North West, South Africa" },
  { label: "Contact Person", value: "Kagiso Mokua" },
  { label: "Company Manager", value: "Kagiso Mokua" },
  { label: "Established", value: "2024" },
  { label: "Employees", value: "5" },
  { label: "Registration Code", value: "KC202433186407" },
  { label: "VAT Registration", value: "4460281480" },
  { label: "Contact Number", value: "067 115 6426" },
];

const values = [
  {
    icon: Award,
    title: "Quality",
    text: "We never compromise on materials, workmanship or safety standards.",
  },
  {
    icon: Users,
    title: "People",
    text: "Our skilled team is our greatest asset, continuously trained and safety-conscious.",
  },
  {
    icon: Calendar,
    title: "Reliability",
    text: "We deliver on time and within budget, keeping your project on track.",
  },
];

export function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-steel-900 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-weld-400">
              About Us
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Built on Experience, Driven by Excellence
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-steel-300">
              KGs Computer Services (PTY) LTD has grown from a local computer services provider into a
              full-service technology contractor serving the mining,
              construction and industrial sectors of South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-white py-24" text-align="Left" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ textAlign: "justify" }}>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-steel-900 sm:text-4xl">
                Who We Are
              </h2>
              <p className="mt-6 text-steel-600 leading-relaxed" >
                KGS Computer Services is a local tech and business support company based in Ext 3, Phatsima, Rustenburg.
                Since 2024, we have been committed to making technology and administrative tasks easier for our community.<br />

                We provide practical, affordable, and reliable services, including:
              <ul className="list-disc list-inside mt-2 text-steel-600" style={{ textAlign: "left" }} >
                <li>Computer repairs</li>
                <li>Typing services</li>
                <li>Computer tutoring</li>
                <li>Software installation</li>
                <li>Company registrations</li>
              </ul>
              <br />
                Whether you need your laptop fixed, documents typed professionally, help learning computer skills, software installed,
                or assistance registering your business, KGS Computer Services is here to help.<br />

                We pride ourselves on friendly service, honest pricing, and quick turnaround. <br />
                As a growing local business, we are passionate about empowering students, job seekers, entrepreneurs,
                and small businesses in Ext 3, Phatsima, Rustenburg, and surrounding areas.<br />

                At KGS Computer Services, your technology and business needs are our priority.<br />
              </p>
              <p className="mt-4 text-steel-600 leading-relaxed">
               
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-steel-200 bg-steel-50 p-6 text-center"
                  >
                    <value.icon className="mx-auto mb-4 h-8 w-8 text-weld-600" />
                    <h4 className="font-bold text-steel-900">{value.title}</h4>
                    <p className="mt-2 text-xs text-steel-600">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-steel-900 p-8 sm:p-12">
              <h3 className="mb-8 text-2xl font-bold text-white">
                Company Information
              </h3>
              <dl className="space-y-5">
                {companyDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex flex-col border-b border-steel-700 pb-4 sm:flex-row sm:justify-between"
                  >
                    <dt className="text-sm font-semibold uppercase tracking-wider text-steel-400">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 text-steel-200 sm:mt-0 sm:text-right">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-steel-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-steel-900 sm:text-4xl">
              Our Capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-steel-600">
              A full spectrum of Computer and Tutoring services under one
              roof.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
             "Computer Repairs",
             "Laptop & Desktop Diagnostics",
             "Virus & Malware Removal",
             "Software Installation",
             "Operating System Setup",
             "Typing Services",
             "Document Formatting",
             "Computer Tutoring",
             "Basic Computer Training",
             "Company Registrations",
             "CIPC Registration Assistance",
             "IT Support & Consulting"
            ].map((capability) => (
              <div
                key={capability}
                className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"
              >
                <CheckCircle className="h-6 w-6 shrink-0 text-weld-600" />
                <span className="font-semibold text-steel-800">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
