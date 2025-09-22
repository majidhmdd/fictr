"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        message: String(fd.get("message") || "").trim(),
      };

      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }

      form.reset();
      setOpen(true); // show thank-you popup
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <div className="p-3 text-sm rounded-md border border-destructive/30 text-destructive bg-destructive/5 mb-2">{error}</div>
      )}
      <form className="grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your full name" disabled={loading} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" required placeholder="you@example.com" disabled={loading} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required rows={4} placeholder="How can we help?" disabled={loading} />
        </div>
        <div className="pt-2">
          <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
        </div>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank you!</DialogTitle>
            <DialogDescription>
              Your message has been sent. We will get back to you shortly.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactForm;