import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function DiscordCTABlock({
  title = "Intră pe Discord și cunoaște oameni care chiar testează",
  description = "Comunitate activă din 2022. Întrebări, feedback, resurse, job talk și sesiuni live.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative border-t border-border/30 py-10 sm:py-16 lg:py-24">
      <Container className="max-w-7xl">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 lg:p-16">
          {/* Layered gradient background */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-br from-indigo-900 via-[#0e1230] to-violet-950"
          />
          {/* Animated orbs inside card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
          >
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/22 blur-3xl animate-glow" />
            <div
              className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl animate-glow"
              style={{ animationDelay: "2.5s" }}
            />
          </div>
          {/* Grid pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-30"
          />
          {/* Gradient border */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-indigo-500/35"
          />

          {/* Content */}
          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_0.5fr] lg:items-center">
            <div>
              <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-stretch">
              <ButtonLink
                href={siteConfig.discordInviteUrl}
                target="_blank"
                rel="noreferrer"
                className="justify-center"
              >
                Intră pe Discord
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
