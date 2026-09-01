import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check } from "lucide-react";
import AdminLayout from "./_components/AdminLayout.tsx";
import PageHeader from "./_components/PageHeader.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";

const CATEGORIES = ["Gardens", "Lawn Care", "Hardscaping", "Outdoor Living"] as const;
type Category = typeof CATEGORIES[number];
type GalleryItem = { _id: string; caption: string; category: Category; imageUrl: string; order: number; visible: boolean; };
type FormState = { caption: string; category: Category; imageUrl: string; order: number; visible: boolean; };
const DEFAULT_FORM: FormState = { caption: "", category: "Gardens", imageUrl: "", order: 0, visible: true };

function GalleryForm({ initial, onSave, onCancel }: { initial: FormState; onSave: (f: FormState) => void; onCancel: () => void; }) {
  const [form, setForm] = useState<FormState>(initial);
  const set = (k: keyof FormState, v: string | number | boolean) => setForm((prev) => ({ ...prev, [k]: v }));
  const inputCls = "w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <div className="bg-card border border-primary/30 rounded-2xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Caption</label><input className={inputCls} value={form.caption} onChange={(e) => set("caption", e.target.value)} placeholder="e.g. Sunlit Garden Path" /></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</label><select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value as Category)}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
      </div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Image URL</label><input className={inputCls} value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="https://..." /></div>
      {form.imageUrl && <img src={form.imageUrl} alt="preview" className="h-32 w-full object-cover rounded-xl" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Order</label><input className={inputCls} type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} /></div>
        <div className="flex items-end pb-0.5"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.visible} onChange={(e) => set("visible", e.target.checked)} className="w-4 h-4 accent-primary" /><span className="text-sm font-medium text-foreground">Visible on site</span></label></div>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave(form)} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"><X className="w-4 h-4" /> Cancel</button>
      </div>
    </div>
  );
}

function GalleryAdminPage() {
  const me = useQuery(api.users.getCurrentUser, {});
  const isAdmin = me?.role === "admin";
  const items = useQuery(api.gallery.adminList, isAdmin ? {} : "skip");
  const create = useMutation(api.gallery.create);
  const update = useMutation(api.gallery.update);
  const remove = useMutation(api.gallery.remove);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  if (me === undefined) return <AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout>;
  if (!isAdmin) return <AdminLayout><div className="text-center py-32 text-muted-foreground">Access Denied.</div></AdminLayout>;

  return (
    <AdminLayout>
      <PageHeader title="Gallery" subtitle="Manage images shown in the public gallery" action={<button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 cursor-pointer"><Plus className="w-4 h-4" /> Add Image</button>} />
      {adding && <div className="mb-6"><GalleryForm initial={DEFAULT_FORM} onSave={async (form) => { await create(form); toast.success("Image added"); setAdding(false); }} onCancel={() => setAdding(false)} /></div>}
      {items === undefined ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}</div>
      ) : items.length === 0 && !adding ? (
        <div className="bg-card border border-border rounded-2xl p-16 text-center"><p className="text-muted-foreground">No gallery images yet.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(items as GalleryItem[]).map((item) => (
            <div key={item._id} className="bg-card border border-border rounded-2xl overflow-hidden">
              {editing === item._id ? (
                <div className="p-4"><GalleryForm initial={{ caption: item.caption, category: item.category, imageUrl: item.imageUrl, order: item.order, visible: item.visible }} onSave={async (f) => { await update({ id: item._id as Id<"gallery">, ...f }); toast.success("Updated"); setEditing(null); }} onCancel={() => setEditing(null)} /></div>
              ) : (
                <>
                  <div className="relative aspect-video"><img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />{!item.visible && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">Hidden</span></div>}</div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0"><p className="font-semibold text-sm text-foreground truncate">{item.caption}</p><span className="text-xs text-muted-foreground">{item.category}</span></div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={async () => { await update({ id: item._id as Id<"gallery">, visible: !item.visible }); toast.success(item.visible ? "Hidden" : "Shown"); }} className="p-1.5 rounded-lg hover:bg-secondary cursor-pointer">{item.visible ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</button>
                        <button onClick={() => setEditing(item._id)} className="p-1.5 rounded-lg hover:bg-secondary cursor-pointer"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                        <button onClick={async () => { if (!confirm("Delete?")) return; await remove({ id: item._id as Id<"gallery"> }); toast.success("Deleted"); }} className="p-1.5 rounded-lg hover:bg-destructive/10 cursor-pointer"><Trash2 className="w-4 h-4 text-destructive" /></button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminGalleryPage() {
  return (
    <>
      <AuthLoading><AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout></AuthLoading>
      <Unauthenticated><div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><h2 className="font-serif text-2xl font-bold">Admin Access</h2><SignInButton /></div></div></Unauthenticated>
      <Authenticated><GalleryAdminPage /></Authenticated>
    </>
  );
}
