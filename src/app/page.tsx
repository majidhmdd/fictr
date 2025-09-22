import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Gamepad2, Users, CalendarDays, MapPin, UserPlus, ClipboardList, Target, Swords, Shield, Gift } from "lucide-react";
import Countdown from "@/components/site/Countdown";
import RegistrationDialog from "@/components/site/RegistrationDialog";
import { tournaments } from "@/lib/tournaments";
import CommonRegistrationDialog from "@/components/site/CommonRegistrationDialog";

export default function Home() {
  return (
    <div>
      {/* Promo Banner */}
      <div className="border-b bg-secondary/60">
        <div className="max-w-6xl mx-auto px-4 py-2 text-center text-xs sm:text-sm">
          <Link href="/referrals" className="inline-flex items-center gap-1 hover:underline">
            Earn discounts with our Referral & Affiliate Program
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
            "url(https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop)"
          }} />

        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Fictr – Organizing the Future of Indian Esports
            </h1>
            <p className="text-muted-foreground max-w-prose">
              Competitive gaming events, tournaments, and player support across India. We build opportunities for gamers and empower communities.
            </p>
            <div className="flex flex-wrap gap-3">
              <CommonRegistrationDialog triggerLabel="Apply Now" />
              <Button asChild variant="secondary">
                <Link href="/tournaments" className="inline-flex items-center gap-2">
                  Explore Tournaments <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="pt-4">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                First & next program starts in
              </div>
              <Countdown date="2025-10-01T10:00:00+05:30" />
            </div>
          </div>
          <div className="md:justify-self-end w-full h-[260px] md:h-[360px] rounded-xl border bg-cover bg-center" style={{ backgroundImage:
            "url(https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop)" }} />

        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid gap-6 md:grid-cols-3">
        <Feature icon={<Gamepad2 className="h-5 w-5" />} title="Esports First" desc="Built for players, teams, and communities across India." />
        <Feature icon={<Users className="h-5 w-5" />} title="Fair & Inclusive" desc="Transparent rules, structured brackets, and solid moderation." />
        <Feature icon={<Trophy className="h-5 w-5" />} title="Real Rewards" desc="Prizes, visibility, and growth for up-and-coming talent." />
      </section>

      {/* Tournament Roadmap */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,var(--chart-3)_0%,transparent_60%)] dark:opacity-30" />
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Valley Esports – (Oct 2025) Tournament Roadmap</h2>
          <p className="text-sm text-muted-foreground mb-8">Your journey from sign-up to the grand prize</p>

          <ol className="grid gap-4 md:gap-6 md:grid-cols-4">
            <RoadmapItem icon={<UserPlus className="h-5 w-5" />} title="Registration" desc="Submit team details and confirm eligibility." accent="from-chart-2 to-chart-3" />
            <RoadmapItem icon={<Swords className="h-5 w-5" />} title="Stages" desc="Selection → R1 → R2 → Semis" accent="from-chart-5 to-chart-4" />
            <RoadmapItem icon={<Trophy className="h-5 w-5" />} title="Finals" desc="The championship match decides it all." accent="from-chart-2 to-chart-1" />
            <RoadmapItem icon={<Gift className="h-5 w-5" />} title="Prize Distribution" desc="Awards, shout-outs, and recognition." accent="from-chart-5 to-chart-3" />
          </ol>

          <div className="mt-8 rounded-lg border bg-card p-4 text-sm">
            <span className="font-medium">Note:</span> All 27 remaining participants will receive 10% discount for the next tournament.
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Upcoming Tournaments</h2>
            <p className="text-sm text-muted-foreground">What's next on the calendar</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/tournaments" className="gap-2 inline-flex items-center">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {tournaments.slice(0, 2).map((t) =>
          <article key={t.slug} className="rounded-xl border overflow-hidden">
              <div
              className="bg-cover bg-center !w-[99.6%] !h-[127px]"
              style={{ backgroundImage: `url("${encodeURI(t.slug === "valley-esports-2025" ?
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Generated Image September 19, 2025 - 5_11PM (1)-1758282503079.png" :
                t.image)}")` }} />

              <div className="p-5 space-y-3">
                <h3 className="font-medium leading-tight">{t.name}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {t.location}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />
                    {new Date(t.startDate).toLocaleDateString(undefined, { month: "short", day: "2-digit" })}
                    {" — "}
                    {new Date(t.endDate).toLocaleDateString(undefined, { month: "short", day: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                <div className="flex items-center gap-3 pt-1">
                  <Button asChild size="sm">
                    <Link href={`/tournaments/${t.slug}`}>View Details</Link>
                  </Button>
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/tournaments" className="inline-flex items-center gap-2">
                      Explore more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
    </div>);

}

function Feature({ icon, title, desc }: {icon: React.ReactNode;title: string;desc: string;}) {
  return (
    <div className="rounded-xl border p-5 bg-card">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary border">{icon}</span>
        {title}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{desc}</p>
    </div>);

}

// Roadmap item card with hover-reveal details
function RoadmapItem({ icon, title, desc, accent }: {icon: React.ReactNode;title: string;desc: string;accent: string;}) {
  return (
    <li className="group relative">
      {/* connector line */}
      <div className="hidden md:block absolute top-6 left-[50%] right-[-50%] h-px bg-border -z-10" />

      <div className={`relative rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40`}> 
        <div className={`mx-auto h-12 w-12 rounded-lg border bg-gradient-to-br ${accent} text-primary-foreground flex items-center justify-center shadow-sm`}>{icon}</div>
        <div className="mt-3 text-sm">
          <div className="font-semibold tracking-tight">{title}</div>
          <p className="text-muted-foreground mt-1 line-clamp-2">{desc}</p>
        </div>
        {/* hover pop-up details */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg border bg-popover p-3 text-xs text-popover-foreground shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="font-medium mb-1">{title}</div>
          <div className="text-muted-foreground">{desc}</div>
        </div>
      </div>
    </li>);

}

function StatBox({ icon, label, value }: {icon: React.ReactNode;label: string;value: string;}) {
  return (
    <div className="rounded-2xl border p-6 bg-card bg-gradient-to-br from-secondary/60 to-transparent dark:from-secondary/20 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary border">{icon}</span>
        <span className="font-medium text-foreground/80">{label}</span>
      </div>
      <div className="mt-3 text-3xl md:text-4xl font-semibold !whitespace-pre-line">{value}</div>
    </div>);

}