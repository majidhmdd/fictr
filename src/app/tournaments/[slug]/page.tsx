import { notFound } from "next/navigation";
import { getTournamentBySlug } from "@/lib/tournaments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegistrationDialog from "@/components/site/RegistrationDialog";
import { Trophy, Users, Joystick, Wallet, CheckCircle2, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaymentConfirmationDialog from "@/components/site/PaymentConfirmationDialog";

export default function TournamentDetail({ params }: {params: {slug: string;};}) {
  const data = getTournamentBySlug(params.slug);
  if (!data) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 md:py-12">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">{data.name}</CardTitle>
            <CardDescription className="text-sm sm:text-base break-words">{data.location} • {new Date(data.startDate).toLocaleDateString()} – {new Date(data.endDate).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-base font-semibold mb-2">About</h2>
              <p className="text-sm text-muted-foreground break-words">{data.description}</p>
            </section>
            <section>
              <h2 className="text-base font-semibold mb-2">Rules & Format</h2>
              {/* Esports black & white module */}
              <div className="rounded-xl border overflow-hidden">
                {/* removed Timeline block for a cleaner mobile UI */}

                {/* Basics cards */}
                <div className="grid sm:grid-cols-3 gap-3 p-4 sm:p-5 bg-card">
                  <div className="rounded-lg border bg-black text-white p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/70"><Joystick className="h-4 w-4" /> Game</div>
                    <div className="text-lg font-semibold mt-1">Garena Free Fire</div>
                  </div>
                  <div className="rounded-lg border bg-black text-white p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/70"><Users className="h-4 w-4" /> Team size</div>
                    <div className="text-lg font-semibold mt-1">4–5 members</div>
                  </div>
                  <div className="rounded-lg border bg-black text-white p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/70"><Wallet className="h-4 w-4" /> Team Fee</div>
                    <div className="text-lg font-semibold mt-1">₹599</div>
                    <div className="text-xs text-white/70">₹200 upfront + ₹399 if qualified</div>
                  </div>
                </div>

                {/* Rules bullets */}
                <div className="p-4 sm:p-5 bg-card">
                  <ul className="grid gap-2 text-sm">
                    
                    <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 text-black dark:text-white" /> Hacks/cheats/third‑party tools = disqualification</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-black dark:text-white" /> Respect referees, organizers, and players</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-black dark:text-white" /> Matches are online and hosted by Fictr</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-black dark:text-white" /> Players are responsible for internet and devices</li>
                    <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 text-black dark:text-white" /> Payments are non‑refundable</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-black dark:text-white" /> Discounts apply only to the next Fictr tournament</li>
                  </ul>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-base font-semibold mb-2">Fees & Payment Structure</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border p-4 bg-card">
                  <div className="text-xs text-muted-foreground">Team Fee</div>
                  <div className="text-xl font-semibold">₹599</div>
                </div>
                <div className="rounded-lg border p-4 bg-card">
                  <div className="text-xs text-muted-foreground">Upfront at Registration</div>
                  <div className="text-xl font-semibold">₹200</div>
                </div>
                <div className="rounded-lg border p-4 bg-card">
                  <div className="text-xs text-muted-foreground">After Selection Round (if qualified)</div>
                  <div className="text-xl font-semibold">₹399</div>
                </div>
              </div>

              {/* Per-player visual breakdown */}
              <div className="mt-4 rounded-xl border p-4 bg-card">
                <h3 className="text-sm font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Per Player Fees</h3>
                <div className="grid gap-3 sm:grid-cols-2 mt-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Registration (per player)</div>
                    <div className="text-lg font-semibold">₹50</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">After selection round (per player, if qualified)</div>
                    <div className="text-lg font-semibold">₹149</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Each team member pays ₹50 during registration. If the team qualifies beyond the selection round, each member pays ₹149 before the next stage.</p>
              </div>

              <p className="text-xs text-muted-foreground mt-2">Note: ₹200 is non‑refundable. Only teams that qualify beyond the selection round pay the remaining ₹399 to continue.</p>
            </section>
            <section>
              <h2 className="text-base font-semibold mb-2">FAQ</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="rules">
                  <AccordionTrigger className="text-sm font-medium">What are the basic rules?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">Garena Free Fire tournament. Fair play required. Hacks, mods, or third‑party tools are strictly prohibited. Be on time for lobbies; late entries may be disqualified.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="eligibility">
                  <AccordionTrigger className="text-sm font-medium">Who is eligible?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">Open to Kashmiri youth teams (4–5 players). Provide valid in‑game IDs during registration. Respect organizers and other participants.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="rounds-payments">
                  <AccordionTrigger className="text-sm font-medium">How do rounds and payments work?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">Pay ₹200 at registration for selection round entry. Top 25 teams progress. If your team qualifies beyond the selection round, you'll be asked to pay the remaining ₹399 before the next stage.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="prize">
                  <AccordionTrigger className="text-sm font-medium">How are prizes distributed?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">Cash prizes and discounts are processed within 7 working days after tournament end. Discounts apply to the next Fictr‑organized tournament.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </CardContent>
        </Card>

        <Card className="order-first md:order-none">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Sign up your team to join the competition.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Prize highlights */}
            <div className="mb-6 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" /> Prize Highlights
              </h3>
              <ul className="grid gap-2">
                <li className="flex items-start gap-3 rounded-lg border p-3 bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-950/20">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 text-xs font-bold">1st</span>
                  <div className="text-xs">
                    <p className="font-medium">₹5K cash</p>
                    <p className="text-muted-foreground">+ 25% off next Fictr tournament entry</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg border p-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-200 text-xs font-bold">2nd</span>
                  <div className="text-xs">
                    <p className="font-medium !whitespace-pre-line !whitespace-pre-line">₹2.5K cash</p>
                    <p className="text-muted-foreground">+ 15% off next Fictr tournament entry</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg border p-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 text-xs font-bold">3rd</span>
                  <div className="text-xs">
                    <p className="font-medium">50% off next Fictr tournament entry</p>
                  </div>
                </li>
              </ul>
            </div>
            <RegistrationDialog tournamentSlug={params.slug} />
            {/* Make Payment section */}
            <div className="mt-6 rounded-lg border p-4 space-y-3">
              <h4 className="text-sm font-semibold">Make Payment</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Registration fee (non‑refundable)</span>
                <span className="font-medium">₹200</span>
              </div>
              <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                <li>Fee covers selection round participation only.</li>
                <li>Remaining ₹399 applies only if your team qualifies beyond the selection round.</li>
                <li>By proceeding, you agree to Fictr&apos;s <Link href="/terms" className="underline underline-offset-4">Terms & Conditions</Link> and <Link href="/refund" className="underline underline-offset-4">Refund Policy</Link>.</li>
              </ul>
              {/* Replace simple button with payment confirmation dialog trigger */}
              <PaymentConfirmationDialog tournamentSlug={params.slug} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

}