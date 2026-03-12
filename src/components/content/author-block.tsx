import { Card } from "@/components/ui/card";

export function AuthorBlock({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  return (
    <Card className="p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-2">Autor</div>
      <div className="mt-2 text-sm font-semibold tracking-tight">{name}</div>
      <div className="mt-1 text-xs text-muted">{role}</div>
    </Card>
  );
}
