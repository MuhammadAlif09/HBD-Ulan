import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { hero } from "@/data/content";

export default function Page() {
  return (
    <main className="section-pad flex min-h-dvh flex-col items-center justify-center gap-6 text-center">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Milestone 1 — Fondasi</p>
      <h1 className="font-serif text-5xl md:text-7xl">
        {hero.title} <span className="holo-text italic">{hero.highlight}</span>
      </h1>
      <p className="max-w-md text-pretty text-muted">{hero.subtitle}</p>
      <div className="flex gap-3">
        <span className="h-8 w-8 rounded-full bg-pink" />
        <span className="h-8 w-8 rounded-full bg-lavender" />
        <span className="h-8 w-8 rounded-full bg-cream" />
        <span className="h-8 w-8 rounded-full bg-butter" />
        <span className="h-8 w-8 rounded-full bg-mint" />
      </div>
    </main>
  );
}
