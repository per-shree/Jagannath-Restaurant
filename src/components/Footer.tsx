import { MapPin, Phone, Clock, Star } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border-soft pt-6 pb-4 overflow-hidden bg-cream">
      
      {/* Wavy Flowing Background Animation covering the whole footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Back Wave */}
        <div className="absolute inset-0 w-[200%] flex animate-marquee-slow" style={{ opacity: 0.05 }}>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,20 Q250,-10 500,20 T1000,20 L1000,100 L0,100 Z" fill="var(--color-maroon)"/>
          </svg>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,20 Q250,-10 500,20 T1000,20 L1000,100 L0,100 Z" fill="var(--color-maroon)"/>
          </svg>
        </div>
        
        {/* Front Wave */}
        <div className="absolute inset-0 w-[200%] flex animate-marquee" style={{ opacity: 0.08 }}>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,40 Q250,70 500,40 T1000,40 L1000,100 L0,100 Z" fill="var(--color-saffron)"/>
          </svg>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,40 Q250,70 500,40 T1000,40 L1000,100 L0,100 Z" fill="var(--color-saffron)"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-maroon">
                <span className="text-sm font-bold text-cream font-serif">ॐ</span>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase leading-none font-semibold text-saffron">Jai</p>
                <p className="text-base font-bold leading-tight font-serif text-maroon">Jagannath</p>
              </div>
            </div>
            <p className="text-text-sec text-xs leading-relaxed mb-2">
              Authentic Indian cuisine served with tradition, love, and the divine blessings of Lord Jagannath.
            </p>
            <div className="flex items-center gap-1 stars text-xs text-saffron">
              {[1,2,3,4].map(i => <Star key={i} size={10} fill="currentColor" />)}
              <Star size={10} fill="none" strokeWidth={1.5} />
              <span className="text-text-sec ml-1 text-[9px]">3.9 (993 reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-main font-bold mb-2 text-sm tracking-wider uppercase font-serif">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {[
                { label: "Home", id: "#home" },
                { label: "About Us", id: "#about" },
                { label: "Our Menu", id: "#menu" },
                { label: "Today's Specials", id: "#specials" },
                { label: "Reviews", id: "#reviews" },
                { label: "Gallery", id: "#gallery" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-text-sec hover:text-maroon text-[11px] transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-text-main font-bold mb-2 text-sm tracking-wider uppercase font-serif">
              Opening Hours
            </h4>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <Clock size={12} className="text-saffron mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-main text-[11px] font-medium">Mon – Fri</p>
                  <p className="text-text-sec text-[9px]">3:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={12} className="text-saffron mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-main text-[11px] font-medium">Sat – Sun</p>
                  <p className="text-text-sec text-[9px]">12:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 text-[9px] font-semibold uppercase tracking-wider">Open Now</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-main font-bold mb-2 text-sm tracking-wider uppercase font-serif">
              Contact Us
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin size={12} className="text-saffron mt-0.5 flex-shrink-0" />
                <p className="text-text-sec text-[11px] leading-relaxed">
                  MG Road, Shalimar,<br />Nashik, Maharashtra
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-saffron flex-shrink-0" />
                <p className="text-text-sec text-[11px] font-medium">+91 99752 60955</p>
              </div>
              <a
                href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maroon w-full py-1.5 rounded-md text-[11px] mt-1 inline-block text-center shadow-sm font-semibold"
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-soft pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-sec text-[9px] text-center font-medium">
            © {currentYear} Jai Jagannath Restaurant, Nashik. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-saffron text-[10px]">🙏</span>
            <p className="text-text-sec text-[9px] font-medium">
              Made with love & devotion
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.google.com/maps?q=Jagannath+Restaurant+Nashik" target="_blank" rel="noreferrer"
              className="text-text-sec hover:text-maroon text-[9px] transition-colors font-medium">Google</a>
            <a href="https://www.justdial.com/Nashik/Jagannath-Restaurant-MG-Road" target="_blank" rel="noreferrer"
              className="text-text-sec hover:text-maroon text-[9px] transition-colors font-medium">Justdial</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
