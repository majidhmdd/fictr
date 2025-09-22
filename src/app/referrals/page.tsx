import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Users, Share2, Percent, Trophy, Link2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Referral & Affiliate Program | Fictr",
  description:
    "Refer friends to Valley Esports and earn discounts, or become an affiliate and earn credits for future registrations.",
};

export default function ReferralAffiliatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-6 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Referral & Affiliate Program
        </h1>
        <p className="text-muted-foreground mt-2 max-w-prose">
          Share Fictr with your community and earn discounts or credits on your registrations.
        </p>
        {/* Top CTA */}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <a
              href="https://forms.gle/7sZQ9FWVpe961egy7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Sign up for Referrals <Percent className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href="https://forms.gle/LhCdAACLLzSvnUPf8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Become an Affiliate <Users className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      {/* Referral Program */}
      <section className="rounded-xl border bg-card p-6 md:p-8 space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary border">
            <Share2 className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-semibold">Refer Your Friends. Get Discounts.</h2>
        </div>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Share your post/story about Fictr and tag our official accounts.</li>
          <li>Ask friends to register for Valley Esports 2025 using your post reference.</li>
          <li>
            After verification you get <span className="font-medium text-foreground">10% off your registration fee</span>.
          </li>
        </ol>
        {/* Examples */}
        <div>
          <h3 className="text-sm font-medium mb-2">Examples</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-3 bg-card">
              <p className="text-xs text-muted-foreground">
                Instagram Story: "We're joining <span className="text-foreground font-medium">#ValleyEsports</span> by @Fictr — register now! 🏆"
              </p>
            </div>
            <div className="rounded-lg border p-3 bg-card">
              <p className="text-xs text-muted-foreground">
                WhatsApp: "Team XYZ is in! Use my post as reference when you register."
              </p>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Button asChild>
            <a
              href="https://forms.gle/7sZQ9FWVpe961egy7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Join Referral Program <Percent className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Affiliate Program */}
      <section className="rounded-xl border bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary border">
            <Link2 className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-semibold">Become an Affiliate. Earn More.</h2>
        </div>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Sign up as an Affiliate (quick form).</li>
          <li>Share your unique link with friends and gaming teams.</li>
          <li>
            Each team that registers with your link earns you a
            {" "}
            <span className="font-medium text-foreground">15% discount credit</span> for future registrations.
          </li>
          <li>Top affiliates may be featured on our website.</li>
        </ol>
        {/* Examples */}
        <div>
          <h3 className="text-sm font-medium mb-2">Examples</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-3 bg-card">
              <p className="text-xs text-muted-foreground">
                "Join with my Fictr link — help my team earn credits for the next event!"
              </p>
            </div>
            <div className="rounded-lg border p-3 bg-card">
              <p className="text-xs text-muted-foreground">
                "Calling all Free Fire squads in Kashmir — register for Valley Esports 2025."
              </p>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Button asChild variant="secondary">
            <a
              href="https://forms.gle/LhCdAACLLzSvnUPf8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Join Affiliate Program <Users className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Extra context / subtle panel */}
      <div className="mt-8 text-xs text-muted-foreground">
        Note: Discounts and credits apply to Fictr-hosted registrations only. Verification of successful referrals/affiliates may be required.
      </div>
    </div>
  );
}