export interface RegionalData {
  headline: string;
  subtext: string;
  stadtteile: { label: string; items: string[] };
  umgebung: { label: string; items: string[] };
  closingText: string;
  ctaLabel: string;
  seoDescription: string;
}

export const regionalData: Record<string, RegionalData> = {
  erfurt: {
    headline: "NextPhones Erfurt — Dein Store für die gesamte Region",
    subtext: "Du kommst nicht aus der Erfurter Innenstadt? Kein Problem — wir sind gut erreichbar und beraten Kunden aus der gesamten Region.",
    stadtteile: {
      label: "Stadtteile Erfurt",
      items: ["Ilversgehofen", "Andreasvorstadt", "Krämpfervorstadt", "Daberstedt", "Löbervorstadt", "Brühlervorstadt", "Erfurt-Nord", "Erfurt-Südost", "Herrenberg", "Wiesenhügel", "Melchendorf", "Ringelberg"],
    },
    umgebung: {
      label: "Umgebung & Pendlerstädte",
      items: ["Gotha", "Sömmerda", "Arnstadt", "Weimar", "Bad Berka", "Neudietendorf", "Amt Wachsenburg"],
    },
    closingText: "Egal ob du aus Ilversgehofen, Gotha oder Sömmerda kommst — NextPhones Erfurt ist gut mit Bus und Bahn erreichbar. Vereinbare jetzt einen Termin.",
    ctaLabel: "Beratung in Erfurt sichern",
    seoDescription: "NextPhones Erfurt — Ihr Telekom und Vodafone Partner in Erfurt, Ilversgehofen, Daberstedt, Gotha, Sömmerda, Arnstadt und der gesamten Region.",
  },
  apolda: {
    headline: "NextPhones Apolda — Im Herzen des Weimarer Landes",
    subtext: "Zentral gelegen zwischen Weimar, Jena und Naumburg — NextPhones Apolda ist die ideale Anlaufstelle für die gesamte Region.",
    stadtteile: {
      label: "Stadtteile & direkte Umgebung",
      items: ["Bad Sulza", "Bad Berka", "Blankenhain", "Kapellendorf", "Niederroßla", "Magdala", "Ilmtal-Weinstraße", "Großheringen", "Kranichfeld", "Hohenfelden"],
    },
    umgebung: {
      label: "Größere Städte im Einzugsgebiet",
      items: ["Jena", "Weimar", "Naumburg", "Buttstädt", "Camburg"],
    },
    closingText: "Du wohnst in Bad Sulza, Blankenhain oder einer der umliegenden Gemeinden? NextPhones Apolda liegt direkt an der Bahnlinie Erfurt–Jena und ist schnell erreichbar.",
    ctaLabel: "Beratung in Apolda sichern",
    seoDescription: "NextPhones Apolda — Ihr Telekom und Vodafone Partner in Apolda, Bad Sulza, Blankenhain, Jena, Weimar und dem gesamten Weimarer Land.",
  },
  weimar: {
    headline: "NextPhones Weimar — Dein Ansprechpartner in der Klassikerstadt",
    subtext: "Wir beraten Kunden aus Weimar und der gesamten Umgebung — persönlich, ehrlich und ohne böse Überraschungen.",
    stadtteile: {
      label: "Stadtteile Weimar",
      items: ["Schöndorf", "Nordvorstadt", "Westvorstadt", "Südstadt", "Tröbsdorf", "Gaberndorf", "Legefeld", "Niedergrunstedt", "Possendorf", "Taubach"],
    },
    umgebung: {
      label: "Umgebung",
      items: ["Apolda", "Bad Berka", "Kranichfeld", "Blankenhain", "Magdala", "Nohra", "Mellingen", "Umpferstedt"],
    },
    closingText: "Ob du aus Schöndorf, Bad Berka oder Kranichfeld kommst — NextPhones Weimar ist dein persönlicher Ansprechpartner für Mobilfunk, DSL und Handyservice in der Region.",
    ctaLabel: "Beratung in Weimar sichern",
    seoDescription: "NextPhones Weimar — Ihr Telekom und Vodafone Partner in Weimar, Schöndorf, Apolda, Bad Berka, Kranichfeld und der gesamten Region.",
  },
  "gera-debschwitz": {
    headline: "NextPhones Gera Debschwitz — Direkt an der Wiesestraße",
    subtext: "Gut erreichbar für alle Geraer Stadtteile und die gesamte Ostthüringer Region.",
    stadtteile: {
      label: "Stadtteile Gera",
      items: ["Lusan", "Debschwitz", "Bieblach", "Bieblach-Ost", "Untermhaus", "Tinz", "Leumnitz", "Zwötzen", "Pforten", "Langenberg", "Zeulsdorf", "Röppisch", "Liebschwitz", "Cretzschwitz"],
    },
    umgebung: {
      label: "Umgebung Ostthüringen",
      items: ["Ronneburg", "Greiz", "Bad Köstritz", "Hermsdorf", "Eisenberg", "Weida", "Berga/Elster", "Münchenbernsdorf", "Wünschendorf"],
    },
    closingText: "Du wohnst in Lusan, Bieblach oder kommst aus Ronneburg oder Greiz? Unser Store an der Wiesestraße ist dein nächster NextPhones Anlaufpunkt in Ostthüringen.",
    ctaLabel: "Beratung in Gera sichern",
    seoDescription: "NextPhones Gera Debschwitz — Ihr Telekom und Vodafone Partner in Gera, Lusan, Bieblach, Ronneburg, Greiz und der gesamten Ostthüringer Region.",
  },
  "gera-zentrum": {
    headline: "NextPhones Gera Zentrum — Mitten in der Stadt",
    subtext: "Direkt im Zentrum Geras — ideal erreichbar für alle Stadtteile und die umliegende Region.",
    stadtteile: {
      label: "Stadtteile Gera",
      items: ["Innenstadt", "Ostviertel", "Lusan", "Untermhaus", "Bieblach", "Tinz", "Leumnitz", "Pforten", "Zwötzen", "Debschwitz", "Langenberg"],
    },
    umgebung: {
      label: "Umgebung",
      items: ["Ronneburg", "Greiz", "Bad Köstritz", "Hermsdorf", "Eisenberg", "Weida", "Berga/Elster", "Münchenbernsdorf", "Wünschendorf"],
    },
    closingText: "Als zentraler Standort in der Geraer Innenstadt sind wir der ideale Ansprechpartner — ob du aus dem Stadtgebiet oder aus der Umgebung zu uns kommst.",
    ctaLabel: "Beratung in Gera Zentrum sichern",
    seoDescription: "NextPhones Gera Zentrum — Ihr Telekom und Vodafone Partner in Gera, Innenstadt, Lusan, Ronneburg, Greiz und der gesamten Ostthüringer Region.",
  },
};
