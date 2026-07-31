import { useEffect, useRef, useState, useCallback } from "react";
import { X, RotateCcw } from "lucide-react";

interface DishInfo {
  name: string;
  price: string;
  image: string;
  tagline: string;
  ingredients: string[];
  cookingMethod: string;
  origin: string;
  servingTemp: string;
  funFact: string;
  color: string;
  glowColor: string;
}

interface Dish3DViewerProps {
  dishName: string | null;
  onClose: () => void;
}

const DISH_DB: Record<string, DishInfo> = {
  "Paneer Butter Masala": {
    name: "Paneer Butter Masala",
    price: "₹150",
    image: "/dish_paneer_butter_masala.png",
    tagline: "India's Beloved Creamy Classic",
    ingredients: ["Fresh Paneer", "Tomatoes", "Butter", "Cream", "Cashews", "Garam Masala", "Fenugreek Leaves", "Ginger-Garlic Paste"],
    cookingMethod: "Slow-simmered tomato-cashew gravy, finished with fresh cream & butter",
    origin: "Punjab, North India",
    servingTemp: "Hot · Serve with Naan or Rice",
    funFact: "Also known as 'Paneer Makhani', this dish is one of the most ordered Indian dishes worldwide!",
    color: "#7A1F1F",
    glowColor: "rgba(122,31,31,0.35)",
  },
  "Dal Makhani": {
    name: "Dal Makhani",
    price: "₹120",
    image: "/dish_dal_makhani.png",
    tagline: "Slow-Cooked Overnight Luxury",
    ingredients: ["Whole Black Urad Dal", "Kidney Beans", "Tomato Purée", "Butter", "Fresh Cream", "Bay Leaves", "Cardamom", "Dried Chillies"],
    cookingMethod: "Simmered on low flame for 8–10 hours, finished with butter & cream",
    origin: "Punjab · Made famous by Moti Mahal, Delhi",
    servingTemp: "Hot · Pairs best with Naan or Roti",
    funFact: "The authentic recipe originated in the 1950s at Moti Mahal restaurant in Delhi.",
    color: "#571414",
    glowColor: "rgba(87,20,20,0.4)",
  },
  "Veg Biryani": {
    name: "Veg Biryani",
    price: "₹120",
    image: "/dish_veg_biryani.png",
    tagline: "Fragrant Dum-Cooked Royal Rice",
    ingredients: ["Basmati Rice", "Seasonal Vegetables", "Saffron", "Fried Onions", "Whole Spices", "Fresh Mint", "Rose Water", "Ghee"],
    cookingMethod: "Dum cooking — sealed and slow-cooked to trap all aromas inside",
    origin: "Mughal-era India · Hyderabadi influence",
    servingTemp: "Hot · Serve with Raita & Papad",
    funFact: "Biryani derives from the Persian word 'Birian' meaning fried before cooking. Saffron gives it that iconic golden hue!",
    color: "#D99A2B",
    glowColor: "rgba(217,154,43,0.4)",
  },
  "Gulab Jamun": {
    name: "Gulab Jamun",
    price: "₹40",
    image: "/dish_gulab_jamun.png",
    tagline: "Melt-in-Mouth Indian Sweetness",
    ingredients: ["Milk Solids (Khoya)", "All-Purpose Flour", "Rose Water", "Sugar Syrup", "Cardamom", "Saffron", "Ghee", "Edible Rose Petals"],
    cookingMethod: "Deep-fried till golden brown, soaked in warm sugar syrup with rose & cardamom",
    origin: "Persian & Mughal origins · Popular across South Asia",
    servingTemp: "Warm or at room temperature",
    funFact: "The name comes from Gulab (rose water) and Jamun (a dark purple berry). They absorb syrup up to twice their size!",
    color: "#D99A2B",
    glowColor: "rgba(217,154,43,0.4)",
  },
};

export const DISH_3D_NAMES = Object.keys(DISH_DB);

export default function Dish3DViewer({ dishName, onClose }: Dish3DViewerProps) {
  const dish = dishName ? DISH_DB[dishName] : null;

  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [infoVisible, setInfoVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const lastPos = useRef({ x: 0, y: 0 });
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!dish) return;
    setRotX(-15);
    setRotY(0);
    setAutoRotate(true);
    setInfoVisible(false);
    setActiveTab(0);
    const t = setTimeout(() => setInfoVisible(true), 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishName]);

  useEffect(() => {
    if (!autoRotate) {
      if (autoRef.current) clearInterval(autoRef.current);
      return;
    }
    autoRef.current = setInterval(() => setRotY(prev => prev + 0.35), 16);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [autoRotate]);

  const normalizedY = ((rotY % 360) + 360) % 360;
  const infoSectionIndex = Math.floor(normalizedY / 90) % 4;

  const infoSections = dish ? [
    { label: "🌿 Ingredients" },
    { label: "👨‍🍳 Cooking Method" },
    { label: "📍 Origin" },
    { label: "✨ Fun Fact" },
  ] : [];

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    lastPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setAutoRotate(false);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotY(prev => prev + dx * 0.55);
    setRotX(prev => Math.max(-50, Math.min(50, prev + dy * 0.3)));
  }, [isDragging]);

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  if (!dish) return null;

  const tabs = ["Ingredients", "Method", "Origin", "Fun Fact"];

  return (
    <div className="d3v-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="d3v-modal">
        <button className="d3v-close" onClick={onClose} aria-label="Close viewer"><X size={18} /></button>

        {/* ── LEFT: 3D Scene ── */}
        <div className="d3v-scene-wrapper">
          <div className="d3v-glow-floor" style={{ background: `radial-gradient(ellipse 70% 28% at 50% 100%, ${dish.glowColor}, transparent 70%)` }} />
          <p className="d3v-drag-hint" style={{ opacity: isDragging ? 0 : 1 }}>↔ Drag to rotate the dish</p>

          <div
            className={"d3v-scene" + (isDragging ? " d3v-grabbing" : "")}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <div className="d3v-cube" style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}>
              {/* FRONT */}
              <div className="d3v-face d3v-front">
                <img src={dish.image} alt={dish.name} draggable={false} />
                <div className="d3v-face-title-bar" style={{ background: `linear-gradient(transparent, ${dish.color}dd)` }}>
                  <span>{dish.name}</span>
                </div>
              </div>
              {/* BACK */}
              <div className="d3v-face d3v-back">
                <div className="d3v-face-inner">
                  <span className="d3v-face-icon">✨</span>
                  <h4>Fun Fact</h4>
                  <p>{dish.funFact}</p>
                </div>
              </div>
              {/* LEFT */}
              <div className="d3v-face d3v-left">
                <div className="d3v-face-inner">
                  <span className="d3v-face-icon">📍</span>
                  <h4>Origin</h4>
                  <p>{dish.origin}</p>
                  <small>{dish.servingTemp}</small>
                </div>
              </div>
              {/* RIGHT */}
              <div className="d3v-face d3v-right">
                <div className="d3v-face-inner">
                  <span className="d3v-face-icon">👨‍🍳</span>
                  <h4>Method</h4>
                  <p>{dish.cookingMethod}</p>
                </div>
              </div>
              {/* TOP */}
              <div className="d3v-face d3v-top">
                <div className="d3v-face-inner">
                  <span className="d3v-face-icon">🌿</span>
                  <h4>Key Ingredients</h4>
                  <p>{dish.ingredients.slice(0, 4).join(" · ")}</p>
                </div>
              </div>
              {/* BOTTOM */}
              <div className="d3v-face d3v-bottom">
                <div className="d3v-face-inner">
                  <span className="d3v-face-icon">🍽️</span>
                  <p>{dish.servingTemp}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current face label */}
          <div className="d3v-face-label" style={{ color: dish.color }}>
            {infoSections[infoSectionIndex]?.label}
          </div>

          {/* Controls */}
          <div className="d3v-controls">
            <button
              className={"d3v-ctrl" + (autoRotate ? " d3v-ctrl-active" : "")}
              style={autoRotate ? { borderColor: dish.color, color: dish.color } : {}}
              onClick={() => setAutoRotate(v => !v)}
            >
              <RotateCcw size={12} />
              {autoRotate ? "Auto" : "Manual"}
            </button>
            <button className="d3v-ctrl" onClick={() => { setRotX(-15); setRotY(0); setAutoRotate(true); }}>
              Reset
            </button>
          </div>
        </div>

        {/* ── RIGHT: Info Panel ── */}
        <div className={"d3v-info" + (infoVisible ? " d3v-info-visible" : "")}>
          <div className="d3v-info-header">
            <span className="d3v-veg-badge" style={{ borderColor: dish.color, color: dish.color }}>🌿 Pure Veg</span>
            <h2 className="d3v-dish-name" style={{ color: dish.color }}>{dish.name}</h2>
            <p className="d3v-tagline">{dish.tagline}</p>
            <span className="d3v-price" style={{ background: dish.color }}>From {dish.price}</span>
          </div>

          {/* Live rotation indicator */}
          <div className="d3v-live-indicator">
            <span className="d3v-live-dot" style={{ background: dish.color }} />
            <span className="d3v-live-label">Rotate to explore · Now showing:</span>
            <span className="d3v-live-section" style={{ color: dish.color }}>
              {infoSections[infoSectionIndex]?.label}
            </span>
          </div>

          {/* Rotation track */}
          <div className="d3v-rotation-track">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={"d3v-rt-seg" + (i === infoSectionIndex ? " d3v-rt-active" : "")}
                style={i === infoSectionIndex ? { background: dish.color } : {}}
              />
            ))}
          </div>

          {/* Tabs */}
          <div className="d3v-tabs">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={"d3v-tab" + (activeTab === i ? " d3v-tab-active" : "")}
                style={activeTab === i ? { borderColor: dish.color, color: dish.color } : {}}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab body */}
          <div className="d3v-tab-body">
            {activeTab === 0 && (
              <div className="d3v-chips">
                {dish.ingredients.map(ing => (
                  <span key={ing} className="d3v-chip" style={{ borderColor: `${dish.color}55` }}>{ing}</span>
                ))}
              </div>
            )}
            {activeTab === 1 && <p className="d3v-body-text">{dish.cookingMethod}</p>}
            {activeTab === 2 && (
              <div>
                <p className="d3v-body-text">{dish.origin}</p>
                <p className="d3v-body-text d3v-body-muted">🍽️ {dish.servingTemp}</p>
              </div>
            )}
            {activeTab === 3 && (
              <div className="d3v-funfact-block">
                <span>✨</span>
                <p className="d3v-body-text">{dish.funFact}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

