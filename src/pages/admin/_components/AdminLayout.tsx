import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LayoutDashboard, MessageSquare, Images, Star, Users, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth.ts";
import { cn } from "@/lib/utils.ts";

const NAV = [
  { to: "/admin", icon: LayoutDashboard, label: "Overview" },
  { to: "/admin/leads", icon: MessageSquare, label: "Leads" },
  { to: "/admin/gallery", icon: Images, label: "Gallery" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/users", icon: Users, label: "Users" },
];

function NavItem({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
      {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      <aside className="w-60 shrink-0 bg-card border-r border-border flex flex-col">
        <div className="px-4 py-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-foreground overflow-hidden shrink-0"><img src="https://hercules-cdn.com/file_XAcuhDYHa9Eb4JT8AYonN6Yf" alt="Logo" className="w-full h-full object-cover scale-110" /></div>
            <div><p className="font-serif font-bold text-sm text-foreground leading-none">GreenLeaf</p><p className="text-[10px] text-muted-foreground mt-0.5 font-medium uppercase tracking-wider">Admin Panel</p></div>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">{NAV.map((item) => <NavItem key={item.to} {...item} />)}</nav>
        <div className="px-3 pb-2"><Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer">&larr; Back to site</Link></div>
        <div className="px-3 py-3 border-t border-border space-y-1">
          <div className="px-3 py-2 rounded-xl bg-muted/50"><p className="text-xs font-semibold text-foreground truncate">{user?.profile.name ?? "Admin"}</p><p className="text-[10px] text-muted-foreground truncate mt-0.5">{user?.profile.email}</p></div>
          <button onClick={async () => { await signout(); navigate("/"); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"><LogOut className="w-4 h-4" /> Sign Out</button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="p-8">{children}</motion.div>
      </main>
    </div>
  );
}
