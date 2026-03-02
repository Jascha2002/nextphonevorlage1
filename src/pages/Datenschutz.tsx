const Datenschutz = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-sm max-w-none text-foreground">
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Allgemeine Hinweise</h3>
          <p className="text-muted-foreground">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">2. Datenerfassung auf unserer Website</h2>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
          <p className="text-muted-foreground">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Wie erfassen wir Ihre Daten?</h3>
          <p className="text-muted-foreground">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">3. Kontakt</h2>
          <p className="text-muted-foreground">
            NextPhones<br />
            Meyfartstr. 19<br />
            99084 Erfurt<br />
            Telefon: 0361/5188706<br />
            E-Mail: info@nextphones.de
          </p>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
