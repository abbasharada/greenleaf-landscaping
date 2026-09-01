import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Shield, Clock, Award, ArrowRight, Leaf, Droplets, TreePine } from "lucide-react";

const HERO_IMAGE = "https://images.unsplash.com/photo-1597201278257-3687be27d954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHw0fHxsYW5kc2NhcGluZyUyMGdhcmRlbiUyMGdyZWVuJTIwZ3Jhc3MlMjBsYXduJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTc4ODI4NjAyMHww&ixlib=rb-4.1.0&q=80&w=1080";

const FEATURES = [
  { icon: Shield, title: "Licensed & Insured", description: "Fully licensed, bonded, and insured for your complete peace of mind on every project." },
  { icon: Leaf, title: "Eco-Friendly", description: "Sustainable methods and organic products safe for your family and the environment." },
  { icon: Clock, title: "Always On Time", description: "We respect your schedule. Count on our crews to arrive when promised, every time." },
  { icon: Award, title: "Award-Winning", description: "Recognized by the Oregon Landscape Association for excellence in residential design." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", location: "Portland, OR", rating: 5, text: "GreenLeaf completely transformed our overgrown backyard into a stunning retreat. The team was professional, punctual, and the results exceeded every expectation." },
  { name: "James R.", location: "Beaverton, OR", rating: 5, text: "We've used GreenLeaf for three years now and our lawn has never looked better. Their seasonal programs are worth every penny — highly recommend!" },
  { name: "Linda & Tom K.", location: "Lake Oswego, OR", rating: 5, text: "From the initial design consultation to the final planting, everything was seamless. Our neighbors constantly ask who did our landscaping." },
  { name: "David C.", location: "Hillsboro, OR", rating: 5, text: "The hardscaping project they completed for us is absolutely beautiful. Solid workmanship, fair pricing, and a friendly crew. Five stars without hesitation." },
];

const SERVICES_PREVIEW = [
  { icon: Leaf, title: "Lawn Care", desc: "Mowing, edging, fertilization & seasonal programs.", img: "https://images.unsplash.com/photo-1734303023491-db8037a21f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { icon: TreePine, title: "Garden Design", desc: "Custom planting plans with native & seasonal flora.", img: "https://images.unsplash.com/photo-1779565145494-bab59ef83256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { icon: Droplets, title: "Irrigation", desc: "Smart water systems designed for efficiency.", img: "https://images.unsplash.com/photo-1596481768453-8befafc2d7ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
];

function StarRating({ count }: { count: number }) {
  return <div className="flex gap-0.5">{Array.from({ length: count }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-accent text-accent" />))}</div>;
}

function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const resetTimer = () => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = setInterval(next, 5500); };
  useEffect(() => { timerRef.current = setInterval(next, 5500); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="text-center px-4">
            <StarRating count={TESTIMONIALS[current].rating} />
            <blockquote className="mt-5 text-xl md:text-2xl text-foreground leading-relaxed font-serif italic">&ldquo;{TESTIMONIALS[current].text}&rdquo;</blockquote>
            <div className="mt-6">
              <p className="font-semibold text-foreground">{TESTIMONIALS[current].name}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{TESTIMONIALS[current].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center justify-center gap-6">
        <button onClick={() => { prev(); resetTimer(); }} className="w-10 h-10 rounded-full border border-border hover:bg-secondary flex items-center justify-center transition-colors cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
        <div className="flex gap-2">{TESTIMONIALS.map((_, i) => (<button key={i} onClick={() => { setCurrent(i); resetTimer(); }} className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "w-8 bg-primary" : "w-1.5 bg-border"}`} />))}</div>
        <button onClick={() => { next(); resetTimer(); }} className="w-10 h-10 rounded-full border border-border hover:bg-secondary flex items-center justify-center transition-colors cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-end pb-0">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="Lush landscaped garden" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-foreground/20" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-0">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6"><div className="w-8 h-[2px] bg-accent" /><span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Portland&apos;s Premier Landscapers</span></div>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight">Where<br /><em className="not-italic text-accent">Nature</em><br />Meets Design</h1>
            <p className="mt-8 text-base md:text-lg text-white/70 leading-relaxed max-w-lg">GreenLeaf Landscaping has been crafting breathtaking outdoor spaces across the Portland metro area for over 15 years.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all hover:gap-3 cursor-pointer">Get Free Quote<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link to="/gallery" className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/10 backdrop-blur transition-all cursor-pointer">View Our Work</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
            {[{ value: "1,400+", label: "Projects Done" }, { value: "890+", label: "Happy Clients" }, { value: "15+", label: "Years Experience" }, { value: "24", label: "Team Members" }].map((s, i) => (
              <div key={s.label} className={`py-7 px-6 ${i < 3 ? "border-r border-white/10" : ""}`}>
                <p className="text-3xl font-bold text-white font-serif">{s.value}</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">What We Do</span></div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">Expert Services<br /><span className="text-muted-foreground font-normal text-3xl md:text-4xl">for every outdoor space</span></h2>
            </div>
            <Link to="/services" className="group inline-flex items-center gap-2 text-primary font-semibold text-sm shrink-0 hover:gap-3 transition-all cursor-pointer">All Services <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES_PREVIEW.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer">
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur border border-white/10 flex items-center justify-center mb-4"><s.icon className="w-5 h-5 text-white" /></div>
                  <h3 className="font-serif text-2xl font-bold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-white/60">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Why GreenLeaf</span></div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">The GreenLeaf<br />Difference</h2>
              <p className="mt-5 text-background/60 leading-relaxed max-w-lg">We combine expert craftsmanship, sustainable practices, and genuine care to deliver results you&apos;ll love for years to come.</p>
              <Link to="/about" className="mt-8 group inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all cursor-pointer">Our Story <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-background/5 border border-white/10 rounded-2xl p-6 hover:bg-background/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-semibold text-background mb-1.5 text-sm">{f.title}</h3>
                  <p className="text-xs text-background/50 leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-2 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-2">Limited spots this season</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">Ready to transform your yard?</h2>
            </div>
            <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap">Book Free Consultation<ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="py-28 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Client Stories</span><div className="w-6 h-[2px] bg-primary" /></div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-14">What Our Clients Say</h2>
          <TestimonialsSlider />
        </div>
      </section>
    </>
  );
}
