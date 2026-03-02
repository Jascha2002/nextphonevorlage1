import { useState } from "react";
import { Zap, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StromCheck = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Anfrage eingegangen!",
        description: "Wir prüfen Ihr Sparpotenzial und melden uns bei Ihnen.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-3">Kostenloser Stromtarif-Check</h1>
        <p className="text-muted-foreground mb-10">
          Prüfen Sie jetzt Ihren aktuellen Tarif kostenfrei und entdecken Sie Ihr Sparpotenzial.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-card rounded-lg p-8 border shadow-sm text-left">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Postleitzahl *</label>
            <input required type="text" maxLength={5} pattern="[0-9]{5}" placeholder="z.B. 99084" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Aktueller Anbieter</label>
            <input type="text" maxLength={100} placeholder="z.B. Stadtwerke Erfurt" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Monatlicher Verbrauch (kWh)</label>
            <input type="number" min={0} placeholder="z.B. 250" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Wird geprüft..." : "Jetzt Sparpotenzial prüfen"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 text-primary" />
          <span>Oder rufen Sie uns an: </span>
          <a href="tel:03615188706" className="text-primary font-medium hover:underline">0361/5188706</a>
        </div>
      </div>
    </div>
  );
};

export default StromCheck;
