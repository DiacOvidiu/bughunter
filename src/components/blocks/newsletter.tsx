import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

export function NewsletterForm({
  title = "Primește update-uri despre QA, resurse și evenimente",
  description = "Un newsletter scurt, la obiect. Fără spam. Te poți dezabona oricând.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow)">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-primary-2/8 blur-2xl"
      />

      <div className="relative">
        <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600/25 to-violet-600/15 ring-1 ring-primary/25">
          <Mail className="size-5 text-primary" aria-hidden />
        </div>
        <h3 className="mt-5 text-base font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

        <form
          action="/api/newsletter"
          method="post"
          className="mt-6 flex flex-col gap-3"
        >
          <label className="sr-only" htmlFor="nl-email">
            Email
          </label>
          <Input
            id="nl-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="email@exemplu.ro"
          />
          <Button type="submit" className="w-full justify-center">
            Abonează-mă
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-2">
          Prin abonare ești de acord să primești email-uri de la BugHunter.
        </p>
      </div>
    </div>
  );
}
