import { Link } from "react-router-dom";
import { Shuffle, User, ShieldCheck } from "lucide-react";

const partners = [
  { name: "Telekom", headline: "Starke Netze, starke Leistung", text: "Die Telekom steht für höchste Netzqualität, ausgezeichnete Verfügbarkeit und modernste Kommunikationstechnologien – sowohl für Privat- als auch für Geschäftskunden. Mit leistungsstarken Mobilfunk- und Festnetztarifen, 5G-Highspeed und erstklassigem Service bietet die Telekom beste Verbindung in jeder Situation – zuverlässig und sicher." },
  { name: "congstar", headline: "Flexibel, fair, unkompliziert", subheadline: "Weil einfach, einfach besser ist", text: "congstar steht für faire Preise, volle Flexibilität und beste D-Netz-Qualität – ideal für alle, die Wert auf Leistung ohne Vertragsbindung legen. Mit transparenten Tarifen, LTE/5G-Geschwindigkeit und einer klaren Preisstruktur bietet congstar Mobilfunk für moderne Ansprüche – einfach, zuverlässig und ohne Schnickschnack." },
  { name: "Vodafone", headline: "Schnell, stark, zuverlässig", text: "Mit modernster 5G-Technologie, hoher Netzstabilität und flächendeckender Abdeckung bietet Vodafone Kommunikation auf höchstem Niveau. Ob privat oder geschäftlich – die leistungsstarken Tarife überzeugen durch Qualität und Geschwindigkeit." },
  { name: "1&1", headline: "Zwei Zahlen, ein starkes Netz", text: "Innovativ, schnell und zuverlässig: 1&1 bietet Internet- und Mobilfunktarife, die überzeugen. Egal ob Zuhause oder unterwegs – mit starker Netzqualität und exzellentem Service bleibt man überall verbunden." },
  { name: "o2", headline: "Grenzenlos verbunden", text: "Starke Netzleistung, moderne 5G-Technologie und attraktive Konditionen – das ist o2. Der Anbieter steht für digitale Freiheit und flexible Tariflösungen für jeden Bedarf." },
  { name: "Freenet", headline: "Flexibel. Freenet. Mobilfunk ohne Kompromisse", text: "Freenet bietet flexible Mobilfunklösungen mit starker Netzqualität und transparenten Preisen – ideal für alle die Wert auf Freiheit ohne Einschränkungen legen." },
  { name: "yourfone", headline: "Dein Leben. Dein Tarif. Dein yourfone.", text: "Mit klaren Tarifen, starker LTE-Technologie und attraktiven Preisen richtet sich yourfone an alle, die einfache und faire Mobilfunklösungen bevorzugen." },
  { name: "Sky", headline: "Himmel voller Highlights – mit Sky erleben!", text: "Ob Film, Serie oder Sport: Sky macht Unterhaltung zum Erlebnis. Mit flexiblen Abo-Modellen und modernster Streaming-Technologie genießen Zuschauer beste Qualität auf jedem Gerät." },
  { name: "Thüringer Netkom", headline: "Heimat verbindet – Internet aus Thüringen", text: "Regional, schnell und zuverlässig: Thüringer Netkom bringt modernes Internet und stabile Telefonie direkt aus der Heimat. Mit persönlichem Service und starker Infrastruktur sorgt das Unternehmen für echte Verbindungen in der Region." },
  { name: "PYUR", headline: "Ganz schön PYUR – klares Netz, klare Preise", text: "Mit schnellem Internet, fairem Fernsehen und transparenter Preisgestaltung überzeugt Pyur deutschlandweit. Kunden genießen stabile Verbindungen ohne versteckte Kosten." },
  { name: "ay yildiz", headline: "Mobilfunk mit Herz", text: "ay yildiz bietet attraktive Mobilfunktarife mit starker Netzqualität und mehrsprachigem Service – ideal für alle die Wert auf persönliche Betreuung legen." },
  { name: "Strom & Gas", headline: "Strom & Gas ohne Stress", text: "NextPhones findet für seine Kunden die besten Strom- und Gastarife – individuell, transparent und auf die persönliche Situation zugeschnitten. Dank starker Energiepartner profitieren Kunden von fairen Preisen und kompetenter Beratung." },
  { name: "Wertgarantie", headline: "Schutz, der sich lohnt", text: "Ein Missgeschick ist schnell passiert – gut wenn Wertgarantie schützt. Ob Smartphone, Tablet oder Laptop: Schäden, Defekte und Diebstahl sind mit wenigen Klicks abgesichert." },
];

const fpeItems = [
  { icon: Shuffle, title: "FLEXIBEL", text: "Wir passen uns Deinen Wünschen an und vergleichen unterschiedliche Anbieter für das passende Angebot." },
  { icon: User, title: "PERSÖNLICH", text: "Ein persönlicher Ansprechpartner vor Ort ist Gold wert – keine langen Warteschleifen, kein ständig wechselnder Kontakt." },
  { icon: ShieldCheck, title: "EHRLICH", text: "Klarheit statt böse Überraschungen – das schätzen unsere Kunden besonders an unserer Beratung." },
];

const Vertriebspartner = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Unsere Vertriebspartner</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Gemeinsam stark — wir arbeiten mit den besten Partnern der Branche zusammen.
        </p>

        {/* Partner logos image */}
        <div className="flex justify-center mb-12">
          <img
            src="/images/provider-logos.png"
            alt="NextPhones Partner und Anbieter"
            className="max-w-2xl w-full"
          />
        </div>

        {/* Partner cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {partners.map((p) => (
            <div key={p.name} className="bg-card rounded-lg border shadow-sm p-6 flex flex-col service-card-glow transition-shadow">
              <h2 className="text-xl font-bold text-foreground mb-1">{p.name}</h2>
              <h3 className="text-sm font-semibold text-primary mb-1">{p.headline}</h3>
              {"subheadline" in p && p.subheadline && (
                <p className="text-xs text-muted-foreground italic mb-2">{p.subheadline}</p>
              )}
              <p className="text-sm text-muted-foreground flex-1 mb-4">{p.text}</p>
              <Link
                to="/beratung"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Beratung sichern
              </Link>
            </div>
          ))}
        </div>

        {/* F-P-E Section */}
        <div className="bg-surface-warm rounded-lg p-10 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Seit Jahren bewährt sich unser F-P-E System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fpeItems.map((item) => (
              <div key={item.title} className="text-center">
                <item.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vertriebspartner;
