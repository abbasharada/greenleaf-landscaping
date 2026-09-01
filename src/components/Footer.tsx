import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const SERVICES = ["Lawn Mowing", "Garden Design", "Tree Trimming", "Irrigation Systems", "Hardscaping", "Seasonal Cleanups"];

function FacebookIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}
function InstagramIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>;
}
function TwitterIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
}
function YoutubeIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" /></svg>;
}

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer w-fit group">
              <div className="w-9 h-9 rounded-lg bg-foreground/10 overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                <img src="https://hercules-cdn.com/file_XAcuhDYHa9Eb4JT8AYonN6Yf" alt="GreenLeaf Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <span className="font-serif font-bold text-xl">GreenLeaf</span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">Transforming outdoor spaces into beautiful, functional landscapes since 2008.</p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-widest opacity-50">Quick Links</h4>
            <ul className="space-y-2">{QUICK_LINKS.map((link) => (<li key={link.to}><Link to={link.to} className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all cursor-pointer">{link.label}</Link></li>))}</ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-widest opacity-50">Our Services</h4>
            <ul className="space-y-2">{SERVICES.map((s) => (<li key={s}><span className="text-sm opacity-70">{s}</span></li>))}</ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-widest opacity-50">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start"><MapPin className="w-4 h-4 mt-0.5 opacity-60 shrink-0" /><span className="text-sm opacity-70">142 Willow Creek Rd,<br />Portland, OR 97201</span></li>
              <li className="flex gap-3 items-center"><Phone className="w-4 h-4 opacity-60 shrink-0" /><a href="tel:+15035550192" className="text-sm opacity-70 hover:opacity-100 cursor-pointer">(503) 555-0192</a></li>
              <li className="flex gap-3 items-center"><Mail className="w-4 h-4 opacity-60 shrink-0" /><a href="mailto:hello@greenleaf.com" className="text-sm opacity-70 hover:opacity-100 cursor-pointer">hello@greenleaf.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-50">&copy; {year} GreenLeaf Landscaping. All rights reserved.</p>
          <p className="text-sm opacity-50">Designed with care for nature.</p>
        </div>
      </div>
    </footer>
  );
}
