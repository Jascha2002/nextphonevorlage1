import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Aktion {
  id: string;
  corner_badge: string | null;
  provider: string;
  title: string;
  subheadline: string | null;
  bullets: string[] | null;
  startpreis: string | null;
  valid_until: string | null;
}

const AktionCard = ({ aktion }: { aktion: Aktion }) => (
  <div className="relative bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col min-w-[300px] sm:min-w-0">
    {aktion.corner_badge && (
      <div className="absolute top-4 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-l-full">
        {aktion.corner_badge}
      </div>
    )}
    <div className="p-6 flex flex-col flex-1">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{aktion.provider}</span>
      <h3 className="text-xl font-bold text-foreground mb-1">{aktion.title}</h3>
      {aktion.subheadline && <p className="text-sm text-muted-foreground mb-4">{aktion.subheadline}</p>}

      <ul className="space-y-2 mb-6 flex-1">
        {(aktion.bullets || []).map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mb-4">
        {aktion.startpreis && <span className="text-2xl font-bold text-primary">{aktion.startpreis}</span>}
        {aktion.valid_until && (
          <p className="text-xs text-muted-foreground mt-1">Gültig bis {new Date(aktion.valid_until).toLocaleDateString('de-DE')}</p>
        )}
      </div>

      <Link
        to="/beratung"
        className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
      >
        Jetzt sichern
      </Link>
    </div>
  </div>
);

const AktuelleAktionen = () => {
  const { data: aktionen = [], isLoading } = useQuery({
    queryKey: ['homepage-aktionen'],
    queryFn: async () => {
      const { data } = await supabase
        .from('aktionen')
        .select('*')
        .eq('status', 'aktiv')
        .eq('show_homepage', true)
        .order('sort_order', { ascending: true })
        .limit(3);
      return data || [];
    },
  });

  if (isLoading || aktionen.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🔥 Aktuelle Angebote
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Jetzt sparen bei NextPhones</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Diese Aktionen sind nur für kurze Zeit — sichern Sie sich jetzt Ihren Vorteil.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 mb-8">
          {aktionen.map((a) => (
            <AktionCard key={a.id} aktion={a} />
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mb-6">
          * Alle Preise inkl. MwSt. Angebote gültig solange der Vorrat reicht. Persönliche Beratung in allen Filialen.
        </p>

        <div className="text-center">
          <Link
            to="/beratung"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Alle Angebote besprechen →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AktuelleAktionen;
