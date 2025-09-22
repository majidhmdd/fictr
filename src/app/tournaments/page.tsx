import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import Countdown from "@/components/site/Countdown";
import { tournaments } from "@/lib/tournaments";

export default function TournamentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Tournaments</h1>
          <p className="text-sm text-muted-foreground">Discover active and upcoming events hosted by Fictr.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tournaments.map((t) =>
        <Card key={t.slug} className="group overflow-hidden">
            <div
            className="bg-cover bg-center !w-[99.6%] !h-[135px]"
            style={{ backgroundImage: `url("${encodeURI(t.slug === "valley-esports-2025" ? "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Generated Image September 19, 2025 - 5_11PM (1)-1758282503079.png" : t.image)}")` }}
            aria-hidden />


            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span>{t.name}</span>
              </CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{t.location}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />
                {new Date(t.startDate).toLocaleDateString()} – {new Date(t.endDate).toLocaleDateString()}
              </div>
              <div className="pt-1"><Countdown date={t.startDate} /></div>
              <div className="pt-2">
                <Button asChild>
                  <Link href={`/tournaments/${t.slug}`} className="inline-flex items-center gap-2">View Details <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

}