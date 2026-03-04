export interface VorOrtData {
  servicegebiete: string[];
  phone: string;
  phoneTel: string;
}

export const vorOrtServices = [
  {
    icon: "Wifi",
    title: "WLAN Einrichtung",
    text: "Wir kommen direkt zu dir und richten dein WLAN professionell ein — egal ob Wohnung, Haus oder Büro. Optimale Reichweite und sichere Verbindung garantiert.",
  },
  {
    icon: "Wrench",
    title: "Router & Modem Installation",
    text: "Neuer DSL- oder Glasfaseranschluss? Wir installieren und konfigurieren deinen Router bei dir zu Hause — komplett und betriebsbereit.",
  },
  {
    icon: "Network",
    title: "Netzwerk & Smart Home",
    text: "Vom Heimnetzwerk bis zur Smart Home Einrichtung — wir konfigurieren alle Geräte bei dir vor Ort und sorgen für reibungslose Verbindungen.",
  },
  {
    icon: "Smartphone",
    title: "Handy & Tablet Einrichtung",
    text: "Neues Smartphone oder Tablet? Wir kommen zu dir und richten dein Gerät komplett ein — Apps, Kontakte, E-Mail, alles übertragen.",
  },
  {
    icon: "Phone",
    title: "Festnetz & VoIP Installation",
    text: "Wir installieren und konfigurieren dein Festnetz oder VoIP-System direkt bei dir zu Hause oder in deinem Unternehmen.",
  },
  {
    icon: "Building2",
    title: "Geschäftskunden Service",
    text: "Für Unternehmen kommen wir direkt in Ihre Räumlichkeiten — Netzwerk, Telefonie, Internet und Mobilfunk für Ihr gesamtes Team.",
  },
];

export const vorOrtData: Record<string, VorOrtData> = {
  erfurt: {
    servicegebiete: [
      "Erfurt", "Ilversgehofen", "Andreasvorstadt", "Daberstedt",
      "Löbervorstadt", "Krämpfervorstadt", "Gotha", "Sömmerda",
      "Arnstadt", "Weimar", "Nordhausen", "Mühlhausen",
    ],
    phone: "0361 5188706",
    phoneTel: "tel:+493615188706",
  },
  apolda: {
    servicegebiete: [
      "Apolda", "Bad Sulza", "Bad Berka", "Blankenhain",
      "Kapellendorf", "Niederroßla", "Magdala",
      "Jena", "Weimar", "Naumburg", "Kranichfeld",
    ],
    phone: "03644-514682",
    phoneTel: "tel:+4936445146820",
  },
  weimar: {
    servicegebiete: [
      "Weimar", "Schöndorf", "Nordvorstadt", "Westvorstadt",
      "Tröbsdorf", "Gaberndorf", "Legefeld",
      "Apolda", "Bad Berka", "Kranichfeld", "Blankenhain",
      "Magdala", "Nohra", "Mellingen",
    ],
    phone: "03643 7718001",
    phoneTel: "tel:+4936437718001",
  },
  "gera-debschwitz": {
    servicegebiete: [
      "Gera", "Lusan", "Debschwitz", "Bieblach",
      "Untermhaus", "Tinz", "Leumnitz", "Zwötzen",
      "Ronneburg", "Greiz", "Zeulenroda-Triebes",
      "Eisenberg", "Bad Köstritz", "Hermsdorf",
    ],
    phone: "0365 773 751 95",
    phoneTel: "tel:+4936577375195",
  },
  "gera-zentrum": {
    servicegebiete: [
      "Gera Zentrum", "Innenstadt", "Lusan", "Bieblach",
      "Untermhaus", "Tinz", "Leumnitz", "Pforten",
      "Ronneburg", "Greiz", "Bad Köstritz",
      "Zeulenroda-Triebes", "Hermsdorf", "Eisenberg",
    ],
    phone: "0365 773 729 23",
    phoneTel: "tel:+4936577372923",
  },
};
