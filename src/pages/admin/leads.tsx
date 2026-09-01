import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";
import { Trash2, Phone, Mail, MessageSquare, ChevronDown, Search } from "lucide-react";
import AdminLayout from "./_components/AdminLayout.tsx";
import PageHeader from "./_components/PageHeader.tsx";
import { StatusBadge } from "./page.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { cn } from "@/lib/utils.ts";

type Status = "new" | "in_review" | "quoted" | "closed";

const STATUS_OPTIONS = [
  { value: "all", label: "All Leads" },
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "quoted", label: "Quoted" },
  { value: "closed", label: "Closed" },
];

const NEXT_STATUS: Record<Status, { value: Status; label: string }[]> = {
  new: [{ value: "in_review", label: "Mark In Review" }, { value: "closed", label: "Close" }],
  in_review: [{ value: "quoted", label: "Mark Quoted" }, { value: "closed", label: "Close" }],
  quoted: [{ value: "closed", label: "Close" }, { value: "in_review", label: "Reopen" }],
  closed: [{ value: "new", label: "Reopen as New" }],
};

function LeadRow({ lead }: { lead: { _id: string; _creationTime: number; name: string; email: string; phone?: string; service?: string; message: string; status: Status; notes?: string; } }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const updateStatus = useMutation(api.contacts.updateStatus);
  const updateNotes = useMutation(api.contacts.updateNotes);
  const remove = useMutation(api.contacts.remove);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button onClick={() => setExpanded((v) => !v)} className="w-full text-left px-6 py-5 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer">
        <div className="flex-1 min-w-0 grid sm:grid-cols-3 gap-2">
          <div><p className="font-semibold text-sm text-foreground">{lead.name}</p><p className="text-xs text-muted-foreground mt-0.5">{lead.service ?? "General Inquiry"}</p></div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{lead.email}</span></div>
          <div className="flex items-center gap-2"><StatusBadge status={lead.status} /><span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(lead._creationTime), { addSuffix: true })}</span></div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground shrink-0 transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="border-t border-border px-6 py-5 space-y-5">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Submitted</p><p className="text-foreground">{format(new Date(lead._creationTime), "PPpp")}</p></div>
            {lead.phone && <div><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Phone</p><a href={`tel:${lead.phone}`} className="text-primary">{lead.phone}</a></div>}
            {lead.service && <div><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Service</p><p className="text-foreground">{lead.service}</p></div>}
          </div>
          <div><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Message</p><p className="text-sm text-foreground bg-muted/40 rounded-xl px-4 py-3 leading-relaxed">{lead.message}</p></div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Admin Notes</p>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Add internal notes..." className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            <button onClick={async () => { await updateNotes({ id: lead._id as Id<"contacts">, notes }); toast.success("Notes saved"); }} className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer">Save Notes</button>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">Update Status:</p>
            {(NEXT_STATUS[lead.status] ?? []).map((s) => (<button key={s.value} onClick={async () => { await updateStatus({ id: lead._id as Id<"contacts">, status: s.value }); toast.success(`Status updated`); }} className="text-xs font-semibold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">{s.label}</button>))}
            <div className="flex-1" />
            <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"><Mail className="w-3.5 h-3.5" /> Email Client</a>
            {lead.phone && <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"><Phone className="w-3.5 h-3.5" /> Call</a>}
            <button onClick={async () => { if (!confirm("Delete this lead?")) return; await remove({ id: lead._id as Id<"contacts"> }); toast.success("Deleted"); }} className="flex items-center gap-1.5 text-xs font-semibold text-destructive hover:underline cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const me = useQuery(api.users.getCurrentUser, {});
  const isAdmin = me?.role === "admin";
  const leads = useQuery(api.contacts.list, isAdmin ? { status: filter === "all" ? undefined : filter } : "skip");

  if (me === undefined) return <AdminLayout><div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div></AdminLayout>;
  if (!isAdmin) return <AdminLayout><div className="text-center py-32 text-muted-foreground">Access Denied.</div></AdminLayout>;

  const filtered = (leads ?? []).filter((l) => { if (!search.trim()) return true; const q = search.toLowerCase(); return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.message.toLowerCase().includes(q); });

  return (
    <AdminLayout>
      <PageHeader title="Leads" subtitle="All contact form submissions from your website" />
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-card border border-input rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
        <div className="flex gap-1.5 flex-wrap">{STATUS_OPTIONS.map((s) => (<button key={s.value} onClick={() => setFilter(s.value)} className={cn("px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer", filter === s.value ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-secondary")}>{s.label}</button>))}</div>
      </div>
      {leads === undefined ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-16 text-center"><MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="font-semibold text-foreground">No leads found</p></div>
      ) : (
        <div className="space-y-3">{filtered.map((lead) => <LeadRow key={lead._id} lead={lead} />)}</div>
      )}
    </AdminLayout>
  );
}

export default function AdminLeadsPage() {
  return (
    <>
      <AuthLoading><AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout></AuthLoading>
      <Unauthenticated><div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><h2 className="font-serif text-2xl font-bold">Admin Access</h2><SignInButton /></div></div></Unauthenticated>
      <Authenticated><LeadsPage /></Authenticated>
    </>
  );
}
