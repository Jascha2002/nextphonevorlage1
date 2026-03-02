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
}

export const locations: Location[] = [
  {
    slug: "erfurt",
    name: "NextPhones Erfurt",
    city: "Erfurt",
    address: "Meyfartstr. 19",
    zip: "99084 Erfurt",
    phone: "0361/5188706",
    mapQuery: "Meyfartstr.+19,+99084+Erfurt",
    hours: { weekday: "Mo–Fr 09:00–18:00", saturday: "Sa 10:00–14:00" },
  },
  {
    slug: "apolda",
    name: "NextPhones Apolda",
    city: "Apolda",
    address: "Goldgasse 9",
    zip: "99510 Apolda",
    phone: "03644/5189706",
    mapQuery: "Goldgasse+9,+99510+Apolda",
    hours: { weekday: "Mo–Fr 09:00–18:00", saturday: "Sa 10:00–14:00" },
  },
  {
    slug: "weimar",
    name: "NextPhones Weimar",
    city: "Weimar",
    address: "Straßburger Platz 5",
    zip: "99427 Weimar",
    phone: "03643/4899706",
    mapQuery: "Straßburger+Platz+5,+99427+Weimar",
    hours: { weekday: "Mo–Fr 09:00–18:00", saturday: "Sa 10:00–14:00" },
  },
  {
    slug: "gera-debschwitz",
    name: "NextPhones Gera Debschwitz",
    city: "Gera Debschwitz",
    address: "Wiesestr. 63",
    zip: "07548 Gera",
    phone: "0365/7109706",
    mapQuery: "Wiesestr.+63,+07548+Gera",
    hours: { weekday: "Mo–Fr 09:00–18:00", saturday: "Sa 10:00–14:00" },
  },
  {
    slug: "gera-zentrum",
    name: "NextPhones Gera Zentrum",
    city: "Gera Zentrum",
    address: "Christian-Schmidt-Str. 12",
    zip: "07545 Gera",
    phone: "0365/7739706",
    mapQuery: "Christian-Schmidt-Str.+12,+07545+Gera",
    hours: { weekday: "Mo–Fr 09:00–18:00", saturday: "Sa 10:00–14:00" },
  },
];
