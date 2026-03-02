import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "Carola Knoll", text: "Super Beratung und sehr freundliches Team. Habe genau den Tarif bekommen, den ich brauchte. Vielen Dank!", rating: 5 },
  { name: "Volker Grünfeld", text: "Kompetent, schnell und fair. Mein Handy wurde innerhalb eines Tages repariert. Top Service!", rating: 5 },
  { name: "Luise Hammermeister", text: "Endlich ein Laden, wo man ehrlich beraten wird. Kein Kleingedrucktes, keine bösen Überraschungen.", rating: 5 },
  { name: "Benjamin Hoffmann", text: "Habe meinen DSL-Vertrag über NextPhones abgeschlossen. Alles reibungslos und schnell. Empfehle ich gerne weiter!", rating: 5 },
  { name: "Lilly Sue Kaufmann", text: "Das Team ist super nett und hilfsbereit. Mein neues Smartphone wurde perfekt eingerichtet.", rating: 5 },
  { name: "Niklas Kämmerer", text: "Professionelle Beratung für unsere Firma. Die VoIP-Lösung funktioniert einwandfrei. Danke NextPhones!", rating: 5 },
];

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);
  const visibleCount = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  const visible = [];
  for (let i = 0; i < Math.min(visibleCount, reviews.length); i++) {
    visible.push(reviews[(current + i) % reviews.length]);
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Kundenbewertungen
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Basierend auf Google Bewertungen</p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((review) => (
              <div
                key={review.name}
                className="bg-card rounded-lg p-6 shadow-sm border"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "{review.text}"
                </p>
                <p className="text-sm font-semibold text-foreground">{review.name}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border hover:bg-secondary transition-colors"
              aria-label="Vorherige"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full border hover:bg-secondary transition-colors"
              aria-label="Nächste"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
