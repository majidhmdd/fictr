"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RegistrationDialog({ triggerLabel = "Register Now", tournamentSlug }: { triggerLabel?: string; tournamentSlug?: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      // Map new fields to existing API shape
      const teamName = String(fd.get("team") || "").trim();
      const leaderName = String(fd.get("leader") || "").trim();
      const leaderPhone = String(fd.get("leader_phone") || "").trim();
      const leaderEmail = String(fd.get("leader_email") || "").trim();
      const city = String(fd.get("city") || "").trim();

      const p1 = String(fd.get("player1") || "").trim();
      const p2 = String(fd.get("player2") || "").trim();
      const p3 = String(fd.get("player3") || "").trim();
      const p4 = String(fd.get("player4") || "").trim();
      const p5 = String(fd.get("player5") || "").trim(); // optional

      // Basic client-side validations
      const phone10Digits = /^\d{10}$/;
      if (!phone10Digits.test(leaderPhone)) {
        throw new Error("Phone number must be exactly 10 digits");
      }
      if (!leaderEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Please enter a valid email address");
      }
      if (!p1 || !p2 || !p3 || !p4) {
        throw new Error("Please provide Player 1 to Player 4 details");
      }

      // Compose player_details text block to preserve all data server-side
      const playerDetails = [
        `City/District: ${city}`,
        `Leader Email: ${leaderEmail}`,
        `Leader Phone: ${leaderPhone}`,
        "Players:",
        `1) ${p1}`,
        `2) ${p2}`,
        `3) ${p3}`,
        `4) ${p4}`,
        p5 ? `5) ${p5}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const payload = {
        team_name: teamName,
        leader_name: leaderName,
        player_details: playerDetails,
        // API accepts a single contact field (email or phone). Prefer email for validation.
        contact: leaderEmail,
        tournament_slug: tournamentSlug?.trim() || undefined,
        willing_to_pay: fd.get("willing_to_pay") === "on",
      };

      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit registration");
      }

      setSubmitted(true);
      form.reset();
      // Keep dialog open to clearly show thank-you popup
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setSubmitted(false); setError(null); setLoading(false); } }}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 py-3 sm:px-6 sm:py-4">
          <DialogTitle>Team Registration</DialogTitle>
          <DialogDescription>Fill in your team details to register for the tournament.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
          {submitted ? (
            <div className="p-4 text-sm rounded-md bg-secondary">
              <div className="font-medium mb-1">Thank you!</div>
              Your registration has been received. We will contact you shortly.
            </div>
          ) : (
            <form className="grid gap-6" onSubmit={onSubmit}>
              {error && (
                <div className="p-3 text-sm rounded-md border border-destructive/30 text-destructive bg-destructive/5">
                  {error}
                </div>
              )}

              {/* Team & contact info */}
              <div className="rounded-lg border bg-muted/30 p-4 sm:p-5">
                <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-3">Team Information</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="team">Team Name</Label>
                    <Input id="team" name="team" required placeholder="e.g., Valley Titans" disabled={loading} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="leader">Team Leader Full Name</Label>
                    <Input id="leader" name="leader" required placeholder="e.g., Arjun Sharma" disabled={loading} />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="leader_phone">Team Leader Phone Number</Label>
                    <Input id="leader_phone" name="leader_phone" type="tel" inputMode="numeric" pattern="\\d{10}" title="Enter 10 digits" required placeholder="10-digit phone" disabled={loading} />
                    <p className="text-[11px] text-muted-foreground">Enter exactly 10 digits (no spaces or dashes).</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="leader_email">Team Leader Email Address</Label>
                    <Input id="leader_email" name="leader_email" type="email" required placeholder="name@email.com" disabled={loading} />
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  <Label htmlFor="city">City / District</Label>
                  <Input id="city" name="city" required placeholder="e.g., Srinagar" disabled={loading} />
                </div>
              </div>

              {/* Player details */}
              <div className="rounded-lg border p-4 sm:p-5">
                <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-3">Player Details</div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="grid gap-1">
                    <Label htmlFor="player1">Player 1 Name & Free Fire ID</Label>
                    <Input id="player1" name="player1" required placeholder="e.g., Rahul • FFID 123456789" disabled={loading} />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="player2">Player 2 Name & Free Fire ID</Label>
                    <Input id="player2" name="player2" required placeholder="e.g., Imran • FFID 234567891" disabled={loading} />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="player3">Player 3 Name & Free Fire ID</Label>
                    <Input id="player3" name="player3" required placeholder="e.g., Ayaan • FFID 345678912" disabled={loading} />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="player4">Player 4 Name & Free Fire ID</Label>
                    <Input id="player4" name="player4" required placeholder="e.g., Kabir • FFID 456789123" disabled={loading} />
                  </div>
                  <div className="md:col-span-2 grid gap-1">
                    <Label htmlFor="player5">(Optional) Player 5 Name & Free Fire ID (for substitute)</Label>
                    <Input id="player5" name="player5" placeholder="e.g., Zaid • FFID 567891234" disabled={loading} />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input id="willing_to_pay" name="willing_to_pay" type="checkbox" required disabled={loading} className="mt-1 h-4 w-4" />
                <Label htmlFor="willing_to_pay" className="text-sm text-muted-foreground">
                  Our team is willing to pay the tournament fee as per the rules.
                </Label>
              </div>

              <div className="flex justify-end gap-3 pt-3 sm:pt-4">
                <Button variant="secondary" type="button" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}