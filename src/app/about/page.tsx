import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">About Fictr</h1>
        <p className="text-sm text-muted-foreground max-w-prose">
          Fictr is an Indian esports tournament-hosting and management company. We organize competitive events,
          support players and teams, and create opportunities for gamers across India.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            src:
              "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
            alt: "Crowd cheering at an esports stage",
          },
          {
            src:
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
            alt: "Player focused with headset",
          },
          {
            src:
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
            alt: "Team huddle before the match",
          },
        ].map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden border bg-card aspect-[4/3] relative">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-base font-semibold mb-2">Our Mission</h2>
          <p className="text-sm text-muted-foreground max-w-prose">
            We’re committed to growing India’s esports ecosystem by creating accessible tournaments, cultivating
            upcoming talent, and partnering with stakeholders to deliver high-quality competitive experiences.
            From grassroots cups to flagship leagues, Fictr promotes fair play and long‑term player development.
          </p>
        </div>
        <div className="rounded-xl border p-4 bg-card">
          <h3 className="text-sm font-semibold">Highlights</h3>
          <ul className="mt-2 text-sm text-muted-foreground space-y-2 list-disc pl-4">
            <li>Transparent, community-first formats</li>
            <li>Admin support and moderation</li>
            <li>Opportunities for regional players</li>
            <li>Showcase & media exposure</li>
          </ul>
        </div>
      </section>
    </div>
  );
}