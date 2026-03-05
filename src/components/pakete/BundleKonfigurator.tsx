import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { komponenten, priceMap } from '@/data/paketeData';
import konfigEinzelperson from '@/assets/konfig-einzelperson.jpg';
import konfigFamilie from '@/assets/konfig-familie.jpg';
import konfigUnternehmen from '@/assets/konfig-unternehmen.jpg';

interface Props {
  onSubmit: (config: { target: string; components: string[]; persons: number }) => void;
}

const targets = [
  { id: 'mich', image: konfigEinzelperson, label: 'Für mich', sub: 'Einzelperson' },
  { id: 'familie', image: konfigFamilie, label: 'Für meine Familie', sub: '2-5 Personen' },
  { id: 'unternehmen', image: konfigUnternehmen, label: 'Für mein Unternehmen', sub: 'Geschäftskunden' },
];

const personOptions = ['1 Person', '2 Personen', '3 Personen', '4+ Personen'];

export default function BundleKonfigurator({ onSubmit }: Props) {
  const [step, setStep] = useState(1);
  const [target, setTarget] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [persons, setPersons] = useState(1);

  const needsPersonStep = target === 'familie' || target === 'unternehmen';
  const totalSteps = needsPersonStep ? 4 : 3;
  const summaryStep = needsPersonStep ? 4 : 3;

  const toggleComponent = (id: string) => {
    if (id === 'alles') {
      const allIds = komponenten.filter(k => k.id !== 'alles').map(k => k.id);
      setSelected(prev => prev.includes('alles') ? [] : [...allIds, 'alles']);
      return;
    }
    setSelected(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      const allIds = komponenten.filter(k => k.id !== 'alles').map(k => k.id);
      if (allIds.every(aid => next.includes(aid))) return [...next.filter(x => x !== 'alles'), 'alles'];
      return next.filter(x => x !== 'alles');
    });
  };

  const calcPrice = () => {
    let base = selected.filter(s => s !== 'alles').reduce((sum, s) => sum + (priceMap[s] || 0), 0);
    if (persons >= 3) base += 20;
    if (target === 'unternehmen') base += 15;
    return base;
  };

  const canNext = () => {
    if (step === 1) return !!target;
    if (step === 2) return selected.length > 0;
    if (step === 3 && needsPersonStep) return persons >= 1;
    return true;
  };

  const next = () => {
    if (step === 2 && !needsPersonStep) setStep(summaryStep);
    else setStep(s => s + 1);
  };

  const prev = () => {
    if (step === summaryStep && !needsPersonStep) setStep(2);
    else setStep(s => s - 1);
  };

  const selectedLabels = selected.filter(s => s !== 'alles').map(s => komponenten.find(k => k.id === s)?.label || s);

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-medium mb-4">
            Konfigurator
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Stell dein Paket selbst zusammen</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Wähle was du brauchst — wir erstellen dir ein maßgeschneidertes Angebot.</p>
        </div>

        {/* Progress */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Schritt {Math.min(step, totalSteps)} von {totalSteps}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }} />
          </div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left */}
          <div className="flex-1">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-xl font-bold text-foreground mb-6">Für wen ist das Paket?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {targets.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTarget(t.id)}
                      className={`relative rounded-lg border-2 overflow-hidden text-left transition-all h-48 ${target === t.id ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/30'}`}
                    >
                      <img src={t.image} alt={t.label} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                      <div className="relative h-full flex flex-col justify-end p-4">
                        <span className="font-semibold text-white block">{t.label}</span>
                        <span className="text-sm text-white/80">{t.sub}</span>
                        {target === t.id && <Check className="absolute top-3 right-3 h-5 w-5 text-primary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-xl font-bold text-foreground mb-2">Was soll in dein Paket?</h3>
                <p className="text-sm text-muted-foreground mb-6">Mehrfachauswahl möglich</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {komponenten.map(k => {
                    const active = selected.includes(k.id);
                    return (
                      <button
                        key={k.id}
                        onClick={() => toggleComponent(k.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all flex items-start gap-3 ${active ? 'border-primary bg-primary text-white' : 'border-border bg-card hover:border-primary/30'}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-card-foreground'}`}>{k.label}</span>
                            {k.badge && <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'}`}>{k.badge}</span>}
                          </div>
                          <span className={`text-xs ${active ? 'text-white/80' : 'text-muted-foreground'}`}>{k.sub}</span>
                        </div>
                        {active && <Check className="h-5 w-5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && needsPersonStep && (
              <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-xl font-bold text-foreground mb-6">Für wie viele Personen?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {personOptions.map((p, i) => {
                    const val = i + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setPersons(val)}
                        className={`p-4 rounded-lg border-2 text-center font-medium transition-all ${persons === val ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-card text-card-foreground hover:border-primary/30'}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step >= summaryStep && (
              <motion.div key="s4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-xl font-bold text-foreground mb-6">Zusammenfassung</h3>
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <div><span className="text-sm text-muted-foreground">Für:</span> <span className="font-medium text-card-foreground">{targets.find(t => t.id === target)?.label}</span></div>
                  {needsPersonStep && <div><span className="text-sm text-muted-foreground">Personen:</span> <span className="font-medium text-card-foreground">{persons >= 4 ? '4+' : persons}</span></div>}
                  <div>
                    <span className="text-sm text-muted-foreground block mb-2">Komponenten:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedLabels.map(l => (
                        <span key={l} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Nav buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={prev} className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                  Zurück
                </button>
              )}
              {step < summaryStep ? (
                <button onClick={next} disabled={!canNext()} className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                  Weiter
                </button>
              ) : (
                <button
                  onClick={() => onSubmit({ target, components: selected.filter(s => s !== 'alles'), persons })}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Jetzt unverbindlich anfragen
                </button>
              )}
            </div>
          </div>

          {/* Right sticky summary */}
          <div className="lg:w-80">
            <div className="lg:sticky lg:top-24 bg-card border border-border rounded-lg p-6">
              <h4 className="font-bold text-card-foreground mb-4">Deine Konfiguration:</h4>
              {selectedLabels.length === 0 ? (
                <p className="text-sm text-muted-foreground">Noch keine Auswahl getroffen.</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {selectedLabels.map(l => (
                    <div key={l} className="flex items-center gap-2 text-sm text-card-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              )}
              {selectedLabels.length > 0 && (
                <>
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-sm text-muted-foreground">Geschätzter Preis:</p>
                    <p className="text-2xl font-bold text-primary">ab {calcPrice()}€ / Monat</p>
                    <p className="text-xs text-muted-foreground mt-1">*Richtwert — genauer Preis nach persönlicher Beratung</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
