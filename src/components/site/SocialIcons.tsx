"use client";

import Link from "next/link";
import { Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";
import Image from "next/image";

export function SocialIcons({ className = "", size = 18 }: { className?: string; size?: number }) {
  const iconClass = "text-muted-foreground hover:text-foreground transition-colors";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link aria-label="Instagram" href="https://www.instagram.com/fictr.official/" target="_blank" rel="noopener noreferrer" className={iconClass}>
        <Instagram size={size} />
      </Link>
      <Link aria-label="YouTube" href="https://www.youtube.com/@fictr" target="_blank" rel="noopener noreferrer" className={iconClass}>
        <Youtube size={size} />
      </Link>
      <Link aria-label="Discord" href="https://discord.gg/BmzH8PeT" target="_blank" rel="noopener noreferrer" className={iconClass}>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Chat-Meeting-Application-Discord-Alternate--Streamline-Freehand-1758209876693.png"
          alt="Discord"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </Link>
      <Link aria-label="LinkedIn" href="https://www.linkedin.com/company/fictr/" target="_blank" rel="noopener noreferrer" className={iconClass}>
        <Linkedin size={size} />
      </Link>
    </div>
  );
}