import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SponsorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Become a Sponsor</h1>
        <p className="text-sm text-muted-foreground max-w-prose">
          Partner with Fictr to reach India’s fastest-growing esports audiences. Support tournaments, enable player
          development, and gain meaningful brand visibility across stages and streams.
        </p>
      </header>

      <section className="rounded-xl border p-5 bg-card">
        <h2 className="text-base font-semibold mb-3">Sponsorship Enquiry</h2>
        <form className="grid gap-4" action="#" method="post">
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" required placeholder="Your company" />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required placeholder="you@company.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required placeholder="e.g., +91 98765 43210" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={4} placeholder="Tell us about your goals and timelines" />
          </div>
          <div className="pt-2">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </section>
    </div>
  );
}