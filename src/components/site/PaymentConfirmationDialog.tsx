"use client";

import * as React from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Props {
  tournamentSlug: string;
  triggerClassName?: string;
}

export const PaymentConfirmationDialog: React.FC<Props> = ({ tournamentSlug, triggerClassName }) => {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [paying, setPaying] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", received: false });
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!form.name.trim()) return setError("Name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("Enter a valid email");
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) return setError("Phone must be 7-15 digits");
    if (!form.received) return setError("Please confirm you received Fictr's confirmation email");

    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("bearer_token") : null;
      const res = await fetch("/api/payment-confirmations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone,
          received_confirmation: true,
          tournament_slug: tournamentSlug,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Submission failed");
        return;
      }
      setSuccess(true);
      // Open the confirmation-before-payment dialog
      setConfirmOpen(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setOpen(false);
    setConfirmOpen(false);
    setSuccess(false);
    setForm({ name: "", email: "", phone: "", received: false });
    setError(null);
  };

  // Load Razorpay script when needed
  const loadRazorpay = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === "undefined") return reject(new Error("Window not available"));
      if ((window as any).Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  }, []);

  const handleProceedToPayment = async () => {
    setError(null);
    setPaying(true);
    try {
      await loadRazorpay();

      const token = typeof window !== "undefined" ? localStorage.getItem("bearer_token") : null;
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          amount: 20000, // ₹200 in paise
          currency: "INR",
          receipt: `${tournamentSlug}-${Date.now()}`,
          notes: { tournament: tournamentSlug, name: form.name, email: form.email, phone: form.phone },
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok || !order?.id) {
        setError(order?.error || "Unable to initiate payment");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
        amount: order.amount,
        currency: order.currency,
        name: "Fictr",
        description: "Tournament Registration Fee",
        order_id: order.id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: order.notes,
        theme: { color: "#111827" },
        handler: function () {
          // Close dialogs on success; signature verification can be added later via webhook/verify API
          setConfirmOpen(false);
          setOpen(false);
          setSuccess(true);
        },
        modal: {
          ondismiss: function () {
            setPaying(false);
          },
        },
      } as any;

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      setError("Payment initiation failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetAndClose(); }}>
        <DialogTrigger asChild>
          <Button className={triggerClassName || "w-full h-12 text-base sm:h-10 sm:text-sm rounded-lg"}>Pay ₹200 now</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm before payment</DialogTitle>
            <DialogDescription>
              Submit this only after you have received the official confirmation email from Fictr.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile" />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="received" checked={form.received} onCheckedChange={(v) => setForm((f) => ({ ...f, received: Boolean(v) }))} />
              <Label htmlFor="received" className="text-sm text-muted-foreground">
                I have received the confirmation email from Fictr and I am submitting this after that.
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              By proceeding, you agree to Fictr's <Link href="/terms" className="underline underline-offset-4">Terms & Conditions</Link> and <Link href="/refund" className="underline underline-offset-4">Refund Policy</Link>.
            </p>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit & Continue"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog before payment */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed to payment?</AlertDialogTitle>
            <AlertDialogDescription>
              Your confirmation has been recorded. You will now proceed to the payment step for ₹200 (non‑refundable).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={resetAndClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceedToPayment} disabled={paying}>
              {paying ? "Opening Razorpay..." : "Proceed to Pay"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PaymentConfirmationDialog;