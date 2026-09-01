import { motion } from "motion/react";
import { Scissors, TreePine, Droplets, Flower2, Layers, Trash2, Sun, Shield, Sprout, Shovel, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SERVICES = [
  { icon: Scissors, title: "Lawn Mowing & Maintenance", description: "Regular cutting, edging, and blowing to keep your lawn pristine. Weekly, bi-weekly, and monthly plans available.", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { icon: Flower2, title: "Garden Design & Planting", description: "Custom garden designs using seasonal color, native plants, and perennials tailored to your soil and climate.", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" },
  { icon: TreePine, title: "Tree & Shrub Trimming", description: "Professional pruning that promotes healthy growth, improves appearance, and removes hazardous branches.", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { icon: Droplets, title: "Irrigation Systems", description: "Design, installation, and maintenance of smart irrigation systems that conserve water and keep plants thriving.", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { icon: Layers, title: "Hardscaping & Patios", description: "Stunning patios, walkways, retaining walls, and fire pit areas built with stone, concrete, and brick.", color: "bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-400" },
  { icon: Trash2, title: "Seasonal Cleanups", description: "Spring awakening and fall cleanup services including leaf removal, bed preparation, and winter protection.", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  { icon: Sun, title: "Sod Installation", description: "Transform bare or damaged areas with instant turf. We source, install, and guarantee our sod for the first season.", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  { icon: Shield, title: "Fertilization & Weed Control", description: "Science-backed fertilization programs and targeted weed control to keep your lawn dense, green, and healthy.", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" },
  { icon: Sprout, title: "Mulching & Bed Care", description: "Fresh mulch installation, bed edging, and weed barrier application to protect plants and enhance curb appeal.", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { icon: Shovel, title: "Drainage Solutions", description: "French drains, grading, and catch basins to eliminate standing water and protect your property's foundation.", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
];

export default function Services() {
  return (
    <>
      <section className="relative pt-40 pb-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1774579893308-ec777199ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200" alt="Landscaping team" className="w-full h-full object-cover opacity-25" /></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">What We Offer</span></div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-[0.9]">Our Services</h1>
          <p className="mt-6 text-white/60 max-w-lg text-lg">Comprehensive landscaping solutions for residential and commercial properties across Portland.</p>
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: (i % 3) * 0.1 }} className="group bg-card border border-border rounded-2xl p-7 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}><service.icon className="w-6 h-6" /></div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 bg-foreground rounded-3xl p-12 text-center">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Custom Projects Welcome</p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-background">Don&apos;t See What You Need?</h3>
            <p className="mt-4 text-background/50 max-w-lg mx-auto">We also offer custom project consultations. Get in touch and tell us about your vision — we&apos;ll make it a reality.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/90 transition-all group cursor-pointer">Request a Custom Quote<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
