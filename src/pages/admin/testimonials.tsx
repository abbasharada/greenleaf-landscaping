import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, X, Check } from "lucide-react";
import AdminLayout from "./_components/AdminLayout.tsx";
import PageHeader from "./_components/PageHeader.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";

type Testimonial = { _id: string; name: string; location: string; rating: number; text: string; visible: boolean; };
type FormState = { name: string; location: string; rating: number; text: string; visible: boolean; };
const DEFAULT_FORM: FormState = { name: "", location: "", rating: 5, text: "", visible: true };

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return <div className="flex gap-1">{[1,2,3,4,5].map((n) => (<button key={n} type="button" onClick={() => onChange(n)} className="cursor-pointer"><Star className={`w-5 h-5 transition-colors ${n <= value ? "fill-accent text-accent" : "text-border"}`} /></button>))}</div>;
}

function TestimonialForm({ initial, onSave, onCancel }: { initial: FormState; onSave: (f: FormState) => void; onCancel: () => void; }) {
  const [form, setForm] = useState<FormState>(initial);
  const set = (k: keyof FormState, v: string | number | boolean) => setForm((p) => ({ ...p, [k]: v }));
  const inputCls = "w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <div className="bg-card border border-primary/30 rounded-2xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Client Name</label><input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Sarah M." /></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</label><input className={inputCls} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Portland, OR" /></div>
      </div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Rating</label><StarPicker value={form.rating} onChange={(n) => set("rating", n)} /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Review Text</label><textarea className={`${inputCls} resize-none`} rows={3} value={form.text} onChange={(e) => set("text", e.target.value)} placeholder="The client's testimonial..." /></div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.visible} onChange={(e) => set("visible", e.target.checked)} className="w-4 h-4 accent-primary" /><span className="text-sm font-medium text-foreground">Visible on site</span></label>
      <div className="flex gap-2 pt-1">
        <button onClick={() => onSave(form)} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"><X className="w-4 h-4" /> Cancel</button>
      </div>
    </div>
  );
}

function TestimonialsAdminPage() {
  const me = useQuery(api.users.getCurrentUser, {});
  const isAdmin = me?.role === "admin";
  const items = useQuery(api.testimonials.adminList, isAdmin ? {} : "skip");
  const create = useMutation(api.testimonials.create);
  const update = useMutation(api.testimonials.update);
  const remove = useMutation(api.testimonials.remove);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  if (me === undefined) return <AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout>;
  if (!isAdmin) return <AdminLayout><div className="text-center py-32 text-muted-foreground">Access Denied.</div></AdminLayout>;

  return (
    <AdminLayout>
      <PageHeader title="Testimonials" subtitle="Manage client reviews shown on the home page" action={<button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"><Plus className="w-4 h-4" /> Add Testimonial</button>} />
      {adding && <div className="mb-6"><TestimonialForm initial={DEFAULT_FORM} onSave={async (form) => { await create(form); toast.success("Added"); setAdding(false); }} onCancel={() => setAdding(false)} /></div>}
      {items === undefined ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}</div>
      ) : items.length === 0 && !adding ? (
        <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground">No testimonials yet.</div>
      ) : (
        <div className="space-y-4">
          {(items as Testimonial[]).map((item) => (
            <div key={item._id} className="bg-card border border-border rounded-2xl overflow-hidden">
              {editing === item._id ? (
                <div className="p-4"><TestimonialForm initial={{ name: item.name, location: item.location, rating: item.rating, text: item.text, visible: item.visible }} onSave={async (f) => { await update({ id: item._id as Id<"testimonials">, ...f }); toast.success("Updated"); setEditing(null); }} onCancel={() => setEditing(null)} /></div>
              ) : (
                <div className="px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1"><p className="font-semibold text-sm text-foreground">{item.name}</p><span className="text-xs text-muted-foreground">{item.location}</span>{!item.visible && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Hidden</span>}</div>
                      <div className="flex gap-0.5 mb-2">{Array.from({ length: item.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}</div>
                      <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-2">&ldquo;{item.text}&rdquo;</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={async () => { await update({ id: item._id as Id<"testimonials">, visible: !item.visible }); toast.success(item.visible ? "Hidden" : "Shown"); }} className="p-1.5 rounded-lg hover:bg-secondary cursor-pointer">{item.visible ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</button>
                      <button onClick={() => setEditing(item._id)} className="p-1.5 rounded-lg hover:bg-secondary cursor-pointer"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={async () => { if (!confirm("Delete?")) return; await remove({ id: item._id as Id<"testimonials"> }); toast.success("Deleted"); }} className="p-1.5 rounded-lg hover:bg-destructive/10 cursor-pointer"><Trash2 className="w-4 h-4 text-destructive" /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminTestimonialsPage() {
  return (
    <>
      <AuthLoading><AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout></AuthLoading>
      <Unauthenticated><div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><h2 className="font-serif text-2xl font-bold">Admin Access</h2><SignInButton /></div></div></Unauthenticated>
      <Authenticated><TestimonialsAdminPage /></Authenticated>
    </>
  );
}
