import { Users, Coins, Wrench, RefreshCw } from 'lucide-react';

const features = [
  { icon: Users, title: 'Ein Ansprechpartner', text: 'Kein Anbieter-Chaos — dein NextPhones Berater kümmert sich um alles. Vor Ort, persönlich, ohne Warteschleife.' },
  { icon: Coins, title: 'Günstiger als einzeln', text: 'Durch unsere Partnerrabatte und Bündelung sparst du im Vergleich zur einzelnen Buchung bei verschiedenen Anbietern.' },
  { icon: Wrench, title: 'Einrichtung inklusive', text: 'Wir richten alles für dich ein — WLAN, Geräte, Apps, Verträge. Du musst dich um nichts kümmern.' },
  { icon: RefreshCw, title: 'Flexibel anpassbar', text: 'Dein Paket wächst mit dir. Komponenten können jederzeit erweitert oder angepasst werden.' },
];

export default function WarumBundle() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-medium mb-4">
          Deine Vorteile
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Warum ein NextPhones Paket?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map(f => (
            <div key={f.title} className="bg-card border border-border rounded-lg p-6 text-left hover:border-primary/30 transition-colors">
              <f.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-bold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
