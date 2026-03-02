import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import blogImage from "@/assets/blog-vodafone-gigamobil.jpg";

const VodafoneGigaMobil = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Blog
        </Link>

        <Badge className="bg-primary text-primary-foreground mb-4">Aktionen</Badge>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Vodafone GigaMobil — jetzt mit bis zu 25% Rabatt
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 01. März 2026</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 3 Min. Lesezeit</span>
        </div>

        <img src={blogImage} alt="Vodafone GigaMobil Aktion" className="w-full rounded-lg mb-8 object-cover h-64 md:h-80" />

        <div className="prose prose-lg max-w-none">
          <p>
            Gute Neuigkeiten für alle die einen neuen Mobilfunkvertrag suchen: Vodafone bietet Neukunden aktuell einen Rabatt von bis zu 25 Prozent auf alle GigaMobil- und GigaMobil Young-Tarife — und das für die gesamte Laufzeit von 24 Monaten.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Wer profitiert von der Aktion?</h2>
          <p>
            Die Aktion richtet sich an Neukunden die einen GigaMobil-Vertrag mit 24 Monaten Mindestlaufzeit abschließen. Je nach Tarif gibt es unterschiedliche Rabattstufen:
          </p>

          <div className="my-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarif</TableHead>
                  <TableHead>Rabatt</TableHead>
                  <TableHead>Beispielpreis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>GigaMobil XS & S</TableCell><TableCell>20% Rabatt</TableCell><TableCell>24 Monate lang</TableCell></TableRow>
                <TableRow><TableCell>GigaMobil M bis XL</TableCell><TableCell>25% Rabatt</TableCell><TableCell>24 Monate lang</TableCell></TableRow>
                <TableRow><TableCell>GigaMobil Young XS & S</TableCell><TableCell>25% Rabatt</TableCell><TableCell>24 Monate lang</TableCell></TableRow>
                <TableRow><TableCell>GigaMobil Young M bis XL</TableCell><TableCell>30% Rabatt</TableCell><TableCell>24 Monate lang</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Was ist im Tarif enthalten?</h2>
          <p>
            Alle GigaMobil-Tarife beinhalten 5G-Highspeed, Allnet-Flat für Telefonate und SMS sowie verschiedene Datenpakete je nach Tarifstufe. Im GigaMobil M und L erhalten Neukunden aktuell sogar unbegrenztes Datenvolumen für die gesamte Vertragslaufzeit.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Jetzt bei NextPhones beraten lassen</h2>
          <p>
            Als autorisierter Vodafone-Vertriebspartner können Sie diese Aktion direkt in einem unserer 5 Standorte in Thüringen nutzen. Unsere Berater vergleichen alle verfügbaren Tarife und finden das beste Angebot für Ihre Bedürfnisse — kostenlos und unverbindlich.
          </p>

          <div className="my-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link to="/beratung">Jetzt Beratung sichern</Link>
            </Button>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
            <p className="text-foreground m-0">
              💡 <strong>Tipp:</strong> Die Aktion gilt für Bestellungen bei autorisierten Vodafone-Vertriebspartnern wie NextPhones. Lassen Sie sich persönlich beraten — wir vergleichen alle Anbieter für Sie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VodafoneGigaMobil;
