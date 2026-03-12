import { Bug, Home, MessageSquare } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export default function NotFoundPage() {
  return (
    <Section className="pt-10 sm:pt-12 lg:pt-16">
      <Container>
        <Card className="mx-auto max-w-3xl p-10 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-card-2 ring-1 ring-border shadow-(--shadow)">
            <Bug className="size-5" aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Bug găsit. Pagina nu.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Link-ul e greșit sau pagina a fost mutată. Dacă vrei, raportează pe
            Discord și îl reparăm.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">
              <Home className="size-4" aria-hidden />
              Înapoi acasă
            </ButtonLink>
            <ButtonLink
              href={siteConfig.discordInviteUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              <MessageSquare className="size-4" aria-hidden />
              Intră pe Discord
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
