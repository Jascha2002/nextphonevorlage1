import { motion } from "framer-motion";
import { Check } from "lucide-react";

const usps = [
  "Ehrliche Beratung ohne böse Überraschungen",
  "Persönlicher Ansprechpartner vor Ort",
  "Flexible Anbieter, Preise und Leistungen",
  "Über 15 Jahre Erfahrung in der Region",
];

const WhyNextPhones = () => {
  return (
    <section className="py-20 bg-surface-warm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Warum NextPhones?
            </h2>
            <p className="text-muted-foreground mb-8">
              Seit über 15 Jahren sind wir Ihr vertrauensvoller Partner für
              Telekommunikation in Thüringen. Unsere ehrliche Beratung und
              persönlicher Service machen den Unterschied.
            </p>
            <ul className="space-y-4">
              {usps.map((usp) => (
                <li key={usp} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{usp}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/consultation.jpeg"
              alt="NextPhones Beratung"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyNextPhones;
