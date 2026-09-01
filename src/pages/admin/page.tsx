import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Link } from "react-router-dom";
import { MessageSquare, Users, Images, Star, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import AdminLayout from "./_components/AdminLayout.tsx";
import PageHeader from "./_components/PageHeader.tsx";
import StatCard from "./_components/StatCard.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { formatDistanceToNow } from "date-fns";

function Overview() {
  const me = useQuery(api.users.getCurrentUser, {});
  const isAdmin = me?.role === "admin";
  const stats = useQuery(api.contacts.stats, isAdmin ? {} : "skip");
  const contacts = useQuery(api.contacts.list, isAdmin ? { status: "all" } : "skip");

  if (me === undefined || (isAdmin && stats === undefined)) {
    return <AdminLayout><PageHeader title="Overview" /><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}</div></AdminLayout>;
  }

  if (!me || me.role !== "admin") {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center"><Users className="w-8 h-8 text-destructive" /></div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground max-w-sm">You need admin privileges to view this page. Contact an existing admin to grant you access.</p>
          <Link to="/" className="text-primary text-sm font-semibold hover:underline">&larr; Back to site</Link>
        </div>
      </AdminLayout>
    );
  }

  const recentLeads = (contacts ?? []).slice(0, 5);

  return (
    <AdminLayout>
      <PageHeader title="Overview" subtitle={`Welcome back, ${me.name?.split(" ")[0] ?? "Admin"}`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={MessageSquare} label="Total Leads" value={stats!.total} color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard icon={TrendingUp} label="New Leads" value={stats!.newCount} color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard icon={Clock} label="In Review" value={stats!.inReview} color="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard icon={CheckCircle2} label="Closed" value={stats!.closed} color="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" />
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[{ to: "/admin/leads", icon: MessageSquare, label: "Manage Leads", desc: "View and update all contact requests" }, { to: "/admin/gallery", icon: Images, label: "Manage Gallery", desc: "Add, edit, or remove gallery images" }, { to: "/admin/testimonials", icon: Star, label: "Testimonials", desc: "Curate client reviews shown on the site" }].map((item) => (
          <Link key={item.to} to={item.to} className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"><item.icon className="w-5 h-5 text-primary" /></div>
            <p className="font-semibold text-foreground text-sm">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between"><h2 className="font-semibold text-foreground">Recent Leads</h2><Link to="/admin/leads" className="text-xs text-primary font-semibold hover:underline">View all</Link></div>
        {recentLeads.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm">No leads yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {recentLeads.map((lead) => (
              <div key={lead._id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0"><p className="font-medium text-sm text-foreground truncate">{lead.name}</p><p className="text-xs text-muted-foreground truncate">{lead.email} &middot; {lead.service ?? "General inquiry"}</p></div>
                <div className="flex items-center gap-3 shrink-0"><StatusBadge status={lead.status} /><span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(lead._creationTime), { addSuffix: true })}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    in_review: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    quoted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    closed: "bg-muted text-muted-foreground",
  };
  const labels: Record<string, string> = { new: "New", in_review: "In Review", quoted: "Quoted", closed: "Closed" };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] ?? "bg-muted text-muted-foreground"}`}>{labels[status] ?? status}</span>;
}

export default function AdminOverviewPage() {
  return (
    <>
      <AuthLoading><AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout></AuthLoading>
      <Unauthenticated><div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><h2 className="font-serif text-2xl font-bold">Admin Access</h2><p className="text-muted-foreground">Please sign in to continue.</p><SignInButton /></div></div></Unauthenticated>
      <Authenticated><Overview /></Authenticated>
    </>
  );
}
