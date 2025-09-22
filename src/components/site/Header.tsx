"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SocialIcons } from "./SocialIcons";
import Image from "next/image";

const links = [
{ href: "/", label: "Home" },
{ href: "/about", label: "About" },
{ href: "/how-it-works", label: "How It Works" },
{ href: "/tournaments", label: "Tournaments" },
{ href: "/contact", label: "Contact Us" },
{ href: "https://forms.gle/WyadtfYCHjzJWVPRA", label: "Become a Sponsor", external: true }];


export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary border overflow-hidden">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/create-a-minimalist-black-and-white-logo_BkTd-y_1QsGEmjcMQNIDCw_gHUKRBBISYKxpEPoOIHyaQ_inspyrenet-1758199952157.png"
              alt="Fictr logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority />

          </span>
          <span>Fictr</span>
        </Link>

        {/* Desktop nav + socials */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            {links.map((l) =>
            <Link key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors !whitespace-pre-line" target={(l as any).external ? "_blank" : undefined} rel={(l as any).external ? "noopener noreferrer" : undefined}>
                {l.label}
              </Link>
            )}
          </nav>
          <SocialIcons />
        </div>

        <button aria-label="Open Menu" className="md:hidden p-2 rounded-md border" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open &&
      <div className="md:hidden border-t bg-background">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <span className="font-semibold">Menu</span>
            <button aria-label="Close Menu" className="p-2 rounded-md border" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-w-6xl mx-auto px-4 pb-4 space-y-3">
            {/* Mobile nav links */}
            <nav className="space-y-2">
              {links.map((l) =>
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-md px-3 py-2 text-sm text-foreground/90 hover:bg-accent"
              onClick={() => setOpen(false)}
              target={(l as any).external ? "_blank" : undefined}
              rel={(l as any).external ? "noopener noreferrer" : undefined}>

                  {l.label}
                </Link>
            )}
            </nav>
            <SocialIcons className="pt-2" />
          </div>
        </div>
      }
    </header>);

}