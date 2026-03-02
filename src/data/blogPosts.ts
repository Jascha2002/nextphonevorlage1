import blogVodafone from "@/assets/blog-vodafone-gigamobil.jpg";
import blogTelekom from "@/assets/blog-telekom-preiserhoehung.jpg";
import blogSamsung from "@/assets/blog-samsung-galaxy-s26.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  emoji: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "vodafone-gigamobil-rabatt",
    title: "Vodafone GigaMobil — jetzt mit bis zu 25% Rabatt sichern",
    excerpt:
      "Vodafone belohnt Neukunden aktuell mit attraktiven Rabatten auf alle GigaMobil-Tarife. Wir erklären wer profitiert und wie Sie das Angebot bei NextPhones sichern.",
    category: "Aktionen",
    date: "01. März 2026",
    readingTime: "3 Min. Lesezeit",
    emoji: "🎉",
    image: blogVodafone,
  },
  {
    slug: "telekom-preiserhoehung-optionen",
    title: "Telekom erhöht Preise — das können Bestandskunden jetzt tun",
    excerpt:
      "Die Telekom hat die Preise für viele Bestandskunden erhöht. Wir erklären welche Rechte Sie haben, ob ein Wechsel sich lohnt und wie Sie bis zu 600 Euro im Jahr sparen können.",
    category: "Tipps & Tricks",
    date: "15. Februar 2026",
    readingTime: "5 Min. Lesezeit",
    emoji: "💡",
    image: blogTelekom,
  },
  {
    slug: "samsung-galaxy-s26-angebot",
    title: "Samsung Galaxy S26 — jetzt mit Gratiszubehör bei Vodafone",
    excerpt:
      "Das neue Samsung Galaxy S26 ist da — und Vodafone legt aktuell die Galaxy Buds4 kostenlos dazu. Wir zeigen was das Flaggschiff kann und wie Sie das beste Angebot sichern.",
    category: "Smartphones",
    date: "01. Februar 2026",
    readingTime: "4 Min. Lesezeit",
    emoji: "📱",
    image: blogSamsung,
  },
];

export const blogCategories = ["Alle", "Tarife", "Smartphones", "Tipps & Tricks", "Aktionen"];
