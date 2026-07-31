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
        .from(".hero-title-line", { y: 60, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power4.out" }, "-=0.5")
        .from(".hero-subtitle", { y: 28, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta-group", { y: 32, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .from(".hero-stats", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.4");

      gsap.to(".scroll-arrow", { y: 10, duration: 1.2, ease: "power1.inOut", repeat: -1, yoyo: true });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 4 high-end, professional, full-bleed images of pure vegetarian Indian cuisine
  const backgroundImages = [
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Chole Bhature - pure veg
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Vibrant Paneer Tikka - pure veg
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Indian Thali - pure veg
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Samosas and chutneys - pure veg
  ];

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // 4 seconds delay between images
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div ref={heroRef} id="home" className="relative w-full min-h-screen overflow-hidden bg-text-main flex flex-col">
      
      {/* Background Slideshow */}
      {backgroundImages.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`Background ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ 
            opacity: idx === currentImageIndex ? 0.8 : 0, 
            zIndex: 1 
          }}
        />
      ))}

      {/* Soft overlay gradient for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-text-main/90 via-text-main/50 to-text-main/90" />

      {/* Hero Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pt-28 md:pt-36 pb-16 px-6">
        <div className="text-center max-w-4xl mx-auto my-auto">

          {/* Pure-veg badge */}
          <div className="hero-label flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-cream/40" />
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm border border-green-500 flex items-center justify-center bg-green-500/10">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-cream text-xs tracking-[0.2em] uppercase font-semibold">Pure Veg · Nashik</span>
            </div>
            <div className="h-px w-10 bg-cream/40" />
           </div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <h1 className="hero-title-line font-serif text-cream text-5xl md:text-7xl lg:text-[7rem] font-bold leading-tight drop-shadow-lg">
              Jai
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line font-serif text-saffron text-5xl md:text-7xl lg:text-[7rem] font-bold leading-tight drop-shadow-lg">
              Jagannath
            </h1>
          </div>

          <div className="hero-subtitle flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cream/60" />
            <span className="text-saffron text-lg">❖</span>
            <span className="text-cream text-sm tracking-[0.15em] uppercase font-semibold">Authentic Pure Veg Cuisine</span>
            <span className="text-saffron text-lg">❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cream/60" />
          </div>

          <p className="hero-subtitle text-cream/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
             Experience the soul of India in every bite — traditional recipes,<br className="hidden md:block" />warm hospitality, and flavors that linger.
          </p>  

          <div className="hero-cta-group flex flex-wrap gap-4 justify-center mb-14">
            <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-maroon px-8 py-3.5 text-sm uppercase tracking-wider font-semibold shadow-md">
              Explore Menu
            </button>
            <a href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-md text-sm uppercase tracking-wider border border-cream/50 text-cream bg-cream/10 hover:bg-cream/20 transition-all font-semibold shadow-md"
            >
              Reserve a Table
            </a>
          </div>

          {/* Stats block */}
          <div className="hero-stats flex flex-wrap items-center justify-center gap-6 md:gap-12 bg-text-main/70 backdrop-blur-md px-8 py-5 rounded-md border border-border-soft/20 shadow-lg mx-auto w-fit">
            <div className="text-center">
              <div className="flex gap-1 justify-center mb-1 text-saffron">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="font-serif text-cream font-bold text-lg mb-0.5">3.9 / 5</p>
              <p className="text-cream/70 text-xs tracking-wider uppercase font-medium">Google Rating</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-cream/20" />
            <div className="text-center">
              <div className="flex justify-center mb-1 text-saffron"><MapPin size={16} /></div>
              <p className="font-serif text-cream font-bold text-lg mb-0.5">MG Road</p>
              <p className="text-cream/70 text-xs tracking-wider uppercase font-medium">Shalimar, Nashik</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-cream/20" />
            <div className="text-center">
              <div className="flex justify-center mb-1 text-saffron"><Clock size={16} /></div>
              <p className="font-serif text-cream font-bold text-lg mb-0.5">Open</p>
              <p className="text-cream/70 text-xs tracking-wider uppercase font-medium">3 PM – 11 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bouncing chevron */}
      <button className="scroll-arrow absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-cream/70 hover:text-cream transition-colors p-2"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={32} />
      </button>
    </div>
  );
}
