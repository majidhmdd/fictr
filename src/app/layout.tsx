import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Fictr – Organizing the Future of Indian Esports",
  description:
    "Fictr is an Indian esports tournament-hosting and management company. We organize competitive events, support players and teams, and create opportunities for gamers across India.",
  icons: {
    icon: [
      {
        url:
          "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/white_logo-1758261287286.png",
        rel: "icon",
        sizes: "any",
      },
    ],
    shortcut:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/white_logo-1758261287286.png",
    apple:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/white_logo-1758261287286.png",
  },
  metadataBase: new URL("https://fictr.vercel.app"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}