import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Enquiry", path: "/enquiry" },
  
  { name: "Payment", path: "/payment" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-lg backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-weld-500 to-weld-600 shadow-md">
              <span className="text-xl font-bold text-white">KG</span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold tracking-tight transition-colors ${
                  scrolled ? "text-steel-900" : "text-white"
                }`}
              >
                KGs Computer Services Pty Ltd
              </span>
              <span
                className={`text-[10px] font-medium uppercase tracking-widest transition-colors ${
                  scrolled ? "text-steel-500" : "text-steel-300"
                }`}
              >
                <i>With Us You Are Number 1</i>
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? scrolled
                      ? "text-weld-600"
                      : "text-weld-400"
                    : scrolled
                      ? "text-steel-700 hover:text-steel-900"
                      : "text-steel-200 hover:text-white"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:078341551"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                scrolled
                  ? "bg-steel-900 text-white hover:bg-steel-800"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Phone className="h-4 w-4" />
              067 115 6426
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-md p-2 lg:hidden ${
              scrolled ? "text-steel-900" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-steel-200 bg-white px-4 py-4 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-md px-4 py-3 text-sm font-medium ${
                  location.pathname === link.path
                    ? "bg-steel-50 text-weld-600"
                    : "text-steel-700 hover:bg-steel-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:0671156426"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-steel-900 px-4 py-3 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" />
              067 115 6426
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
