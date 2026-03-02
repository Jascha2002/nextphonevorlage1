const Barrierefreiheit = () => {
  const today = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Erklärung zur Barrierefreiheit</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p>
            NextPhones ist bemüht, seine Website barrierefrei zugänglich zu gestalten. Diese Erklärung zur Barrierefreiheit gilt für www.nextphones.de
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Stand der Vereinbarkeit mit den Anforderungen</h2>
          <p>
            Diese Website ist mit dem Barrierefreiheitsstärkungsgesetz (BFSG) und den WCAG 2.1 Anforderungen auf Stufe AA weitgehend vereinbar.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Nicht barrierefreie Inhalte</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Eingebettete Google Maps Karten sind teilweise nicht vollständig mit Screenreadern bedienbar</li>
            <li>Einige ältere PDF-Dokumente sind möglicherweise nicht barrierefrei</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Feedback und Kontakt</h2>
          <p>
            Wenn Sie auf Barrieren stoßen, kontaktieren Sie uns:
          </p>
          <p>
            E-Mail: <a href="mailto:info@nextphones.de" className="text-primary hover:underline">info@nextphones.de</a><br />
            Telefon: <a href="tel:03615188706" className="text-primary hover:underline">0361 5188706</a>
          </p>
          <p>Wir bemühen uns, Ihnen innerhalb von 5 Werktagen zu antworten.</p>

          <p className="text-xs text-muted-foreground mt-8">Diese Erklärung wurde zuletzt überprüft am: {today}</p>
        </div>
      </div>
    </div>
  );
};

export default Barrierefreiheit;
