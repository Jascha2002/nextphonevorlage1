import ServiceDetailLayout from "@/components/leistungen/ServiceDetailLayout";
import heroImage from "@/assets/hero-geschaeftskunden.jpg";
import serviceBusiness from "@/assets/service-business.jpg";

const Geschaeftskunden = () => (
  <ServiceDetailLayout
    title="Geschäftskunden"
    subtitle="Individuelle Rahmenverträge – mit zugeschnittenen Leistungen zu Business-Konditionen."
    heroImage={heroImage}
    seoTitle="Geschäftskunden Lösungen in Thüringen — NextPhones Erfurt, Weimar, Gera, Apolda"
    seoDescription="Business-Tarife und Rahmenverträge für Geschäftskunden bei NextPhones in Erfurt, Weimar, Gera und Apolda. Flottenmanagement und persönlicher Ansprechpartner."
    sections={[
      {
        title: "Zugeschnittene Leistungen dank unserer Rahmenverträge",
        text: "Als Geschäftskunde kannst Du Rahmenvertragskunde werden und von individuellen und zugeschnittenen Leistungen profitieren. Dabei spielt es keine Rolle, ob Du ein kleines oder großes Unternehmen hast – Du erhältst das passende Angebot zu besonders günstigen Business-Konditionen. Nimm jetzt Kontakt mit Deinem NextPhones vor Ort auf und lass Dich unverbindlich beraten.",
        image: serviceBusiness,
        imageAlt: "Geschäftskunden Beratung",
      },
      {
        title: "Flottenmanagement für Unternehmen",
        text: "Du verwaltest eine große Anzahl an Mobilfunkverträgen und Geräten? Mit unserem Flottenmanagement behältst Du jederzeit den Überblick. Wir kümmern uns um Vertragsverwaltung, Geräte-Rollouts und den Support für Deine Mitarbeiter – alles aus einer Hand.",
      },
      {
        title: "Persönlicher Ansprechpartner",
        text: "Als Geschäftskunde bei NextPhones erhältst Du einen festen Ansprechpartner, der Deine Anforderungen kennt und sich um alle Belange kümmert. Schnelle Reaktionszeiten und individuelle Betreuung sind für uns selbstverständlich.",
      },
    ]}
  />
);

export default Geschaeftskunden;
