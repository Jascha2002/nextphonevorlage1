import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wifi, Smartphone, Wrench, Radio, Phone, Briefcase } from "lucide-react";

const services = [
  { icon: Wifi, title: "DSL & Festnetz", desc: "Schnelles Internet und Telefon für Ihr Zuhause – mit den besten Tarifen der Region." },
  { icon: Smartphone, title: "Mobilfunk", desc: "Verträge, Prepaid und Hardware – wir finden den passenden Tarif für Sie." },
  { icon: Wrench, title: "Handyservice", desc: "Display-Reparatur, Datensicherung und mehr – schnell und professionell." },
  { icon: Radio, title: "WLAN-Einrichtung", desc: "Optimale WLAN-Abdeckung in Ihrem Zuhause oder Büro." },
  { icon: Phone, title: "VoIP-Telefonie", desc: "Moderne Telefonlösungen für Unternehmen mit Placetel & Co." },
  { icon: Briefcase, title: "Geschäftskunden", desc: "Rahmenverträge, Flottenmanagement und individuelle Lösungen." },
];

const ServicesSection = () => {
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
            Unsere Leistungen
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Von DSL bis Geschäftskunden — wir sind Ihr kompetenter Partner für alle Telekommunikationsthemen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/leistungen"
                className="block bg-card rounded-lg p-6 border-t-2 border-brand-red shadow-sm hover:shadow-md service-card-glow transition-all h-full"
              >
                <service.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
