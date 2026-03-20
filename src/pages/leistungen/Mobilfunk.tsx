import ServiceDetailLayout from "@/components/leistungen/ServiceDetailLayout";
import heroImage from "@/assets/hero-mobilfunk.jpg";
import serviceMobilfunk from "@/assets/service-mobilfunk.jpg";

const Mobilfunk = () => (
  <ServiceDetailLayout
    title="Mobilfunk"
    subtitle="Bei NextPhones erhältst Du das beste Mobilfunk-Angebot, das zu Deinen Bedürfnissen passt. Damit Du überall im besten Netz telefonieren kannst."
    heroImage={heroImage}
    seoTitle="Mobilfunk Beratung in Thüringen — NextPhones Erfurt, Weimar, Gera, Apolda"
    seoDescription="Mobilfunk-Tarife und Smartphone-Beratung bei NextPhones in Erfurt, Weimar, Gera und Apolda. Vertrag oder Prepaid – persönliche Beratung vor Ort."
    sections={[
      {
        title: "Immer das beste Netz dank unseres Angebots",
        text: "Gerade bei Mobilfunk-Angeboten ist der Vergleich von unterschiedlichen Anbietern besonders wichtig. Schlussendlich kommt es auf den eigenen Bedarf an – und der ist von Kunde zu Kunde immer unterschiedlich. Außerdem bieten nicht alle Mobilfunk-Anbieter an allen Standorten das Netz zur gleichen Qualität an. Daher nehmen wir uns während der Beratung ausreichend Zeit für Dich und vergleichen unterschiedliche Angebote. So, dass Du am Ende das perfekte Angebot für Dich findest und sorgenlos im besten Netz telefonieren kannst.",
        image: serviceMobilfunk,
        imageAlt: "Mobilfunk Beratung",
      },
      {
        title: "Smartphone-Beratung und Hardware",
        text: "Neben dem passenden Tarif beraten wir Dich auch bei der Wahl des richtigen Smartphones. Ob iPhone, Samsung Galaxy oder ein anderes Modell – wir finden das Gerät, das perfekt zu Dir passt. Dazu bieten wir passendes Zubehör wie Hüllen, Displayschutz und Ladegeräte.",
      },
      {
        title: "Vertrag oder Prepaid – Du entscheidest",
        text: "Nicht jeder braucht einen Vertrag. Deshalb bieten wir Dir auch flexible Prepaid-Lösungen an. Ob Vielsurfer, Wenigtelefonierer oder Geschäftskunde – wir finden die passende Option und erklären Dir alle Vor- und Nachteile transparent und ehrlich.",
      },
    ]}
  />
);

export default Mobilfunk;
