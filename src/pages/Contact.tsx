import { useState } from "react";
import { motion } from "motion/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

type FormState = { name: string; email: string; phone: string; service: string; message: string; };
type Errors = Partial<Record<keyof FormState, string>>;

const SERVICE_OPTIONS = ["Lawn Mowing & Maintenance", "Garden Design & Planting", "Tree & Shrub Trimming", "Irrigation Systems", "Hardscaping & Patios", "Seasonal Cleanups", "Sod Installation", "Other"];

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email.";
  if (!form.message.trim()) errors.message = "Please tell us about your project.";
  else if (form.message.trim().length < 20) errors.message = "Message must be at least 20 characters.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const submitContact = useMutation(api.contacts.submit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setSaving(true);
    try {
      await submitContact({ name: form.name, email: form.email, phone: form.phone || undefined, service: form.service || undefined, message: form.message });
      setSubmitted(true);
    } finally { setSaving(false); }
  };

  const inputBase = "w-full bg-background border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all";
  const inputClass = (field: keyof FormState) => `${inputBase} ${errors[field] ? "border-destructive focus:ring-destructive/30" : "border-input hover:border-primary/50"}`;

  return (
    <>
      <section className="relative pt-40 pb-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1779565145494-bab59ef83256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200" alt="Garden pathway" className="w-full h-full object-cover opacity-25" /></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Let&apos;s Talk</span></div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-[0.9]">Contact Us</h1>
          <p className="mt-6 text-white/60 max-w-lg text-lg">Ready to start your project? We&apos;d love to hear about your vision.</p>
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4"><div className="w-6 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Get in Touch</span></div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">We&apos;d love to hear from you</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">Fill out the form or reach us directly. We respond within one business day.</p>
            </div>
            <div className="space-y-5">
              {[{ icon: MapPin, label: "Address", value: "142 Willow Creek Rd\nPortland, OR 97201" }, { icon: Phone, label: "Phone", value: "(503) 555-0192" }, { icon: Mail, label: "Email", value: "hello@greenleaf.com" }, { icon: Clock, label: "Hours", value: "Mon\u2013Sat: 7am\u20136pm\nSunday: Closed" }].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-primary" /></div>
                  <div><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</p><p className="text-sm text-foreground whitespace-pre-line">{value}</p></div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden border border-border h-56">
              <iframe title="GreenLeaf Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44756.73826540888!2d-122.69480793579282!3d45.52344387107845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-24 px-8 bg-foreground rounded-3xl h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"><CheckCircle2 className="w-8 h-8 text-primary" /></div>
                <h3 className="font-serif text-3xl font-bold text-background">Thank You, {form.name.split(" ")[0]}!</h3>
                <p className="mt-3 text-background/50 max-w-sm">We&apos;ve received your message and will be in touch within one business day.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }} className="mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-card border border-border rounded-3xl p-8 md:p-10 space-y-6">
                <div><div className="flex items-center gap-2 mb-1"><div className="w-5 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Free Estimate</span></div><h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Request a Quote</h3></div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="name">Full Name <span className="text-destructive">*</span></label><input id="name" name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={handleChange} className={inputClass("name")} />{errors.name && <p className="flex items-center gap-1.5 text-xs text-destructive"><AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.name}</p>}</div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="email">Email <span className="text-destructive">*</span></label><input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} className={inputClass("email")} />{errors.email && <p className="flex items-center gap-1.5 text-xs text-destructive"><AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.email}</p>}</div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" placeholder="(503) 555-0000" value={form.phone} onChange={handleChange} className={inputClass("phone")} /></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="service">Service Needed</label><select id="service" name="service" value={form.service} onChange={handleChange} className={inputClass("service")}><option value="">Select a service...</option>{SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                </div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="message">Project Details <span className="text-destructive">*</span></label><textarea id="message" name="message" rows={5} placeholder="Describe your yard, what you'd like done, and any timeline or budget details..." value={form.message} onChange={handleChange} className={`${inputClass("message")} resize-none`} />{errors.message && <p className="flex items-center gap-1.5 text-xs text-destructive"><AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.message}</p>}</div>
                <button type="submit" disabled={saving} className="group w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">{saving ? "Sending..." : "Send My Request"}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
                <p className="text-xs text-muted-foreground text-center">Free quotes &middot; No obligation &middot; We respond within 1 business day</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
