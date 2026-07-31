import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real Unsplash food photography
const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&fit=crop",
    label: "Indian Thali",
    span: "col-span-1 row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=700&q=80&fit=crop",
    label: "Chole Bhature",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&q=80&fit=crop",
    label: "Paneer Masala",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://media.istockphoto.com/id/1437065088/photo/spicy-dal-makhani-or-butter-daal-served-in-a-dish-isolated-on-grey-background-top-view-of.jpg?s=612x612&w=0&k=20&c=lUVmyJkCz7XpD_IctxeI4pf4nkiifZ08Y_w97imzXPc=",
    label: "Dal Makhani",
    span: "col-span-2 row-span-1",
  },
  {
    url: "https://media.istockphoto.com/id/521802535/photo/gulab-jamun-12.webp?a=1&b=1&s=612x612&w=0&k=20&c=Mri9HwChsS3eLZYXOMVHGL49Y3gLNhD-Ez-QIYeEfwQ=",
    label: "Gulab Jamun",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1642821369314-100fece91d3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2FkYWklMjBwYW5lZXJ8ZW58MHx8MHx8fDA%3D",
    label: "Kadai Paneer",
    span: "col-span-1 row-span-1",
  },
];

// Marquee strip images - all confirmed pure vegetarian
const marqueeImages = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=70&fit=crop",   // Indian Thali
  "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=70&fit=crop",   // Chole Bhature
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=70&fit=crop",   // Paneer Butter Masala
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=70&fit=crop",   // Samosas
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=70&fit=crop",   // Paneer Tikka
  "https://images.unsplash.com/photo-1642821369314-100fece91d3c?w=400&q=70&fit=crop",   // Kadai Paneer
  "https://media.istockphoto.com/id/1437065088/photo/spicy-dal-makhani-or-butter-daal-served-in-a-dish-isolated-on-grey-background-top-view-of.jpg?s=612x612&w=0&k=20&c=lUVmyJkCz7XpD_IctxeI4pf4nkiifZ08Y_w97imzXPc=", // Dal Makhani
  "https://media.istockphoto.com/id/521802535/photo/gulab-jamun-12.webp?a=1&b=1&s=612x612&w=0&k=20&c=Mri9HwChsS3eLZYXOMVHGL49Y3gLNhD-Ez-QIYeEfwQ=", // Gulab Jamun
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".gallery-header", {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".gallery-header", start: "top 85%" },
      });

      // Gallery items staggered from alternating directions
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
      items.forEach((el, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;
        gsap.from(el, {
          x: fromX, y: 40, opacity: 0, scale: 0.92, duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });

        // Image parallax inside each card on scroll
        const img = el.querySelector(".gallery-img") as HTMLElement | null;
        if (img) {
          gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el, start: "top bottom", end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      });

      // Infinite horizontal marquee
      if (marqueeRef.current) {
        const track = marqueeRef.current.querySelector(".marquee-track") as HTMLElement;
        if (track) {
          const trackWidth = track.scrollWidth / 2;
          gsap.to(track, {
            x: -trackWidth,
            duration: 28,
            ease: "none",
            repeat: -1,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-28 overflow-hidden bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="gallery-header text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-border-soft bg-ivory">
            <span className="text-saffron text-xs">✦</span>
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-medium">Gallery</span>
            <span className="text-saffron text-xs">✦</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-maroon">
            A Visual Feast
          </h2>
          <div className="ornament-divider max-w-xs mx-auto my-4">
            <span className="text-saffron text-sm">❖</span>
          </div>
          <p className="text-text-sec max-w-xl mx-auto">
            Every dish tells a story — crafted with tradition, served with love.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-xl ${item.span}`}
            >
              <img
                src={item.url}
                alt={item.label}
                className="gallery-img absolute inset-0 w-full h-[125%] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark overlay for hover using tailwind classes instead of GSAP for better reliability */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }}>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <p className="text-white font-bold text-xl mb-1 font-serif">{item.label}</p>
                  <p className="text-saffron text-xs tracking-wider uppercase font-semibold">Jai Jagannath Restaurant</p>
                </div>
              </div>

              {/* Always-visible subtle vignette so it doesn't look flat before hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-saffron/50 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Full-width Marquee Strip */}
      <div ref={marqueeRef} className="mt-16 overflow-hidden select-none">
        <div className="marquee-track flex gap-4" style={{ width: "max-content" }}>
          {/* Double for seamless loop */}
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-56 h-36 rounded-xl overflow-hidden relative">
              <img src={src} alt="Indian food" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <p className="text-center text-text-sec text-xs tracking-widest uppercase mt-8 font-medium">
        ✦ Authentic Indian Cuisine · MG Road, Shalimar, Nashik ✦
      </p>

      {/* Wave Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg className="relative block w-full h-10 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 C200,10 400,90 600,30 C800,-20 1000,80 1200,40 L1200,120 L0,120 Z" fill="var(--color-ivory)" />
        </svg>
      </div>
    </section>
  );
}
