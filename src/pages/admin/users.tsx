import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { toast } from "sonner";
import { Shield, User } from "lucide-react";
import AdminLayout from "./_components/AdminLayout.tsx";
import PageHeader from "./_components/PageHeader.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";

type Role = "admin" | "user";

function UsersAdminPage() {
  const me = useQuery(api.users.getCurrentUser, {});
  const isAdmin = me?.role === "admin";
  const users = useQuery(api.users.listUsers, isAdmin ? {} : "skip");
  const setRole = useMutation(api.users.setUserRole);

  if (me === undefined) return <AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout>;
  if (!isAdmin) return <AdminLayout><div className="text-center py-32 text-muted-foreground">Access Denied.</div></AdminLayout>;

  return (
    <AdminLayout>
      <PageHeader title="Users" subtitle="Manage admin access for signed-in users" />
      {users === undefined ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-3 border-b border-border grid grid-cols-4 gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span className="col-span-2">User</span><span>Role</span><span>Actions</span>
          </div>
          {users.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">No users yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {users.map((user) => (
                <div key={user._id} className="px-6 py-4 grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">{user.role === "admin" ? <Shield className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-muted-foreground" />}</div>
                    <div className="min-w-0"><p className="text-sm font-semibold text-foreground truncate">{user.name ?? "Unknown"}</p><p className="text-xs text-muted-foreground truncate">{user.email}</p></div>
                  </div>
                  <div><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{user.role ?? "user"}</span></div>
                  <div><button onClick={async () => { const next: Role = (user.role ?? "user") === "admin" ? "user" : "admin"; if (!confirm(`Change role to ${next}?`)) return; await setRole({ userId: user._id as Id<"users">, role: next }); toast.success(`Role updated to ${next}`); }} className="text-xs font-semibold text-primary hover:underline cursor-pointer">{user.role === "admin" ? "Remove Admin" : "Make Admin"}</button></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">How to grant admin access</p>
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">Users must sign in to your site first before they appear here. The first admin must be set manually from the Hercules database panel.</p>
      </div>
    </AdminLayout>
  );
}

export default function AdminUsersPage() {
  return (
    <>
      <AuthLoading><AdminLayout><Skeleton className="h-96 rounded-2xl" /></AdminLayout></AuthLoading>
      <Unauthenticated><div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><h2 className="font-serif text-2xl font-bold">Admin Access</h2><SignInButton /></div></div></Unauthenticated>
      <Authenticated><UsersAdminPage /></Authenticated>
    </>
  );
}
