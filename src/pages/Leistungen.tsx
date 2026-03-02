import { Link } from "react-router-dom";
import { Wifi, Smartphone, Wrench, Radio, Phone, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import serviceDsl from "@/assets/service-dsl.jpg";
import serviceMobilfunk from "@/assets/service-mobilfunk.jpg";
import serviceHandyservice from "@/assets/service-handyservice.jpg";
import serviceWlan from "@/assets/service-wlan.jpg";
import serviceVoip from "@/assets/service-voip.jpg";
import serviceBusiness from "@/assets/service-business.jpg";

const services = [
  { icon: Wifi, image: serviceDsl, title: "DSL & Festnetz", slug: "dsl-festnetz", desc: "Schnelles Internet und Telefon für Ihr Zuhause. Wir vergleichen die besten Tarife und finden die optimale Lösung für Sie." },
  { icon: Smartphone, image: serviceMobilfunk, title: "Mobilfunk", slug: "mobilfunk", desc: "Ob Vertrag oder Prepaid — wir finden den passenden Mobilfunktarif und das richtige Smartphone für Sie." },
  { icon: Wrench, image: serviceHandyservice, title: "Handyservice", slug: "handyservice", desc: "Display kaputt? Akku schwach? Unser professioneller Reparaturservice hilft schnell und zuverlässig." },
  { icon: Radio, image: serviceWlan, title: "WLAN-Einrichtung", slug: "wlan-einrichtung", desc: "Optimale WLAN-Abdeckung für Ihr Zuhause oder Büro. Wir analysieren und optimieren Ihr Netzwerk." },
  { icon: Phone, image: serviceVoip, title: "VoIP-Telefonie", slug: "voip-telefonie", desc: "Moderne Cloud-Telefonlösungen mit Placetel und anderen Anbietern für Ihr Unternehmen." },
  { icon: Briefcase, image: serviceBusiness, title: "Geschäftskunden", slug: "geschaeftskunden", desc: "Maßgeschneiderte Telekommunikationslösungen für Unternehmen — von Rahmenverträgen bis Flottenmanagement." },
];

const Leistungen = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Unsere Leistungen</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Kompetente Beratung und professioneller Service rund um Telekommunikation.
        </p>

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
                to={`/leistungen/${service.slug}`}
                className="block bg-card rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary shadow-sm hover:shadow-md service-card-glow transition-all h-full group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <h2 className="text-lg font-semibold text-card-foreground">{service.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                  <span className="inline-block mt-4 text-sm font-medium text-primary group-hover:underline">
                    Mehr erfahren →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/beratung"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Jetzt Beratung sichern
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leistungen;
