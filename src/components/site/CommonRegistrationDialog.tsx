"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const TOURNAMENTS = [
  { value: "valley-esports-2025", label: "Valley Esports 2025" },
  { value: "future-tournaments", label: "Future Tournaments" },
];

export default function CommonRegistrationDialog({ triggerLabel = "Apply Now" }: { triggerLabel?: string }) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [leaderName, setLeaderName] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [tournament, setTournament] = useState<string>(TOURNAMENTS[0].value);
  const [sendEmail, setSendEmail] = useState(true);

  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leaderEmail), [leaderEmail]);
  const isValidPhone = useMemo(() => /^\d{10}$/.test(leaderPhone), [leaderPhone]);
  const canSubmit = leaderName.trim() && isValidPhone && isValidEmail && tournament;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Please complete all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("bearer_token") : null;
      const res = await fetch("/api/common-registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          leader_name: leaderName.trim(),
          leader_phone: leaderPhone.trim(),
          leader_email: leaderEmail.trim().toLowerCase(),
          tournament,
          send_email: !!sendEmail,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Registration failed. Please try again.");
      }

      // reset form and show confirmation popup
      setLeaderName("");
      setLeaderPhone("");
      setLeaderEmail("");
      setTournament(TOURNAMENTS[0].value);
      setSendEmail(true);
      setSuccessOpen(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setError(null); setLoading(false); } }}>
        <DialogTrigger asChild>
          <Button>{triggerLabel}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <DialogHeader className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 py-3 sm:px-6 sm:py-4">
            <DialogTitle>Common Registration</DialogTitle>
            <DialogDescription>Enter team leader details and choose a tournament.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto p-4 sm:p-6 grid gap-5">
            {error && (
              <div className="p-3 text-sm rounded-md border border-destructive/30 text-destructive bg-destructive/5">{error}</div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="leader_name">Full Name of Team Leader</Label>
              <Input id="leader_name" placeholder="e.g., Arjun Sharma" value={leaderName} onChange={(e) => setLeaderName(e.target.value)} disabled={loading} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="leader_phone">Phone Number of Team Leader</Label>
              <Input id="leader_phone" type="tel" inputMode="numeric" pattern="\\d{10}" title="Enter exactly 10 digits" placeholder="10-digit phone" value={leaderPhone} onChange={(e) => setLeaderPhone(e.target.value.replace(/[^0-9]/g, ""))} disabled={loading} required />
              <p className="text-[11px] text-muted-foreground">Must be exactly 10 digits.</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="leader_email">Email Address of Team Leader</Label>
              <Input id="leader_email" type="email" placeholder="name@email.com" value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} disabled={loading} required />
            </div>

            <div className="grid gap-2">
              <Label>Tournament Selection</Label>
              <Select value={tournament} onValueChange={setTournament}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Tournament" />
                </SelectTrigger>
                <SelectContent>
                  {TOURNAMENTS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="send_email" checked={sendEmail} onCheckedChange={(v) => setSendEmail(!!v)} disabled={loading} />
              <Label htmlFor="send_email" className="text-sm text-muted-foreground">Auto-send confirmation email to team leader</Label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
              <Button type="submit" disabled={loading || !canSubmit}>{loading ? "Submitting..." : "Register Now"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration received!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you. Your registration has been submitted successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => { setSuccessOpen(false); setOpen(false); }}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}