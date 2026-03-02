import ServiceDetailLayout from "@/components/leistungen/ServiceDetailLayout";
import heroImage from "@/assets/hero-dsl.jpg";
import serviceDsl from "@/assets/service-dsl.jpg";

const DslFestnetz = () => (
  <ServiceDetailLayout
    title="DSL & Festnetz"
    subtitle="Bei NextPhones erhältst Du das beste DSL & Festnetz Angebot, das zu Deinen Bedürfnissen passt. Damit Du mit Highspeed im besten Netz surfen kannst."
    heroImage={heroImage}
    sections={[
      {
        title: "Immer das beste Netz dank unseres Angebots",
        text: "Gerade bei DSL-Angeboten ist der Vergleich von unterschiedlichen Anbietern besonders wichtig. Schlussendlich kommt es auf den eigenen Bedarf an – und der ist von Kunde zu Kunde immer unterschiedlich. Außerdem bieten nicht alle DSL-Anbieter an allen Standorten das Netz zur gleichen Qualität an. Daher nehmen wir uns während der Beratung ausreichend Zeit für Dich und vergleichen unterschiedliche Angebote. So, dass Du am Ende das perfekte Angebot für Dich findest und sorgenlos mit Highspeed im Internet surfen kannst.",
        image: serviceDsl,
        imageAlt: "DSL & Festnetz Beratung",
      },
      {
        title: "Professionelle Einrichtung vor Ort",
        text: "Wir kümmern uns nicht nur um den passenden Tarif, sondern auch um die komplette Einrichtung Deines DSL-Anschlusses. Von der Router-Konfiguration über die Telefonie-Einrichtung bis hin zur optimalen WLAN-Abdeckung – unsere Experten kommen auf Wunsch direkt zu Dir nach Hause und richten alles professionell ein.",
      },
      {
        title: "Alle großen Anbieter im Vergleich",
        text: "Ob Telekom, Vodafone, o2 oder 1&1 – wir vergleichen die Tarife aller großen Anbieter und finden die optimale Lösung für Deinen Standort. Dabei berücksichtigen wir nicht nur den Preis, sondern auch die tatsächliche Verfügbarkeit und Leistung an Deiner Adresse. So bekommst Du garantiert das beste Angebot.",
      },
    ]}
  />
);

export default DslFestnetz;
