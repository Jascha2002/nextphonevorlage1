import ServiceDetailLayout from "@/components/leistungen/ServiceDetailLayout";
import heroImage from "@/assets/hero-voip.jpg";
import serviceVoip from "@/assets/service-voip.jpg";

const VoipTelefonie = () => (
  <ServiceDetailLayout
    title="VoIP-Telefonanlagen"
    subtitle="Bei NextPhones erhältst Du als Geschäftskunde die ideale VoIP-Telefonanlagen-Lösung. Lass Dich unverbindlich beraten und lerne alle Vorteile der IP-Telefonie kennen."
    heroImage={heroImage}
    sections={[
      {
        title: "Die ideale IP-Telefonie-Lösung dank unseres Angebots",
        text: "Eine VoIP-Telefonanlage nutzt das Internet, um Sprach- und Videoanrufe zu übermitteln. Eine ideale Lösung spart Dir nicht nur Kosten, sondern bietet Dir maximale Flexibilität. Während der Beratung nehmen wir uns ausreichend Zeit für Dich und vergleichen unterschiedliche Lösungen. So, dass Du am Ende das perfekte Angebot für die VoIP-Telefonie erhältst.",
        image: serviceVoip,
        imageAlt: "VoIP Telefonie",
      },
      {
        title: "Placetel – Die Cloud Telefonanlage",
        text: "Placetel bietet die perfekte Kommunikationslösung für jeden Anspruch – egal ob im Homeoffice, Büro oder mobil. Dabei handelt es sich um eine softwarebasierte Telefonie-Lösung, bei der alle Telefonanlagen-Funktionen im Rechenzentrum eines Providers gehostet und über das Internet mittels VoIP bereitgestellt werden. Lass Dich von unseren erfahrenen NextPhones-Beratern an allen Standorten ausführlich beraten.",
      },
      {
        title: "Maximale Flexibilität für Dein Unternehmen",
        text: "Mit einer VoIP-Telefonanlage bist Du nicht mehr an einen festen Standort gebunden. Deine Mitarbeiter können von überall aus telefonieren – ob im Büro, im Homeoffice oder unterwegs. Rufnummern, Weiterleitungen und Konferenzen lassen sich einfach über eine Weboberfläche verwalten.",
      },
    ]}
  />
);

export default VoipTelefonie;
