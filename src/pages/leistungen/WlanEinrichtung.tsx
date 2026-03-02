import ServiceDetailLayout from "@/components/leistungen/ServiceDetailLayout";
import heroImage from "@/assets/hero-wlan.jpg";
import serviceWlan from "@/assets/service-wlan.jpg";

const WlanEinrichtung = () => (
  <ServiceDetailLayout
    title="WLAN-Einrichtung"
    subtitle="Die Geräte sind vorhanden und Du kannst es kaum abwarten im Internet zu surfen. Doch die Einrichtung ist komplizierter als gedacht? Wir richten Deinen DSL-Anschluss und WLAN-Router ein und konfigurieren Deine Telefonanlage vor Ort."
    heroImage={heroImage}
    sections={[
      {
        title: "Professionelle WLAN-Einrichtung",
        text: "Nicht jeder ist ein Technik-Experte – und das muss auch nicht sein. Unsere erfahrenen Techniker kommen zu Dir nach Hause oder ins Büro und richten Dein WLAN professionell ein. Wir sorgen dafür, dass Du in jedem Raum optimalen Empfang hast und sicher im Internet surfen kannst.",
        image: serviceWlan,
        imageAlt: "WLAN Router Einrichtung",
      },
      {
        title: "WLAN-Analyse und Optimierung",
        text: "Du hast bereits ein WLAN-Netzwerk, aber der Empfang ist nicht überall gut? Wir analysieren Dein Netzwerk, identifizieren Schwachstellen und optimieren die Abdeckung. Ob mit Repeatern, Mesh-Systemen oder einer besseren Platzierung des Routers – wir finden die ideale Lösung für Dich.",
      },
      {
        title: "Router-Konfiguration und Sicherheit",
        text: "Ein sicheres WLAN ist das A und O. Wir konfigurieren Deinen Router optimal, richten sichere Passwörter ein und aktivieren alle wichtigen Sicherheitsfunktionen. Auf Wunsch richten wir auch ein Gastnetzwerk ein und konfigurieren die Kindersicherung.",
      },
    ]}
  />
);

export default WlanEinrichtung;
