import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Factory,
  HardHat,
  Wrench,
  Ruler,
  ClipboardList,
  Pickaxe,
  Hammer,
} from "lucide-react";

function BridgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 21v-8a6 6 0 0 1 12 0v8" />
      <path d="M4 21h16" />
      <path d="M2 21h2" />
      <path d="M20 21h2" />
    </svg>
  );
}

interface Service {
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Building2,
    title: "Steel Construction",
    description:
      "We design and construct durable steel buildings, warehouses, workshops and industrial structures. Our steel construction services cover everything from foundations and columns to roofing and cladding, ensuring structural integrity and compliance with South African building standards.",
    features: [
      "Industrial & commercial buildings",
      "Warehouse & workshop structures",
      "Mezzanine floors & platforms",
      "On-site project management",
    ],
  },
  {
    icon: Factory,
    title: "Structural Fabrication",
    description:
      "Our fabrication workshop is equipped to cut, bend, weld and assemble structural steel components of any complexity. We work from client drawings or provide design assistance to ensure every beam, truss and frame is fabricated to exact tolerances.",
    features: [
      "Beam, column & truss fabrication",
      "Custom steel components",
      "Welding & surface preparation",
      "Quality inspection & testing",
    ],
  },
  {
    icon: HardHat,
    title: "Steel Erection",
    description:
      "Safe and efficient steel erection is critical to any structural project. Our certified rigging and erection teams handle transport, lifting, alignment and bolting on site, following strict safety protocols and lift plans.",
    features: [
      "Mobile crane coordination",
      "Rigging & lifting operations",
      "Alignment & bolting",
      "Safety file & method statements",
    ],
  },
  {
    icon: Wrench,
    title: "Plant Maintenance",
    description:
      "We keep industrial plants running with scheduled maintenance, breakdown repairs and shutdown support. Our maintenance teams are experienced in conveyors, chutes, hoppers, tanks, piping and structural repairs in demanding environments.",
    features: [
      "Scheduled & preventative maintenance",
      "Emergency breakdown repairs",
      "Shutdown planning & execution",
      "Plant refurbishment & upgrades",
    ],
  },
  {
    icon: Ruler,
    title: "Engineering Design",
    description:
      "Our design capability covers structural steel detailing, general arrangement drawings and fabrication drawings. We work with engineers and clients to translate concepts into practical, constructible designs.",
    features: [
      "Structural steel detailing",
      "General arrangement drawings",
      "Fabrication & shop drawings",
      "Design optimization",
    ],
  },
  {
    icon: ClipboardList,
    title: "EPCM Solutions",
    description:
      "As an engineering, procurement and construction management partner, we help clients execute projects from feasibility through to handover. We coordinate design, materials, subcontractors and site works for seamless delivery.",
    features: [
      "Project scoping & feasibility",
      "Procurement & subcontractor management",
      "Construction management",
      "Commissioning & handover support",
    ],
  },
  {
    icon: Pickaxe,
    title: "Mining Infrastructure",
    description:
      "We understand the harsh operating conditions of the mining sector. Our team constructs and maintains mine infrastructure including processing plants, screening plants, conveyor structures and support steelwork.",
    features: [
      "Processing plant steelwork",
      "Conveyor structures & galleries",
      "Crusher & screen support steel",
      "ROM & stockpile infrastructure",
    ],
  },
  {
    icon: BridgeIcon,
    title: "Bridge Construction",
    description:
      "From pedestrian bridges to light vehicular bridges, we fabricate and install steel bridge components. We ensure all welds, connections and coatings meet the required specifications for long-term durability.",
    features: [
      "Pedestrian & vehicle bridges",
      "Bridge steel fabrication",
      "Decking & railing installation",
      "Corrosion protection systems",
    ],
  },
  {
    icon: Hammer,
    title: "Boilermaking",
    description:
      "Our boilermaking services cover tanks, pressure vessels, chutes, hoppers and ducting. We work with carbon steel, stainless steel and specialised alloys to suit your process requirements.",
    features: [
      "Tanks & pressure vessels",
      "Chutes, hoppers & ducting",
      "Pipework & spooling",
      "Repairs & modifications",
    ],
  },
];

export function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-steel-900 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-weld-400">
              Our Services
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Engineering & Construction Services
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-steel-300">
              End-to-end steel, fabrication and maintenance solutions for the
              industrial, mining and construction sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="group flex flex-col rounded-2xl border border-steel-200 bg-steel-50 p-8 transition-all hover:-translate-y-1 hover:border-weld-300 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-weld-400 to-weld-600 text-white shadow-md transition-transform group-hover:scale-110">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-steel-900">
                  {index + 1}. {service.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-steel-600">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-steel-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-weld-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
