const Impressum = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Impressum</h1>

        <p className="text-sm text-muted-foreground mb-2 italic">
          Hinweis: Die Platzhalter [in Klammern] müssen vor Veröffentlichung ausgefüllt werden.
        </p>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">Angaben gemäß § 5 TMG</h2>
          <p>
            NextPhones<br />
            [Vollständige Firmenbezeichnung]<br />
            Meyfartstr. 19<br />
            99084 Erfurt
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">Kontakt</h2>
          <p>
            Telefon: 0361 5188706<br />
            E-Mail: info@nextphones.de
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            [Name des Verantwortlichen]<br />
            Meyfartstr. 19<br />
            99084 Erfurt
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
