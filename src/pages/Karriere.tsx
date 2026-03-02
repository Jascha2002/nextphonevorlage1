import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Shield, BookOpen, TrendingUp, Car, Clock, Users, Star, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Betriebliche Altersvorsorge", desc: "Sichere Deine Zukunft mit unserer betrieblichen Altersvorsorge." },
  { icon: BookOpen, title: "Betriebliche Weiterbildung", desc: "Regelmäßige Schulungen und Weiterbildungsangebote für Deine Karriere." },
  { icon: TrendingUp, title: "Erfolgsbeteiligung", desc: "Profitiere direkt vom Erfolg des Unternehmens." },
  { icon: Car, title: "Firmenwagen", desc: "Firmenwagen zur beruflichen und privaten Nutzung." },
  { icon: Clock, title: "Flexible Arbeitszeiten", desc: "Arbeitszeiten die sich Deinem Leben anpassen." },
  { icon: Users, title: "Mentoring-Programm", desc: "Erfahrene Mentoren begleiten Dich auf Deinem Weg." },
];

const jobTags = [
  "Betriebliche Weiterbildung", "Kostenlose Getränke", "Mentoring-Programm",
  "Erfolgsbeteiligung", "Firmenwagen", "Betriebliche Altersvorsorge", "Flexible Arbeitszeiten",
];

const fullDescription = `Wir suchen Vertriebsmitarbeiter im Außendienst (m/w/d) und bieten dir die Möglichkeit zum Berufswechsel. Quereinsteiger herzlich willkommen!

Wir, die NextLevel-Vertrieb setzen den offiziellen Außendienst um für den Glasfaserausbau in Thüringen und sind zertifizierter Partner der Thüringer Netkom. Wir verkaufen direkt beim Endkunden, bekommen tausende warme Leads im Monat und machen keine Kaltakquise.

Hier ein paar Fakten auf den Punkt:
• Du verdienst ab dem ersten Monat mehr als 2.500€ brutto
• Festgehalt + ungedeckelte Provisionen
• Motivierte, gut gelaunte Kollegen
• Täglicher Kundenkontakt
• Vollzeit (Mo-Fr), feste Arbeitszeiten
• Langfristiger, sicherer Job

Was wir uns von dir wünschen:
• Aufgeschlossene, starke Persönlichkeit
• Teamplayer
• Selbstständig, zuverlässig & zielorientiert
• Erfahrung im Vertrieb von Vorteil – Quereinsteiger willkommen!

Was du bekommst:
• Betriebliche Altersvorsorge
• Betriebliche Weiterbildung
• Erfolgsbeteiligung
• Firmenwagen
• Flexible Arbeitszeiten
• Kostenlose Getränke
• Mentoring-Programm
• Provision + Zusatzzahlungen

Auf Instagram @nextlevelvertrieb findest du mehr Informationen.`;

const Karriere = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Bewerbung eingegangen!", description: "Vielen Dank! Wir melden uns zeitnah bei Ihnen." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">Karriere bei NextPhones</h1>
          <p className="text-primary-foreground/80 text-lg">
            Werde Teil unseres Teams – 5 Standorte, 25 Mitarbeiter, eine Familie
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card rounded-lg p-6 border shadow-sm text-center service-card-glow transition-shadow">
              <b.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Job listing */}
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Aktuelle Stellenangebote</h2>
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Kundenberater (m/w/d) im Außendienst</h3>
                  <p className="text-sm text-muted-foreground">NextPhones Einzelfirma</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                  <Star className="h-4 w-4 fill-primary" />
                  5.0 / 5.0
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> 99084 Erfurt</span>
                <span>💰 3.000 € – 5.000 € / Monat</span>
                <span>📋 Vollzeit</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {jobTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">{tag}</span>
                ))}
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                {expanded ? "Beschreibung ausblenden" : "Ganze Stellenbeschreibung anzeigen"}
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {expanded && (
              <div className="px-6 pb-6">
                <div className="border-t pt-6">
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line mb-8">
                    {fullDescription}
                  </div>

                  {/* Application form */}
                  <div className="bg-secondary rounded-lg p-6">
                    <h3 className="text-lg font-bold text-foreground mb-1">Jetzt bewerben</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Bewerbung geht direkt an: bewerbung@nextlevelvertrieb.com
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
                          <input required type="text" maxLength={100} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">E-Mail *</label>
                          <input required type="email" maxLength={255} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Telefon</label>
                        <input type="tel" maxLength={20} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Motivation *</label>
                        <textarea required rows={4} maxLength={2000} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none" />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {loading ? "Wird gesendet..." : "Jetzt bewerben"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Karriere;
