import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real Unsplash food images (not AI generated)
const specials = [
  {
    name: "Dal Makhani",
    description: "Black lentils slow-cooked overnight with butter and cream, a house specialty.",
    price: "₹120",
    tag: "Best Seller",
    image: "https://media.istockphoto.com/id/1437065088/photo/spicy-dal-makhani-or-butter-daal-served-in-a-dish-isolated-on-grey-background-top-view-of.jpg?s=612x612&w=0&k=20&c=lUVmyJkCz7XpD_IctxeI4pf4nkiifZ08Y_w97imzXPc=",
    accent: "#7A1F1F",
  },
    {
    name: "Paneer Butter Masala",
    description: "Fresh cottage cheese in a rich tomato-butter gravy with aromatic spices.",
    price: "₹150",
    tag: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80&fit=crop",
    accent: "#D99A2B",
  },
    {
    name: "Special Thali",
    description: "A complete meal — dal, sabzi, roti, rice, pickle & papad. Pure satisfaction.",
    price: "₹80",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&fit=crop",
    accent: "#571414",
  },
  {
    name: "Chole Bhature",
    description: "Spiced chickpea curry served with fluffy deep-fried bread — a North Indian classic.",
    price: "₹100",
    tag: "Favourite",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80&fit=crop",
    accent: "#7A1F1F",
  },
];

export default function SpecialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".specials-header", {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".specials-header", start: "top 85%" },
      });

      // Cards stagger entrance
      gsap.from(".special-card", {
        y: 50, opacity: 0, stagger: 0.14, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".specials-grid", start: "top 80%" },
      });

      // Click ripple
      document.querySelectorAll(".special-card").forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("click", () => {
          gsap.fromTo(el,
            { scale: 0.98 },
            { scale: 1, duration: 0.3, ease: "power2.out" }
          );
        });
      });

      // Price counter animation
      gsap.from(".price-tag-anim", {
        textContent: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".specials-grid", start: "top 75%" },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="specials" className="relative py-28 overflow-hidden bg-cream">

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="specials-header text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-border-soft bg-ivory">
            <span className="text-saffron text-xs">✦</span>
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-medium">Chef's Table</span>
            <span className="text-saffron text-xs">✦</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-maroon">
            Today's Specials
          </h2>
          <div className="ornament-divider max-w-xs mx-auto my-4">
            <span className="text-saffron text-sm">❖</span>
          </div>
          <p className="text-text-sec max-w-xl mx-auto text-lg">
            Handpicked favourites that keep our guests coming back for more.
          </p>
        </div>

        {/* Cards */}
        <div className="specials-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((item, i) => (
            <div
              key={i}
              className="special-card menu-card relative cursor-pointer select-none group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent opacity-80" />

                {/* Tag badge on image */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase z-10 bg-ivory text-saffron border border-saffron/40 shadow-sm">
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pb-6">
                <h3 className="text-xl font-bold text-text-main mb-1.5 font-serif">
                  {item.name}
                </h3>
                <p className="text-text-sec text-sm leading-relaxed mb-5">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold price-tag-anim font-serif text-maroon-dark">
                    {item.price}
                  </span>
                  <button className="text-xs px-4 py-2 rounded-full border border-border-soft text-maroon hover:bg-maroon/5 transition-colors font-medium">
                    Order Now
                  </button>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: item.accent }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
