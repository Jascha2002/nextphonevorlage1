import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PaketData {
  id: string;
  slug: string;
  badge: string;
  badge_color: string | null;
  title: string;
  subtitle: string;
  core_services: string[];
  optional_services: string[];
  price: string;
  price_note: string;
  detail_description: string;
  detail_example: string;
  detail_notes: string;
}

interface Props {
  onAnfrage: (paketSlug: string) => void;
}

function PaketCard({ paket, onAnfrage }: { paket: PaketData; onAnfrage: (slug: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border-2 border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-card-foreground">{paket.title}</h3>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${paket.badge_color || 'bg-primary/10 text-primary'}`}>
            {paket.badge}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{paket.subtitle}</p>

        <div className="space-y-2 mb-4">
          {paket.core_services.map((s) => (
            <div key={s} className="flex items-start gap-2 text-sm text-card-foreground">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 mb-5">
          {paket.optional_services.map((s) => (
            <div key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Plus className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-2xl font-bold text-primary">{paket.price}</p>
          <p className="text-xs text-muted-foreground mt-1">{paket.price_note}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOpen(!open)}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-card-foreground hover:bg-secondary transition-colors"
          >
            Mehr erfahren
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onAnfrage(paket.slug)}
            className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Paket anfragen
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-card-foreground mb-1">Für wen ist dieses Paket?</h4>
                <p className="text-sm text-muted-foreground">{paket.detail_description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-card-foreground mb-1">Beispielkonfiguration</h4>
                <p className="text-sm text-muted-foreground">{paket.detail_example}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-card-foreground mb-1">Wichtige Hinweise</h4>
                <p className="text-sm text-muted-foreground">{paket.detail_notes}</p>
              </div>
              <button
                onClick={() => onAnfrage(paket.slug)}
                className="w-full px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Paket anfragen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PaketCards({ onAnfrage }: Props) {
  const { data: pakete = [], isLoading } = useQuery({
    queryKey: ['public-pakete'],
    queryFn: async () => {
      const { data } = await supabase.from('pakete').select('*').eq('is_active', true).order('sort_order');
      return (data || []) as PaketData[];
    },
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-medium mb-4">
            Unsere Pakete
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Finde dein perfektes Paket</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Vorgefertigte Kombinationen für die häufigsten Lebenssituationen — schnell, einfach, günstig.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Pakete werden geladen…</div>
        ) : pakete.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Aktuell keine Pakete verfügbar.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pakete.map((p) => (
              <PaketCard key={p.id} paket={p} onAnfrage={onAnfrage} />
            ))}
          </div>
        )}

        <div className="bg-muted border border-border rounded-lg p-6 text-center max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Alle Preisangaben sind Richtwerte ab-Preise. Die genauen Kosten hängen von deiner Wahl der Tarife, Geräte und Anbieter ab.
            Verschiedene Komponenten können unterschiedliche Vertragslaufzeiten haben.
            Unsere Berater erstellen dir ein individuelles Angebot — kostenlos und ohne Verpflichtung in allen 5 Filialen.
          </p>
        </div>
      </div>
    </section>
  );
}
