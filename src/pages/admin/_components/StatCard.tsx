import type { ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

type Props = { icon: React.ElementType; label: string; value: string | number; sub?: string; color?: string; };

export default function StatCard({ icon: Icon, label, value, sub, color = "bg-primary/10 text-primary" }: Props) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", color)}><Icon className="w-5 h-5" /></div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-foreground font-serif">{value}</p>
        <p className="text-sm font-medium text-foreground mt-0.5">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
