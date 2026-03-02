import { Link } from "react-router-dom";

const sections = [
  { id: "verantwortlicher", label: "1. Verantwortlicher" },
  { id: "daten", label: "2. Welche Daten wir erheben" },
  { id: "zweck", label: "3. Zweck der Datenverarbeitung" },
  { id: "rechtsgrundlagen", label: "4. Rechtsgrundlagen" },
  { id: "cookies", label: "5. Cookies" },
  { id: "maps", label: "6. Google Maps" },
  { id: "kontaktformular", label: "7. Kontaktformular & Buchungen" },
  { id: "speicherdauer", label: "8. Speicherdauer" },
  { id: "rechte", label: "9. Ihre Rechte" },
  { id: "aenderungen", label: "10. Änderungen dieser Erklärung" },
];

const Datenschutz = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>

        <p className="text-sm text-muted-foreground mb-2 italic">
          Hinweis: Diese Datenschutzerklärung ist ein Entwurf und muss vor der Veröffentlichung von einem qualifizierten Rechtsanwalt geprüft werden.
        </p>

        {/* TOC */}
        <nav aria-label="Inhaltsverzeichnis" className="bg-secondary rounded-lg p-5 mb-10">
          <h2 className="text-sm font-bold text-foreground mb-3">Inhaltsverzeichnis</h2>
          <ol className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-primary hover:underline">{s.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-8">
          <section id="verantwortlicher">
            <h2 className="text-xl font-semibold text-primary mb-3">1. Verantwortlicher</h2>
            <p>NextPhones<br />Meyfartstr. 19<br />99084 Erfurt<br />Telefon: 0361 5188706<br />E-Mail: info@nextphones.de</p>
          </section>

          <section id="daten">
            <h2 className="text-xl font-semibold text-primary mb-3">2. Welche Daten wir erheben</h2>
            <p>Bei der Nutzung unserer Website werden folgende Daten verarbeitet:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kontaktformular:</strong> Name, E-Mail, Telefon, Nachricht</li>
              <li><strong>Terminbuchung:</strong> Name, E-Mail, Telefon, gewünschter Standort, Anliegen</li>
              <li><strong>Server-Logfiles:</strong> IP-Adresse, Browser, Betriebssystem, Zeitstempel</li>
              <li><strong>Cookies:</strong> siehe Abschnitt Cookies</li>
            </ul>
          </section>

          <section id="zweck">
            <h2 className="text-xl font-semibold text-primary mb-3">3. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bearbeitung Ihrer Anfragen und Terminbuchungen</li>
              <li>Verbesserung unserer Website (Analyse)</li>
              <li>Kommunikation mit Kunden</li>
            </ul>
          </section>

          <section id="rechtsgrundlagen">
            <h2 className="text-xl font-semibold text-primary mb-3">4. Rechtsgrundlagen</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vertragserfüllung:</strong> Art. 6 Abs. 1 lit. b DSGVO</li>
              <li><strong>Einwilligung:</strong> Art. 6 Abs. 1 lit. a DSGVO</li>
              <li><strong>Berechtigtes Interesse:</strong> Art. 6 Abs. 1 lit. f DSGVO</li>
            </ul>
          </section>

          <section id="cookies">
            <h2 className="text-xl font-semibold text-primary mb-3">5. Cookies</h2>
            <p>Wir verwenden folgende Cookie-Kategorien:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Technisch notwendige Cookies:</strong> Kein Banner erforderlich</li>
              <li><strong>Analyse-Cookies (Google Analytics):</strong> Nur nach Einwilligung</li>
              <li><strong>Marketing-Cookies:</strong> Nur nach Einwilligung</li>
            </ul>
            <p className="mt-2">
              Sie können Ihre Cookie-Einwilligung jederzeit über den „Cookie-Einstellungen" Link im Footer widerrufen.
            </p>
          </section>

          <section id="maps">
            <h2 className="text-xl font-semibold text-primary mb-3">6. Google Maps</h2>
            <p>
              Wir binden Google Maps auf unserer Website ein. Anbieter: Google Ireland Limited, Gordon House, Dublin 4, Irland. 
              Datenschutzerklärung Google:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://policies.google.com/privacy
              </a>
            </p>
          </section>

          <section id="kontaktformular">
            <h2 className="text-xl font-semibold text-primary mb-3">7. Kontaktformular & Buchungen</h2>
            <p>
              Daten aus Kontaktformularen und Buchungsanfragen werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nach Abschluss der Bearbeitung gelöscht.
            </p>
          </section>

          <section id="speicherdauer">
            <h2 className="text-xl font-semibold text-primary mb-3">8. Speicherdauer</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kontaktanfragen: 3 Jahre nach Abschluss</li>
              <li>Server-Logfiles: 7 Tage</li>
              <li>Analyse-Cookies: 2 Jahre</li>
              <li>Buchungsdaten: gesetzliche Aufbewahrungsfristen</li>
            </ul>
          </section>

          <section id="rechte">
            <h2 className="text-xl font-semibold text-primary mb-3">9. Ihre Rechte</h2>
            <p>Sie haben folgende Rechte:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch (Art. 21 DSGVO)</li>
              <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Zur Ausübung Ihrer Rechte wenden Sie sich an: <a href="mailto:info@nextphones.de" className="text-primary hover:underline">info@nextphones.de</a>
            </p>
            <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.</p>
          </section>

          <section id="aenderungen">
            <h2 className="text-xl font-semibold text-primary mb-3">10. Änderungen dieser Erklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
