import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import blogImage from "@/assets/blog-telekom-preiserhoehung.jpg";

const TelekomPreiserhoehung = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Blog
        </Link>

        <Badge className="bg-primary text-primary-foreground mb-4">Tipps & Tricks</Badge>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Telekom Preiserhöhung — Ihre Optionen als Bestandskunde
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 15. Februar 2026</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 Min. Lesezeit</span>
        </div>

        <img src={blogImage} alt="Telekom Preiserhöhung" className="w-full rounded-lg mb-8 object-cover h-64 md:h-80" />

        <div className="prose prose-lg max-w-none">
          <p>
            Viele Telekom-Kunden haben in letzter Zeit Post bekommen: Die Preise für DSL- und Mobilfunktarife wurden erhöht. Was viele nicht wissen: Eine Preiserhöhung gibt Ihnen das Recht zur Sonderkündigung — und oft lohnt sich ein Wechsel.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Sonderkündigungsrecht bei Preiserhöhung</h2>
          <p>
            Wenn Ihr Anbieter den Preis erhöht, haben Sie als Kunde das Recht auf eine außerordentliche Kündigung. Das gilt auch während der laufenden Mindestvertragslaufzeit. Wichtig dabei:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>Die Kündigung muss innerhalb von 3 Monaten nach der Preiserhöhung eingehen</li>
            <li>Sie müssen selbst kündigen — ein neuer Anbieter kann das nicht für Sie tun</li>
            <li>Stimmen Sie das Kündigungsdatum mit dem neuen Vertragsstart ab</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Lohnt sich ein Anbieterwechsel?</h2>
          <p>
            Ja — in vielen Fällen können Kunden durch einen Wechsel deutlich sparen. Ein Rechenbeispiel: Wer vom Telekom MagentaZuhause M zu einem günstigeren Kabelanbieter wechselt, kann über 24 Monate bis zu 597 Euro sparen.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Was Sie jetzt tun sollten</h2>
          <ol className="list-decimal pl-6 space-y-2 text-foreground">
            <li>Preiserhöhungsschreiben prüfen — wann gilt die Erhöhung?</li>
            <li>Sonderkündigungsrecht prüfen — innerhalb von 3 Monaten handeln</li>
            <li>Angebote vergleichen — lassen Sie sich kostenlos beraten</li>
            <li>Rufnummernmitnahme beantragen — Ihre Nummer bleibt erhalten</li>
            <li>Neuen Vertrag abschließen — mit besserem Preis-Leistungs-Verhältnis</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Kostenlose Beratung bei NextPhones</h2>
          <p>
            Unsere Berater kennen alle aktuellen Angebote von Telekom, Vodafone, o2, congstar und weiteren Anbietern. Wir vergleichen kostenlos und finden den besten Tarif für Ihre Situation — ohne versteckte Kosten und ohne Druck.
          </p>

          <div className="my-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link to="/beratung">Jetzt kostenlos beraten lassen</Link>
            </Button>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-8">
            <p className="text-foreground m-0">
              ⚠️ <strong>Wichtig:</strong> Das Sonderkündigungsrecht gilt nur für 3 Monate nach Erhalt der Preiserhöhungsmitteilung. Handeln Sie rechtzeitig!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelekomPreiserhoehung;
