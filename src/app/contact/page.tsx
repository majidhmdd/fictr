import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/site/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Contact Us</h1>
        <p className="text-sm text-muted-foreground">We'd love to hear from you. For partnerships, media, or general questions, send us a message.</p>
      </header>

      <div className="grid gap-8">
        <section className="rounded-xl border p-5 bg-card">
          <h2 className="text-base font-semibold mb-3">Get in touch</h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>Email: fictr.india@gmail.com</li>
            <li>Phone: +91 7780830066</li>
            <li className="!whitespace-pre-line !text-slate-500">Office: Jammu and Kashmir, India</li>
          </ul>

          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>);

}