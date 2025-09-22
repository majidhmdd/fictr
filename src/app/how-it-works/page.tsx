import { UserPlus, CalendarCheck, Crosshair, Trophy } from "lucide-react";

function Step({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border p-5 bg-card">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary border">{icon}</span>
        {title}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{desc}</p>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">How It Works</h1>
        <p className="text-sm text-muted-foreground">Register → Join Tournament → Compete → Win</p>
      </header>

      <section className="grid gap-6 md:grid-cols-4">
        <Step icon={<UserPlus className="h-5 w-5" />} title="Register" desc="Create or join a team and submit basic details." />
        <Step icon={<CalendarCheck className="h-5 w-5" />} title="Join" desc="Get your bracket placement and match schedule." />
        <Step icon={<Crosshair className="h-5 w-5" />} title="Compete" desc="Play fair, follow rules, and advance through rounds." />
        <Step icon={<Trophy className="h-5 w-5" />} title="Win" desc="Earn prizes, recognition, and spotlight features." />
      </section>

      {/* New: Tournament Rules */}
      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Tournament Rules</h2>
        <p className="text-sm text-muted-foreground mt-1">Key guidelines for a fair and competitive experience.</p>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
            Verify team details and player IDs before match day. Mismatched info may lead to disqualification.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
            Be on time. No-shows beyond the grace period will be considered a forfeit.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
            Strictly no cheating, scripts, or third‑party tools. Violations result in immediate ban.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
            Follow admin instructions in the lobby and report disputes with evidence (screenshots/recordings).
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
            Respect opponents and staff. Toxic behavior or harassment is not tolerated.
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="/tournaments" className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90">View Tournaments</a>
          <a href="/contact" className="inline-flex items-center rounded-md border px-3 py-2 text-xs font-medium hover:bg-accent">Report an Issue</a>
        </div>
      </section>
    </div>
  );
}