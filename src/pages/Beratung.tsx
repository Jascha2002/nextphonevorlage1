import { useState } from "react";
import { locations } from "@/data/locations";
import { useToast } from "@/hooks/use-toast";

const anliegenOptions = [
  "DSL & Festnetz",
  "Mobilfunk",
  "Handyservice",
  "WLAN-Einrichtung",
  "VoIP-Telefonie",
  "Geschäftskunden",
  "Sonstiges",
];

const Beratung = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Anfrage gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Beratung sichern</h1>
        <p className="text-muted-foreground text-center mb-10">
          Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-card rounded-lg p-8 border shadow-sm">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
            <input required type="text" maxLength={100} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon *</label>
              <input required type="tel" maxLength={20} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">E-Mail *</label>
              <input required type="email" maxLength={255} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Standort</label>
              <select className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
                <option value="">Bitte wählen</option>
                {locations.map((l) => (
                  <option key={l.slug} value={l.slug}>{l.city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Anliegen</label>
              <select className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
                <option value="">Bitte wählen</option>
                {anliegenOptions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Wunschtermin</label>
            <input type="date" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Nachricht</label>
            <textarea rows={4} maxLength={1000} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Wird gesendet..." : "Beratung sichern"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Beratung;
