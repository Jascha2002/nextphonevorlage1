const Vertriebspartner = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Unsere Vertriebspartner</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Gemeinsam stark — wir arbeiten mit den besten Partnern der Branche zusammen.
        </p>

        <div className="flex justify-center mb-12">
          <img
            src="/images/provider-logos.png"
            alt="NextPhones Partner und Anbieter"
            className="max-w-2xl w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-card rounded-lg p-6 border shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-3">yourfone</h2>
            <p className="text-sm text-muted-foreground">
              Günstige Mobilfunktarife im Netz von Telefónica — mit attraktiven Smartphones und flexiblen Vertragslaufzeiten.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-3">1&1</h2>
            <p className="text-sm text-muted-foreground">
              DSL, Glasfaser und Mobilfunk aus einer Hand — mit starkem Service und fairen Preisen.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-surface-warm rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-4 text-center">Vorteile für Vertriebspartner</h2>
          <ul className="space-y-2 text-sm text-muted-foreground max-w-lg mx-auto">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              Starkes regionales Netzwerk mit 5 Standorten
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              Über 17.500 zufriedene Kunden
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              Engagiertes und geschultes Team
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              Langjährige Erfahrung in der Telekommunikation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Vertriebspartner;
