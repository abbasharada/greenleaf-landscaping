import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const TEAM = [
  { name: "Marcus Webb", role: "Founder & Lead Designer", image: "https://images.unsplash.com/photo-1759497860802-9cba5782b455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", bio: "With 20 years in horticulture, Marcus founded GreenLeaf to blend ecological responsibility with stunning outdoor design." },
  { name: "Elena Torres", role: "Senior Landscape Architect", image: "https://images.unsplash.com/photo-1746487836005-1906dfb3d164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", bio: "Elena specializes in native plant gardens and sustainable water management systems, bringing an artist's eye to every design." },
  { name: "Ben Kupke", role: "Hardscape Specialist", image: "https://images.unsplash.com/photo-1761415451360-3847fc21bc79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", bio: "Ben's mastery of stone, brick, and concrete transforms raw materials into elegant patios, walkways, and retaining walls." },
];

const VALUES = [
  "Respect for the natural environment",
  "Transparent pricing with no hidden fees",
  "Responsive communication on every project",
  "Continuous education in sustainable practices",
  "Community involvement and local partnerships",
  "100% satisfaction guarantee on all work",
];

export default function About() {
  return (
    <>
      <section className="relative pt-40 pb-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1779565145536-ccdf57517151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200" alt="Garden" className="w-full h-full object-cover opacity-30" /></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Our Story</span></div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-[0.9]">About Us</h1>
          <p className="mt-6 text-white/60 max-w-lg text-lg">15 years of turning ordinary outdoor spaces into extraordinary living experiences.</p>
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <img src="https://images.unsplash.com/photo-1597201278257-3687be27d954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700" alt="Our work" className="rounded-2xl object-cover w-full h-[520px] shadow-xl" />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl hidden md:block"><p className="text-4xl font-bold font-serif">15+</p><p className="text-xs font-semibold opacity-70 mt-1 uppercase tracking-wider">Years of Excellence</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6 md:pt-12">
            <div className="flex items-center gap-2"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Our Mission</span></div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">Growing Beauty,<br />Nurturing Nature</h2>
            <p className="text-muted-foreground leading-relaxed">GreenLeaf Landscaping was founded in 2008 by Marcus Webb with a simple but powerful belief: every outdoor space holds the potential to become something extraordinary. What started as a one-person lawn care operation has grown into a team of 24 dedicated professionals serving the greater Portland area.</p>
            <p className="text-muted-foreground leading-relaxed">We approach every project — from a small backyard refresh to a complete commercial landscape overhaul — with the same level of care, creativity, and commitment to quality.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 group bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all cursor-pointer">Work With Us<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">What We Stand For</span></div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Our Core Values</h2>
              <p className="mt-4 text-background/50 max-w-sm leading-relaxed">These principles guide every decision we make — from which plants we source to how we treat every client.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {VALUES.map((value, i) => (
                <motion.div key={value} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }} className="flex items-start gap-3 bg-background/5 border border-white/10 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-background/80 font-medium">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">The People Behind the Work</span><div className="w-6 h-[2px] bg-primary" /></div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-5"><img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <h3 className="font-serif text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mt-0.5">{member.role}</p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
