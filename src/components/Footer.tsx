import { MapPin, Phone, Clock, Star } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gray-200 pt-16 pb-8 overflow-hidden bg-[#FDFBF7]">
      
      {/* Wavy Flowing Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Back Wave */}
        <div className="absolute bottom-0 w-[200%] flex animate-marquee-slow" style={{ height: "180px", opacity: 0.15 }}>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 Q250,0 500,50 T1000,50 L1000,100 L0,100 Z" fill="var(--gold-dark)"/>
          </svg>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 Q250,0 500,50 T1000,50 L1000,100 L0,100 Z" fill="var(--gold-dark)"/>
          </svg>
        </div>
        
        {/* Front Wave */}
        <div className="absolute bottom-0 w-[200%] flex animate-marquee" style={{ height: "140px", opacity: 0.25 }}>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 Q250,100 500,50 T1000,50 L1000,100 L0,100 Z" fill="var(--gold)"/>
          </svg>
          <svg width="50%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 Q250,100 500,50 T1000,50 L1000,100 L0,100 Z" fill="var(--gold)"/>
          </svg>
        </div>

        {/* Soft gradient to blend the bottom so it doesn't look like a hard edge */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[rgba(212,168,67,0.15)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-dark))" }}>
                <span className="text-xl font-bold text-white">ॐ</span>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase leading-none font-semibold" style={{ color: "var(--gold)" }}>Jai</p>
                <p className="text-xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "var(--gold)" }}>Jagannath</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Authentic Indian cuisine served with tradition, love, and the divine blessings of Lord Jagannath.
            </p>
            <div className="flex items-center gap-1 stars text-sm" style={{ color: "var(--gold)" }}>
              {[1,2,3,4].map(i => <Star key={i} size={14} fill="currentColor" />)}
              <Star size={14} fill="none" strokeWidth={1.5} />
              <span className="text-gray-500 ml-1 text-xs">3.9 (993 reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
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
                    className="text-gray-600 hover:text-[var(--gold)] text-sm transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-gray-900 font-bold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Opening Hours
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 text-sm font-medium">Mon – Fri</p>
                  <p className="text-gray-500 text-xs">3:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 text-sm font-medium">Sat – Sun</p>
                  <p className="text-gray-500 text-xs">12:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 text-xs font-semibold uppercase tracking-wider">Open Now</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-bold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  MG Road, Shalimar,<br />Nashik, Maharashtra
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--gold)] flex-shrink-0" />
                <p className="text-gray-600 text-sm font-medium">+91 99752 60955</p>
              </div>
              <a
                href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-2.5 rounded-xl text-sm mt-2 inline-block text-center shadow-md font-semibold"
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center font-medium">
            © {currentYear} Jai Jagannath Restaurant, Nashik. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[var(--gold)] text-sm">🙏</span>
            <p className="text-gray-500 text-xs font-medium">
              Made with love & devotion
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.google.com/maps?q=Jagannath+Restaurant+Nashik" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-[var(--gold)] text-xs transition-colors font-medium">Google</a>
            <a href="https://www.justdial.com/Nashik/Jagannath-Restaurant-MG-Road" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-[var(--gold)] text-xs transition-colors font-medium">Justdial</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
