import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown, MapPin, Star, Clock } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ── Hero text entrance ────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.2 })
        .from(".hero-label", { y: 28, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".hero-title-line", { y: 120, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power4.out" }, "-=0.5")
        .from(".hero-subtitle", { y: 28, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta-group", { y: 32, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .from(".hero-stats", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.4");

      gsap.to(".scroll-arrow", { y: 10, duration: 1.2, ease: "power1.inOut", repeat: -1, yoyo: true });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 4 high-end, professional, full-bleed images of Indian cuisine
  const backgroundImages = [
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Premium Biryani setup
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Vibrant Paneer Tikka
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Rich Curry Bowl
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Samosas and chutneys
  ];

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // 4 seconds delay between images
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div ref={heroRef} id="home" className="relative w-full h-[100vh] overflow-hidden bg-[#111]">
      
      {/* Background Slideshow with Glow */}
      {backgroundImages.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`Background ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ 
            opacity: idx === currentImageIndex ? 0.8 : 0, // Much brighter images
            filter: idx === currentImageIndex ? "brightness(1.1) contrast(1.1) saturate(1.1)" : "none", // Add a vibrant "glow" to the image colors
            zIndex: 1 
          }}
        />
      ))}

      {/* A warm central glow to make the center of the image pop instead of darkening it */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
        background: "radial-gradient(circle at center, rgba(255, 230, 180, 0.15) 0%, transparent 60%)",
        mixBlendMode: "screen"
      }} />

      {/* Very soft dark gradient only at the top so navbar text remains visible, and at bottom for stats */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.5) 100%)"
      }} />

      {/* Hero Content */}
      <div className="hero-content-overlay"
        style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto", marginTop: "80px" }}>

          {/* Pure-veg badge */}
          <div className="hero-label" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.6)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 2, border: "2px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(34, 197, 94, 0.3)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              </div>
              <span style={{ color: "#fff", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, textShadow: "0 0 10px rgba(0,0,0,0.3)" }}>Pure Veg · Nashik</span>
            </div>
            <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.6)" }} />
           </div>

          {/* Text with soft diffuse glows instead of harsh outlines */}
          <div style={{ overflow: "hidden", marginBottom: 8 }}>
            <h1 className="hero-title-line" style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(3.5rem,10vw,7rem)", fontWeight: 700, lineHeight: 1.1, margin: 0, textShadow: "0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.2)" }}>Jai</h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 24 }}>
            <h1 className="hero-title-line" style={{ fontFamily: "'Playfair Display', serif", color: "var(--gold)", fontSize: "clamp(3.5rem,10vw,7rem)", fontWeight: 700, lineHeight: 1.1, margin: 0, textShadow: "0 0 40px rgba(212,168,67,0.6), 0 0 80px rgba(212,168,67,0.3)" }}>Jagannath</h1>
          </div>

          <div className="hero-subtitle" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ height: 1, width: 64, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.8))" }} />
            <span style={{ color: "var(--gold)", fontSize: 18, textShadow: "0 0 15px rgba(212,168,67,0.8)" }}>❖</span>
            <span style={{ color: "#fff", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, textShadow: "0 0 20px rgba(255,255,255,0.6)" }}>Authentic Pure Veg Cuisine</span>
            <span style={{ color: "var(--gold)", fontSize: 18, textShadow: "0 0 15px rgba(212,168,67,0.8)" }}>❖</span>
            <div style={{ height: 1, width: 64, background: "linear-gradient(to left, transparent, rgba(255,255,255,0.8))" }} />
          </div>

          <p className="hero-subtitle" style={{ color: "#fff", fontSize: 17, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 500, textShadow: "0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)" }}>
             Experience the soul of India in every bite — traditional recipes,<br />warm hospitality, and flavors that linger.
          </p>  

          <div className="hero-cta-group" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 56 }}>
            <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-gold" style={{ padding: "14px 32px", fontSize: 13, letterSpacing: "0.05em", boxShadow: "0 0 20px rgba(212,168,67,0.4)" }}>
              Explore Menu
            </button>
            <a href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
              target="_blank" rel="noopener noreferrer"
              style={{ padding: "14px 32px", borderRadius: 9999, fontSize: 13, letterSpacing: "0.05em", border: "1px solid rgba(255,255,255,0.9)", color: "#fff", textDecoration: "none", display: "inline-block", textAlign: "center", transition: "all 0.3s", background: "rgba(255,255,255,0.1)", boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.1)"; }}
            >
              Reserve a Table
            </a>
          </div>

          {/* Stats with a soft background glow to separate them from the image */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3vw", background: "rgba(0,0,0,0.2)", padding: "20px 40px", borderRadius: "100px", backdropFilter: "blur(5px)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 0 40px rgba(0,0,0,0.3)" }}>
            <div className="hero-stats" style={{ textAlign: "center" }}>
              <div className="stars" style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 4, color: "var(--gold)", textShadow: "0 0 10px rgba(212,168,67,0.8)" }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 700, fontSize: 17, margin: "0 0 2px", textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>3.9 / 5</p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Google Rating</p>
            </div>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.3)" }} />
            <div className="hero-stats" style={{ textAlign: "center" }}>
              <div style={{ color: "var(--gold)", display: "flex", justifyContent: "center", marginBottom: 4, textShadow: "0 0 10px rgba(212,168,67,0.8)" }}><MapPin size={14} /></div>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 700, fontSize: 17, margin: "0 0 2px", textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>MG Road</p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Shalimar, Nashik</p>
            </div>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.3)" }} />
            <div className="hero-stats" style={{ textAlign: "center" }}>
              <div style={{ color: "var(--gold)", display: "flex", justifyContent: "center", marginBottom: 4, textShadow: "0 0 10px rgba(212,168,67,0.8)" }}><Clock size={14} /></div>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 700, fontSize: 17, margin: "0 0 2px", textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>Open</p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>3 PM – 11 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bouncing chevron */}
      <button className="scroll-arrow"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 30, color: "rgba(255,255,255,0.9)", background: "none", border: "none", cursor: "pointer", transition: "all 0.3s", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.filter = "drop-shadow(0 0 20px rgba(255,255,255,0.8))"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.9)"; e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(255,255,255,0.5))"; }}
      >
        <ChevronDown size={36} />
      </button>
    </div>
  );
}
