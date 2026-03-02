import { Link } from "react-router-dom";
import { Wifi, Smartphone, Wrench, Radio, Phone, Briefcase } from "lucide-react";

const services = [
  {
    icon: Wifi,
    title: "DSL & Festnetz",
    desc: "Schnelles Internet und Telefon für Ihr Zuhause. Wir vergleichen die besten Tarife und finden die optimale Lösung für Sie.",
    benefits: ["Tarifvergleich aller großen Anbieter", "Kostenlose Beratung vor Ort", "Installation und Einrichtung"],
  },
  {
    icon: Smartphone,
    title: "Mobilfunk",
    desc: "Ob Vertrag oder Prepaid — wir finden den passenden Mobilfunktarif und das richtige Smartphone für Sie.",
    benefits: ["Alle Netze und Tarife", "Smartphone-Beratung", "Zubehör und Schutz"],
  },
  {
    icon: Wrench,
    title: "Handyservice",
    desc: "Display kaputt? Akku schwach? Unser professioneller Reparaturservice hilft schnell und zuverlässig.",
    benefits: ["Display-Reparatur", "Akku-Tausch", "Datensicherung und -übertragung"],
  },
  {
    icon: Radio,
    title: "WLAN-Einrichtung",
    desc: "Optimale WLAN-Abdeckung für Ihr Zuhause oder Büro. Wir analysieren und optimieren Ihr Netzwerk.",
    benefits: ["WLAN-Analyse", "Router-Konfiguration", "Mesh-Systeme und Repeater"],
  },
  {
    icon: Phone,
    title: "VoIP-Telefonie",
    desc: "Moderne Cloud-Telefonlösungen mit Placetel und anderen Anbietern für Ihr Unternehmen.",
    benefits: ["Cloud-Telefonanlagen", "Placetel-Partner", "Individuelle Konfiguration"],
  },
  {
    icon: Briefcase,
    title: "Geschäftskunden",
    desc: "Maßgeschneiderte Telekommunikationslösungen für Unternehmen — von Rahmenverträgen bis Flottenmanagement.",
    benefits: ["Rahmenverträge", "Flottenmanagement", "Persönlicher Ansprechpartner"],
  },
];

const Leistungen = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Unsere Leistungen</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Kompetente Beratung und professioneller Service rund um Telekommunikation.
        </p>

        <div className="space-y-8">
          {services.map((service) => (
            <div key={service.title} className="bg-card rounded-lg p-8 border-l-4 border-brand-red shadow-sm">
              <div className="flex items-start gap-4">
                <service.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{service.title}</h2>
                  <p className="text-muted-foreground mb-4">{service.desc}</p>
                  <ul className="space-y-1.5">
                    {service.benefits.map((b) => (
                      <li key={b} className="text-sm text-foreground flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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
