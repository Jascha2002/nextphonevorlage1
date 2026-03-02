import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Users, MapPin, TrendingUp, Heart } from "lucide-react";

const benefits = [
  { icon: Heart, title: "Familiäres Team", desc: "Wir arbeiten wie eine Familie — kollegial, respektvoll und mit Spaß." },
  { icon: MapPin, title: "5 Standorte in Thüringen", desc: "Arbeite dort, wo du zu Hause bist — in Erfurt, Apolda, Weimar oder Gera." },
  { icon: TrendingUp, title: "Entwicklungsmöglichkeiten", desc: "Weiterbildungen, Schulungen und Aufstiegschancen warten auf dich." },
  { icon: Users, title: "Starkes Netzwerk", desc: "Profitiere von unserem Netzwerk an Partnern und Kunden in der Region." },
];

const Karriere = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Bewerbung eingegangen!",
        description: "Vielen Dank! Wir melden uns zeitnah bei Ihnen.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Karriere bei NextPhones</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Werde Teil unseres Teams und gestalte die Telekommunikation in Thüringen mit.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card rounded-lg p-6 border shadow-sm text-center">
              <b.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Current openings */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Aktuelle Stellenangebote</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { title: "Verkaufsberater/in Telekommunikation (m/w/d)", location: "Alle Standorte", type: "Vollzeit" },
              { title: "Techniker/in Handyservice (m/w/d)", location: "Erfurt, Gera", type: "Vollzeit" },
              { title: "Auszubildende/r Kaufmann/-frau (m/w/d)", location: "Erfurt", type: "Ausbildung" },
            ].map((job) => (
              <div key={job.title} className="bg-card rounded-lg p-5 border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.location} · {job.type}</p>
                </div>
                <a href="#bewerbung" className="text-sm font-medium text-primary hover:underline whitespace-nowrap">Jetzt bewerben →</a>
              </div>
            ))}
          </div>
        </div>

        {/* Application form */}
        <div id="bewerbung" className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Bewerbungsformular</h2>
          <form onSubmit={handleSubmit} className="space-y-5 bg-card rounded-lg p-8 border shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                <input required type="text" maxLength={100} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-Mail *</label>
                <input required type="email" maxLength={255} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
                <input type="tel" maxLength={20} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Gewünschte Position</label>
                <input type="text" maxLength={100} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Nachricht *</label>
              <textarea required rows={4} maxLength={2000} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Wird gesendet..." : "Bewerbung absenden"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Karriere;
