import { useState, useEffect } from 'react';
import { Check, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { pakete } from '@/data/paketeData';
import { toast } from '@/hooks/use-toast';

interface Props {
  preSelectedPaket?: string;
  preSelectedComponents?: string[];
  prePersons?: number;
}

const standorte = ['Erfurt', 'Apolda', 'Weimar', 'Gera Debschwitz', 'Gera Zentrum', 'Egal / Vor-Ort Service'];
const componentOptions = [
  'Mobilfunk + Smartphone', 'Internet (DSL/Glasfaser)', 'Tablet', 'TV & Streaming',
  'Festnetz / VoIP', 'E-Scooter (Partneranfrage)', 'Geräteschutz',
];

export default function PaketAnfrageFormular({ preSelectedPaket, preSelectedComponents, prePersons }: Props) {
  const [paket, setPaket] = useState(preSelectedPaket || '');
  const [komps, setKomps] = useState<string[]>(preSelectedComponents || []);
  const [anzahl, setAnzahl] = useState(prePersons || 1);
  const [standort, setStandort] = useState('');
  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [anmerkungen, setAnmerkungen] = useState('');
  const [datenschutz, setDatenschutz] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preSelectedPaket) setPaket(preSelectedPaket);
  }, [preSelectedPaket]);
  useEffect(() => {
    if (preSelectedComponents) setKomps(preSelectedComponents);
  }, [preSelectedComponents]);
  useEffect(() => {
    if (prePersons) setAnzahl(prePersons);
  }, [prePersons]);

  const toggleKomp = (k: string) => setKomps(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!datenschutz || !vorname || !nachname) return;
    setSubmitting(true);
    try {
      const paketLabel = pakete.find(p => p.id === paket)?.title || paket || 'Eigene Konfiguration';
      const { error } = await supabase.from('paket_anfragen').insert({
        paket: paketLabel,
        komponenten: komps,
        anzahl_personen: anzahl,
        standort,
        vorname,
        nachname,
        telefon,
        email,
        anmerkungen,
      });
      if (error) throw error;
      setSuccess(true);
    } catch {
      toast({ title: 'Fehler', description: 'Anfrage konnte nicht gesendet werden.', variant: 'destructive' });
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center bg-card border border-border rounded-lg p-12">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-2">Anfrage eingegangen!</h3>
            <p className="text-muted-foreground mb-4">Wir melden uns innerhalb von 24 Stunden telefonisch bei dir.</p>
            <a href="tel:03615188706" className="inline-flex items-center gap-2 text-primary font-semibold">
              <Phone className="h-5 w-5" /> 0361 5188706
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-medium mb-4">
            Kostenlose Beratung
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Paket unverbindlich anfragen</h2>
          <p className="text-muted-foreground">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Gewünschtes Paket</label>
              <select value={paket} onChange={e => setPaket(e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm">
                <option value="">Bitte wählen</option>
                {pakete.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                <option value="eigene">Eigene Konfiguration (vom Konfigurator)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Ausgewählte Komponenten</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {componentOptions.map(k => (
                  <label key={k} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input type="checkbox" checked={komps.includes(k)} onChange={() => toggleKomp(k)} className="accent-primary" />
                    {k}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Anzahl Personen</label>
              <input type="number" min={1} max={10} value={anzahl} onChange={e => setAnzahl(+e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Wunschstandort für Beratung</label>
              <select value={standort} onChange={e => setStandort(e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm">
                <option value="">Bitte wählen</option>
                {standorte.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Vorname *</label>
                <input required value={vorname} onChange={e => setVorname(e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nachname *</label>
                <input required value={nachname} onChange={e => setNachname(e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Telefonnummer</label>
                <input value={telefon} onChange={e => setTelefon(e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-Mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Sonderwünsche / Anmerkungen</label>
              <textarea rows={3} value={anmerkungen} onChange={e => setAnmerkungen(e.target.value)} className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground text-sm resize-none" />
            </div>

            <label className="flex items-start gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" checked={datenschutz} onChange={e => setDatenschutz(e.target.checked)} className="mt-0.5 accent-primary" />
              <span>Ich stimme der <a href="/datenschutz" className="text-primary underline">Datenschutzerklärung</a> zu. *</span>
            </label>

            <button type="submit" disabled={submitting || !datenschutz || !vorname || !nachname} className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
              {submitting ? 'Wird gesendet...' : 'Jetzt kostenlos anfragen'}
            </button>
          </form>

          {/* Right Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-bold text-card-foreground mb-4">Was passiert nach deiner Anfrage?</h4>
              <div className="space-y-4">
                {[
                  { step: 'Wir rufen dich innerhalb von 24 Stunden an' },
                  { step: 'Wir besprechen deine Wünsche und passen das Paket an' },
                  { step: 'Termin in deiner Wunschfiliale' },
                  { step: 'Alles wird eingerichtet — du lehnst dich zurück' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <div>
                      <span className="text-xs text-muted-foreground">Schritt {i + 1}</span>
                      <p className="text-sm text-card-foreground">{s.step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border-2 border-primary/30 rounded-lg p-6">
              <h4 className="font-bold text-card-foreground mb-3">Wichtige Hinweise:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Alle Preise sind Richtwerte</li>
                <li>• Verschiedene Komponenten können unterschiedliche Laufzeiten haben</li>
                <li>• E-Scooter wird über Partnerbetriebe vermittelt — separate Vereinbarung</li>
                <li>• Beratung ist immer kostenlos und unverbindlich</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
