import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils.ts";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
    )}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-foreground overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
            <img src="https://hercules-cdn.com/file_XAcuhDYHa9Eb4JT8AYonN6Yf" alt="GreenLeaf Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="font-serif font-bold text-xl text-foreground tracking-tight">GreenLeaf</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link to={link.to} className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                  active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}>{link.label}</Link>
              </li>
            );
          })}
        </ul>

        <Link to="/contact" className="hidden md:inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
          Get a Free Quote
        </Link>

        <button className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="md:hidden overflow-hidden bg-card border-b border-border">
            <ul className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link to={link.to} className={cn("block px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer", active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary")}>{link.label}</Link>
                  </li>
                );
              })}
              <li className="pt-2"><Link to="/contact" className="block text-center bg-accent text-accent-foreground px-4 py-3 rounded-lg text-sm font-semibold cursor-pointer">Get a Free Quote</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
