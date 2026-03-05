export interface PaketData {
  id: string;
  badge: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  coreServices: string[];
  optionalServices: string[];
  price: string;
  priceNote: string;
  detailDescription: string;
  detailExample: string;
  detailNotes: string;
}

export const pakete: PaketData[] = [
  {
    id: 'neu-hier',
    badge: 'Beliebt',
    title: 'Neu hier',
    subtitle: 'Perfekt für alle die neu in die Stadt ziehen',
    coreServices: [
      'DSL oder Glasfaser Internet',
      'Mobilfunk Vertrag',
      'Persönliche Einrichtung vor Ort',
      'Ein Ansprechpartner für alles',
    ],
    optionalServices: ['Tablet nach Wahl', 'Smart TV / Streaming Paket'],
    price: 'Ab 59€ / Monat',
    priceNote: '*Tablet/TV optional gegen Aufpreis',
    detailDescription: 'Das „Neu hier" Paket ist ideal für alle, die gerade in eine neue Stadt gezogen sind und alles auf einmal einrichten möchten — Internet, Mobilfunk und optional Tablet oder TV.',
    detailExample: 'Beispiel: Vodafone DSL 100 (29,99€/mtl.) + Telekom MagentaMobil S (29,95€/mtl.) = ab 59,94€/mtl.',
    detailNotes: 'Vertragslaufzeiten können je nach Anbieter zwischen 12 und 24 Monaten variieren. Einrichtung vor Ort ist bei allen NextPhones Paketen inklusive.',
  },
  {
    id: 'digital-starter',
    badge: 'Für Schüler & Studenten',
    title: 'Digital Starter',
    subtitle: 'Alles was du für Schule, Studium und Freizeit brauchst',
    coreServices: [
      'Smartphone nach Wahl',
      'Mobilfunk Vertrag mit viel Datenvolumen',
      'Persönliche Einrichtung & Beratung',
      'Wertgarantie Geräteschutz inklusive',
    ],
    optionalServices: ['Tablet nach Wahl', 'Smart TV / Streaming Paket'],
    price: 'Ab 39€ / Monat',
    priceNote: '*Tablet/TV optional gegen Aufpreis',
    detailDescription: 'Perfekt für Schüler und Studenten: Ein Smartphone mit passendem Tarif, persönliche Einrichtung und Geräteschutz — alles in einem Paket.',
    detailExample: 'Beispiel: Samsung Galaxy A55 + Vodafone Smart L (30GB) = ab 39,99€/mtl. inkl. Wertgarantie.',
    detailNotes: 'Smartphone-Zuzahlung je nach Gerätemodell. Geräteschutz gilt ab dem ersten Tag.',
  },
  {
    id: 'familie-komplett',
    badge: 'Bestseller',
    badgeColor: 'bg-orange-500',
    title: 'Familie Komplett',
    subtitle: 'Internet und Mobilfunk für die ganze Familie',
    coreServices: [
      'DSL oder Glasfaser Internet',
      'Bis zu 4 Mobilfunk Verträge',
      'Gemeinsame Beratung vor Ort',
      'Familientarife mit Rabatt',
    ],
    optionalServices: ['Tablet für jedes Familienmitglied', 'Smart TV / Streaming Paket (Sky etc.)'],
    price: 'Ab 99€ / Monat',
    priceNote: '*Tablet/TV optional gegen Aufpreis',
    detailDescription: 'Das Rundum-Paket für Familien: Ein Internet-Anschluss und bis zu 4 Mobilfunkverträge mit Familienrabatt — alles aus einer Hand.',
    detailExample: 'Beispiel: Telekom DSL (39,95€) + 3× MagentaMobil S Family (je 19,95€) = ab 99,80€/mtl.',
    detailNotes: 'Familienrabatte gelten bei Buchung von 2+ Mobilfunkverträgen. Unterschiedliche Laufzeiten möglich.',
  },
  {
    id: 'home-office',
    badge: 'Für Selbstständige',
    title: 'Home Office',
    subtitle: 'Alles für produktives Arbeiten von zu Hause',
    coreServices: [
      'Schnelles DSL oder Glasfaser',
      'Mobilfunk Vertrag',
      'VoIP Festnetz Lösung',
      'Persönliche Einrichtung vor Ort',
    ],
    optionalServices: ['Tablet oder Laptop nach Wahl', 'Smart TV / Streaming Paket'],
    price: 'Ab 79€ / Monat',
    priceNote: '*Tablet/TV optional gegen Aufpreis',
    detailDescription: 'Für Selbstständige und Home-Office-Arbeiter: Schnelles Internet, VoIP-Telefonie und Mobilfunk — professionell eingerichtet.',
    detailExample: 'Beispiel: Glasfaser 250 (44,95€) + Mobilfunk (24,95€) + VoIP (9,95€) = ab 79,85€/mtl.',
    detailNotes: 'VoIP-Lösung inkl. Rufnummernmitnahme. Geschäftskunden-Konditionen auf Anfrage.',
  },
  {
    id: 'mobility-bundle',
    badge: 'Urban & Mobil',
    title: 'Mobility Bundle',
    subtitle: 'Mobilfunk und Mobilität — für alle die unterwegs sind',
    coreServices: [
      'Mobilfunk Vertrag mit viel Datenvolumen',
      'E-Scooter Vermittlung über Partner',
      'Persönliche Beratung vor Ort',
      'Flexible Laufzeiten',
    ],
    optionalServices: ['Tablet nach Wahl', 'Smart TV / Streaming Paket'],
    price: 'Ab 29€ / Monat',
    priceNote: '*E-Scooter wird über Partnerbetriebe vermittelt | Tablet/TV optional',
    detailDescription: 'Für urbane, mobile Menschen: Mobilfunk mit viel Datenvolumen plus E-Scooter-Vermittlung über unsere Partnerbetriebe.',
    detailExample: 'Beispiel: Vodafone Smart M (15GB) ab 29,99€/mtl. + E-Scooter über Partnerbetrieb (separate Vereinbarung).',
    detailNotes: 'E-Scooter ist eine Partnervermittlung, kein NextPhones-Produkt. Separate Vereinbarung mit dem Partnerbetrieb.',
  },
  {
    id: 'entertainment',
    badge: 'Für Unterhaltung',
    title: 'Entertainment',
    subtitle: 'Internet, Mobilfunk und die beste Unterhaltung',
    coreServices: [
      'DSL oder Glasfaser Internet',
      'Mobilfunk Vertrag',
      'Sky oder Streaming Paket',
      'Persönliche Einrichtung',
    ],
    optionalServices: ['Tablet nach Wahl', 'Zusätzliche Mobilfunk Verträge'],
    price: 'Ab 69€ / Monat',
    priceNote: '*Tablet optional gegen Aufpreis',
    detailDescription: 'Für Entertainment-Fans: Internet, Mobilfunk und dein Lieblings-Streaming-Paket — alles zusammen, alles eingerichtet.',
    detailExample: 'Beispiel: DSL 100 (29,99€) + Mobilfunk (24,95€) + Sky Entertainment (14,99€) = ab 69,93€/mtl.',
    detailNotes: 'Streaming-Pakete (Sky, Netflix etc.) haben eigene Vertragslaufzeiten. Kombiangebote auf Anfrage.',
  },
];

export const komponenten = [
  { id: 'mobilfunk', label: 'Mobilfunk + Smartphone', sub: 'Vertrag + Wunschhandy' },
  { id: 'internet', label: 'Internet (DSL/Glasfaser)', sub: 'Für zu Hause' },
  { id: 'tablet', label: 'Tablet', sub: 'Optional dazu', badge: 'Optional' },
  { id: 'tv', label: 'TV & Streaming', sub: 'Sky, Netflix & Co.', badge: 'Optional' },
  { id: 'festnetz', label: 'Festnetz / VoIP', sub: 'Für Zuhause oder Büro' },
  { id: 'escooter', label: 'E-Scooter', sub: 'Über Partnerbetrieb', badge: 'Partneranfrage' },
  { id: 'geraeteschutz', label: 'Geräteschutz', sub: 'Wertgarantie für deine Geräte' },
  { id: 'alles', label: 'Alles inklusive', sub: 'Ich möchte eine Komplettlösung' },
];

export const priceMap: Record<string, number> = {
  mobilfunk: 15,
  internet: 20,
  tablet: 10,
  tv: 15,
  festnetz: 10,
  escooter: 0,
  geraeteschutz: 5,
};
