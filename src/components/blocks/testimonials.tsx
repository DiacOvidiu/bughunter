export type Testimonial = { quote: string; name: string; role: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialsGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <div
          key={t.quote}
          className="group relative overflow-hidden rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow) transition-all duration-300 hover:bg-card-2 hover:ring-border-2 hover:shadow-(--shadow-glow) hover:-translate-y-1"
        >
          {/* Decorative large quote */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-5 top-2 select-none font-serif text-9xl leading-none text-primary/8"
          >
            &ldquo;
          </div>
          {/* Stars */}
          <div className="text-sm text-amber-400" aria-label="5 stele">
            ★★★★★
          </div>
          <p className="relative mt-3 text-sm leading-relaxed text-foreground/90">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-[0_0_14px_rgba(99,102,241,0.45)]">
              {initials(t.name)}
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">{t.name}</div>
              <div className="mt-0.5 text-xs text-muted-2">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
