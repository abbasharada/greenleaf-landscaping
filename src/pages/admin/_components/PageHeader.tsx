import type { ReactNode } from "react";

type Props = { title: string; subtitle?: string; action?: ReactNode; };

export default function PageHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
