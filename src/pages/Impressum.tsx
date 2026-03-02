const Impressum = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Impressum</h1>

        <div className="prose prose-sm max-w-none text-foreground">
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Angaben gemäß § 5 TMG</h2>
          <p className="text-muted-foreground">
            NextPhones<br />
            Meyfartstr. 19<br />
            99084 Erfurt
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Kontakt</h2>
          <p className="text-muted-foreground">
            Telefon: 0361/5188706<br />
            E-Mail: info@nextphones.de
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Haftungsausschluss</h2>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Haftung für Inhalte</h3>
          <p className="text-muted-foreground">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Haftung für Links</h3>
          <p className="text-muted-foreground">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Urheberrecht</h3>
          <p className="text-muted-foreground">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
