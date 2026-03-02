import { Link } from "react-router-dom";

const Agb = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Allgemeine Geschäftsbedingungen</h1>

        <p className="text-sm text-muted-foreground mb-6 italic">
          Hinweis: Diese AGB sind ein Entwurf und müssen vor der Veröffentlichung von einem qualifizierten Rechtsanwalt geprüft werden.
        </p>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">§ 1 Geltungsbereich</h2>
          <p>
            Diese AGB gelten für alle Beratungsleistungen und Vertragsabschlüsse, die über die Website oder in unseren Filialen vermittelt werden.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">§ 2 Vertragsschluss</h2>
          <p>
            Beratungstermine und Anfragen über die Website stellen kein verbindliches Angebot dar. Ein Vertrag kommt erst durch persönliche Vereinbarung in einer unserer Filialen zustande.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">§ 3 Beratungsleistungen</h2>
          <p>
            Beratungsleistungen sind kostenlos und unverbindlich. NextPhones vermittelt Mobilfunk- und Festnetzverträge als autorisierter Partner der jeweiligen Netzbetreiber. Die Vertragsbedingungen der jeweiligen Anbieter gelten zusätzlich.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">§ 4 Datenschutz</h2>
          <p>
            Es gilt unsere{" "}
            <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">§ 5 Haftung</h2>
          <p>
            NextPhones haftet nicht für Inhalte externer verlinkter Websites. Für vermittelte Verträge gelten ausschließlich die AGB der jeweiligen Anbieter (Telekom, Vodafone etc.).
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">§ 6 Salvatorische Klausel</h2>
          <p>
            Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">§ 7 Anwendbares Recht</h2>
          <p>
            Es gilt deutsches Recht. Gerichtsstand ist Erfurt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Agb;
