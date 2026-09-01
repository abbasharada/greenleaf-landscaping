import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const GALLERY_ITEMS = [
  { src: "https://images.unsplash.com/photo-1597201278257-3687be27d954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1597201278257-3687be27d954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Butchart Gardens-Style Flower Beds", category: "Gardens" },
  { src: "https://images.unsplash.com/photo-1779565145494-bab59ef83256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1779565145494-bab59ef83256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Lush Garden Pathway", category: "Gardens" },
  { src: "https://images.unsplash.com/photo-1779565145536-ccdf57517151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1779565145536-ccdf57517151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Charming Garden with Stone Path", category: "Hardscaping" },
  { src: "https://images.unsplash.com/photo-1772015583780-52f647cab2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1772015583780-52f647cab2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Hammock Garden Retreat", category: "Outdoor Living" },
  { src: "https://images.unsplash.com/photo-1761415451360-3847fc21bc79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1761415451360-3847fc21bc79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Stone Bed Edging Installation", category: "Hardscaping" },
  { src: "https://images.unsplash.com/photo-1734303023491-db8037a21f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1734303023491-db8037a21f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Precision Lawn Mowing", category: "Lawn Care" },
  { src: "https://images.unsplash.com/photo-1786526951749-93544fd2e039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1786526951749-93544fd2e039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Ornamental Grass Planting", category: "Gardens" },
  { src: "https://images.unsplash.com/photo-1762926627933-d74148de3725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1762926627933-d74148de3725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Floral Fountain Feature", category: "Outdoor Living" },
  { src: "https://images.unsplash.com/photo-1767493561576-0007c469e9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1767493561576-0007c469e9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Sunlit Garden Path", category: "Gardens" },
  { src: "https://images.unsplash.com/photo-1596481768453-8befafc2d7ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1596481768453-8befafc2d7ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Clay Pot Container Garden", category: "Gardens" },
  { src: "https://images.unsplash.com/photo-1774579893308-ec777199ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1774579893308-ec777199ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Shrub Shaping & Trimming", category: "Lawn Care" },
  { src: "https://images.unsplash.com/photo-1734079692079-aae7e24a7035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", thumb: "https://images.unsplash.com/photo-1734079692079-aae7e24a7035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", caption: "Fresh Sod Installation", category: "Lawn Care" },
];

const CATEGORIES = ["All", "Gardens", "Lawn Care", "Hardscaping", "Outdoor Living"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : null), [filtered.length]);
  const nextImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i + 1) % filtered.length : null), [filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  return (
    <>
      <section className="relative pt-40 pb-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1764070140879-1120c0a9e9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200" alt="Autumn garden" className="w-full h-full object-cover opacity-25" /></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Our Work</span></div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-[0.9]">Gallery</h1>
          <p className="mt-6 text-white/60 max-w-lg text-lg">Browse a selection of our favorite transformations across the Portland area.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${filter === cat ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>{cat}</button>
            ))}
          </div>
          <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div key={item.src} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid" onClick={() => setLightboxIndex(i)}>
                  <img src={item.thumb} alt={item.caption} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-300 flex items-center justify-center"><ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" /></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-semibold truncate">{item.caption}</p>
                    <span className="text-white/60 text-xs">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center" onClick={closeLightbox}>
            <button className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10 cursor-pointer" onClick={closeLightbox}><X className="w-5 h-5" /></button>
            <button className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); prevImage(); }}><ChevronLeft className="w-6 h-6" /></button>
            <button className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); nextImage(); }}><ChevronRight className="w-6 h-6" /></button>
            <AnimatePresence mode="wait">
              <motion.div key={lightboxIndex} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.22 }} className="max-w-5xl w-full mx-16 flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
                <img src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].caption} className="max-h-[76vh] w-full object-contain rounded-xl" />
                <div className="text-center">
                  <p className="text-white font-semibold">{filtered[lightboxIndex].caption}</p>
                  <p className="text-white/40 text-sm mt-1">{filtered[lightboxIndex].category} &nbsp;&middot;&nbsp; {lightboxIndex + 1} / {filtered.length}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
