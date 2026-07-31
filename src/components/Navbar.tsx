import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".nav-logo", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }, navRef);

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream border-b border-border-soft py-3 shadow-sm" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="nav-logo flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick("#home")}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-maroon shadow-sm">
            <span className="text-lg font-bold text-ivory">ॐ</span>
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase leading-none font-semibold text-saffron">Jai</p>
            <p className={`text-lg font-bold leading-tight font-serif ${scrolled ? 'text-maroon-dark' : 'text-cream drop-shadow-md'}`}>Jagannath</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={`nav-item underline-saffron text-sm tracking-wider transition-colors duration-300 uppercase font-medium ${scrolled ? 'text-text-main' : 'text-cream drop-shadow-sm'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block nav-item">
          <a
            href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maroon px-6 py-2.5 rounded-md text-sm inline-block shadow-sm"
          >
            Reserve Table
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-md hover:bg-border-soft/20 ${scrolled ? 'text-text-main' : 'text-cream'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-ivory border-t border-border-soft shadow-md ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-text-main hover:text-maroon transition-colors text-sm tracking-widest uppercase py-3 font-medium border-b border-border-soft/50 last:border-none"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maroon px-5 py-3 rounded-md text-sm w-full mt-4 inline-block text-center shadow-sm"
          >
            Reserve Table
          </a>
        </div>
      </div>
    </nav>
  );
}
