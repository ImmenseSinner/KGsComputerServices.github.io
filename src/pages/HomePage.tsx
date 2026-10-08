import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Wrench,
  HardHat,
  Cog,
  Factory,
  Building2,
  CheckCircle,
} from "lucide-react";

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "11-15", label: "Skilled Employees" },
  { value: "100%", label: "Safety Focused" },
];

const services = [
  {
    icon: Building2,
    title: "Steel Construction",
    description:
      "Heavy-duty steel construction for industrial, commercial and mining infrastructure.",
  },
  {
    icon: Factory,
    title: "Structural Fabrication",
    description:
      "Precision fabrication of steel structures, frames and components to exact specifications.",
  },
  {
    icon: HardHat,
    title: "Steel Erection",
    description:
      "Safe and efficient on-site steel erection with certified rigging teams.",
  },
  {
    icon: Wrench,
    title: "Plant Maintenance",
    description:
      "Scheduled and emergency maintenance for processing plants and industrial facilities.",
  },
];

const industries = [
  "Mining",
  "Civil Engineering",
  "Bridge Construction",
  "Steel Products",
  "Steel Erection",
  "Boilermaking",
];

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center bg-hero-pattern bg-cover bg-center bg-no-repeat pt-20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-weld-500/30 bg-weld-500/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-weld-500 animate-pulse" />
              <span className="text-sm font-medium text-weld-400">
                Verified Steel & Engineering Contractor
              </span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Engineering Strength.
              <br />
              <span className="text-weld-400">Built to Last.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-steel-300 sm:text-xl">
              Riifs Projects delivers superior engineering services from EPCM
              solutions and engineering design to construction, heavy steel
              fabrication and plant maintenance across Rustenburg and South
              Africa.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/enquiry"
                className="group inline-flex items-center gap-2 rounded-full bg-weld-500 px-8 py-4 font-semibold text-steel-900 transition-all hover:bg-weld-400"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-steel-500 bg-steel-900/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-steel-800"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-steel-900/90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-steel-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-weld-600">
              What We Do
            </span>
            <h2 className="mt-3 text-3xl font-bold text-steel-900 sm:text-4xl">
              Comprehensive Steel & Engineering Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-steel-600">
              From concept to completion, we provide end-to-end engineering
              services tailored to the mining, construction and industrial
              sectors.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-steel-200 bg-steel-50 p-8 transition-all hover:-translate-y-1 hover:border-weld-300 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-weld-400 to-weld-600 text-white shadow-md transition-transform group-hover:scale-110">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-steel-900">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-steel-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-steel-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-steel-800"
            >
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-steel-900 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-weld-400">
                Why Riifs Projects
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Trusted Engineering Partner Since 2016
              </h2>
              <p className="mt-6 text-steel-300">
                With nearly a decade of hands-on experience, Riifs Projects has
                become a trusted name in steel construction and fabrication. Our
                team of 11-15 skilled professionals is committed to safety,
                quality and on-time delivery.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Certified welding and fabrication standards",
                  "Experienced project management and EPCM capability",
                  "Rigorous health, safety and environmental compliance",
                  "Responsive maintenance and repair support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-weld-500" />
                    <span className="text-steel-200">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-weld-500 px-8 py-4 font-semibold text-weld-400 transition-colors hover:bg-weld-500 hover:text-steel-900"
                >
                  Learn More About Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-weld-500/20 to-weld-600/5" />
              <div className="relative grid gap-6 sm:grid-cols-2">
                {[
                  { icon: Shield, title: "Quality Assured", text: "ISO-aligned fabrication and inspection processes." },
                  { icon: Cog, title: "Turnkey Solutions", text: "Design, build, erect and maintain from one partner." },
                  { icon: HardHat, title: "Safety First", text: "Toolbox talks, PPE and incident-free track record." },
                  { icon: Wrench, title: "Rapid Response", text: "Emergency repairs and shutdown support." },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-steel-700 bg-steel-800 p-6"
                  >
                    <card.icon className="mb-4 h-8 w-8 text-weld-500" />
                    <h4 className="mb-2 text-lg font-bold text-white">
                      {card.title}
                    </h4>
                    <p className="text-sm text-steel-400">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-steel-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-steel-900 sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-steel-600">
              Our expertise spans multiple heavy-industry sectors across South
              Africa.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-steel-300 bg-white px-6 py-3 text-sm font-semibold text-steel-700 shadow-sm"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-weld-500 to-weld-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-steel-900 sm:text-4xl">
            Ready to Start Your Next Project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-steel-800">
            Contact us today for a detailed quotation or submit an enquiry and
            our team will get back to you within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/enquiry"
              className="inline-flex items-center gap-2 rounded-full bg-steel-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-steel-800"
            >
              Submit Enquiry
            </Link>
            <Link
              to="/payment"
              className="inline-flex items-center gap-2 rounded-full border-2 border-steel-900 bg-transparent px-8 py-4 font-semibold text-steel-900 transition-colors hover:bg-steel-900 hover:text-white"
            >
              Make a Payment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
