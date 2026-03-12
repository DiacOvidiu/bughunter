export type Stat = {
  label: string;
  value: string;
  hint?: string;
};

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group relative overflow-hidden rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow) transition-all duration-300 hover:bg-card-2 hover:ring-border-2 hover:shadow-(--shadow-glow) hover:-translate-y-1"
        >
          {/* Corner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-opacity group-hover:opacity-150"
          />
          <div className="text-4xl font-black tracking-tight text-gradient">{s.value}</div>
          <div className="mt-2.5 text-sm font-semibold text-foreground/85">{s.label}</div>
          {s.hint && <div className="mt-1.5 text-xs text-muted-2">{s.hint}</div>}
        </div>
      ))}
    </div>
  );
}
