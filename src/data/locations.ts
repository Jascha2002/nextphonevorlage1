export interface Location {
  slug: string;
  name: string;
  city: string;
  address: string;
  zip: string;
  phone: string;
  mapQuery: string;
  hours: {
    weekday: string;
    saturday: string;
  };
  contact: {
    name: string;
    role: string;
    quote: string;
  };
}

export const locations: Location[] = [
  {
    slug: "erfurt",
    name: "NextPhones Erfurt",
    city: "Erfurt",
    address: "Meyfartstr. 19",
    zip: "99084 Erfurt",
    phone: "0361 5188706",
    mapQuery: "Meyfartstr.+19,+99084+Erfurt",
    hours: { weekday: "Mo–Fr 09:00–18:00 Uhr", saturday: "Sa 10:00–14:00" },
    contact: {
      name: "Anne Hofmann",
      role: "Ansprechpartnerin",
      quote: "Sehr gerne berate ich Dich im NextPhones Erfurt, wenn es um DSL, Festnetz und Mobilfunk geht. Es ist mir besonders wichtig, dass Du als Kunde immer das ideale Angebot erhältst.",
    },
  },
  {
    slug: "apolda",
    name: "NextPhones Apolda",
    city: "Apolda",
    address: "Goldgasse 9",
    zip: "99510 Apolda",
    phone: "03644-514682",
    mapQuery: "Goldgasse+9,+99510+Apolda",
    hours: { weekday: "Mo–Fr 09:00–18:00 Uhr", saturday: "Sa 10:00–14:00" },
    contact: {
      name: "Rapha Biyik",
      role: "Ansprechpartnerin",
      quote: "Sehr gerne berate ich Dich im NextPhones Apolda, wenn es um DSL, Festnetz und Mobilfunk geht. Dabei spielt es keine Rolle, ob Du Privatkunde oder Geschäftskunde bist – wir haben für Dich die passende Lösung.",
    },
  },
  {
    slug: "weimar",
    name: "NextPhones Weimar",
    city: "Weimar",
    address: "Straßburger Platz 5",
    zip: "99427 Weimar",
    phone: "03643 7718001",
    mapQuery: "Straßburger+Platz+5,+99427+Weimar",
    hours: { weekday: "Mo–Fr 09:00–18:00 Uhr", saturday: "Sa 10:00–14:00" },
    contact: {
      name: "Marcel Stern",
      role: "Ansprechpartner",
      quote: "Sehr gerne berate ich Dich im NextPhones Weimar, wenn es um DSL, Festnetz und Mobilfunk geht. Wir haben für Dich immer die passende Lösung.",
    },
  },
  {
    slug: "gera-debschwitz",
    name: "NextPhones Gera Debschwitz",
    city: "Gera Debschwitz",
    address: "Wiesestr. 63",
    zip: "07548 Gera",
    phone: "0365 773 751 95",
    mapQuery: "Wiesestr.+63,+07548+Gera",
    hours: { weekday: "Mo–Fr 09:30–18:00 Uhr", saturday: "Sa 10:00–14:00" },
    contact: {
      name: "Daniel Hofmann & Marcus Elbel",
      role: "Ansprechpartner",
      quote: "Sehr gerne beraten wir Dich im NextPhones Gera, wenn es um DSL, Festnetz und Mobilfunk geht. Es ist uns besonders wichtig, dass Du als Kunde immer das ideale Angebot erhältst.",
    },
  },
  {
    slug: "gera-zentrum",
    name: "NextPhones Gera Zentrum",
    city: "Gera Zentrum",
    address: "Christian-Schmidt-Str. 12",
    zip: "07545 Gera",
    phone: "0365 773 729 23",
    mapQuery: "Christian-Schmidt-Str.+12,+07545+Gera",
    hours: { weekday: "Mo–Fr 09:30–18:00 Uhr", saturday: "Sa 10:00–14:00" },
    contact: {
      name: "Daniel Hofmann",
      role: "Ansprechpartner",
      quote: "Sehr gerne berate ich Dich im NextPhones Gera Zentrum, wenn es um DSL, Festnetz und Mobilfunk geht. Wir haben für Dich immer die passende Lösung.",
    },
  },
];
