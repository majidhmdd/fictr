import Link from "next/link";
import { SocialIcons } from "./SocialIcons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary border overflow-hidden">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/create-a-minimalist-black-and-white-logo_BkTd-y_1QsGEmjcMQNIDCw_gHUKRBBISYKxpEPoOIHyaQ_inspyrenet-1758199952157.png"
                alt="Fictr logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain" />

            </span>
            <span>Fictr</span>
          </Link>
          <p className="text-sm text-muted-foreground">Organizing the future of Indian esports.</p>
          <SocialIcons className="pt-1" />
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Navigate</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/tournaments">Tournaments</Link></li>
            <li><Link href="/referrals">Referral & Affiliate Program</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Legal</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="!whitespace-pre-line">Email: fictr.india@gmail.com</li>
            <li className="!whitespace-pre-line !whitespace-pre-line">Phone: +91 7780830066</li>
            <li className="!whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !text-slate-400 !whitespace-pre-line !whitespace-pre-line">Location: Jammu and Kashmir, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Fictr. All rights reserved.
        </div>
      </div>
    </footer>);

}