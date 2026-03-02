import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import blogImage from "@/assets/blog-samsung-galaxy-s26.jpg";

const SamsungGalaxyS26 = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Blog
        </Link>

        <Badge className="bg-primary text-primary-foreground mb-4">Smartphones</Badge>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Samsung Galaxy S26 — Top-Smartphone mit starkem Angebot
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 01. Februar 2026</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 4 Min. Lesezeit</span>
        </div>

        <img src={blogImage} alt="Samsung Galaxy S26" className="w-full rounded-lg mb-8 object-cover h-64 md:h-80" />

        <div className="prose prose-lg max-w-none">
          <p>
            Samsung hat mit dem Galaxy S26 wieder ein starkes Flaggschiff auf den Markt gebracht. Wer das Gerät jetzt mit einem Vodafone GigaMobil-Vertrag kauft, bekommt die Samsung Galaxy Buds4 kostenlos dazu — ein Mehrwert von über 100 Euro.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Das kann das Galaxy S26</h2>
          <p>Das Samsung Galaxy S26 setzt neue Maßstäbe im Premium-Smartphone-Segment:</p>
          <ul className="list-none pl-0 space-y-3 text-foreground">
            <li>📷 <strong>Verbesserte Kamera</strong> — noch bessere Nachtfotos und Videos</li>
            <li>⚡ <strong>Neuester Prozessor</strong> — maximale Performance für alle Aufgaben</li>
            <li>🔋 <strong>Starker Akku</strong> — ganztägige Nutzung ohne Laden</li>
            <li>📡 <strong>5G-fähig</strong> — perfekt für schnelle Vodafone 5G-Tarife</li>
            <li>🛡️ <strong>Galaxy AI</strong> — intelligente KI-Funktionen direkt im Gerät</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Die aktuelle Aktion — Galaxy Buds4 gratis</h2>
          <p>
            Bei Abschluss eines Vodafone GigaMobil-Vertrags (M bis XL oder GigaMobil Young M bis XL) zusammen mit dem Samsung Galaxy S26 erhalten Sie die Galaxy Buds4 kostenlos dazu. So funktioniert es:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-foreground">
            <li>Galaxy S26 mit GigaMobil-Tarif bei NextPhones kaufen</li>
            <li>Bis zum Aktionsdatum auf der Aktionsseite registrieren</li>
            <li>Galaxy Buds4 werden kostenlos per Post geliefert</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Wertgarantie — Ihr Schutz für das neue Handy</h2>
          <p>
            Ein Missgeschick passiert schnell. Mit der Wertgarantie von NextPhones ist Ihr neues Galaxy S26 gegen Schäden, Defekte und Diebstahl abgesichert. Einfach beim Kauf dazubuchen — faire Preise, unkomplizierte Abwicklung.
          </p>

          <div className="my-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link to="/beratung">Jetzt Galaxy S26 anfragen</Link>
            </Button>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
            <p className="text-foreground m-0">
              📦 <strong>Aktion:</strong> Galaxy Buds4 gratis beim Kauf des Galaxy S26 mit Vodafone GigaMobil-Tarif. Nur solange der Vorrat reicht — jetzt in einem unserer Standorte sichern!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamsungGalaxyS26;
