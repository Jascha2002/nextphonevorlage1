import { Link } from "react-router-dom";
import { MapPin, Phone, Wifi, Wrench, Network, Smartphone, Phone as PhoneIcon, Building2 } from "lucide-react";
import { VorOrtData, vorOrtServices } from "@/data/vorOrtData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi, Wrench, Network, Smartphone, Phone: PhoneIcon, Building2,
};

interface Props {
  data: VorOrtData;
}

const VorOrtServiceSection = ({ data }: Props) => (
  <section className="bg-[hsl(var(--primary)/0.05)] border-l-4 border-primary py-12">
    <div className="container mx-auto px-4">
      {/* Headline */}
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
        Wir kommen zu dir 📍
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Du musst nicht immer zu uns kommen — für folgende Leistungen kommen wir direkt zu dir nach Hause oder ins Büro.
      </p>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {vorOrtServices.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <div
              key={service.title}
              className="bg-card rounded-lg border border-border border-t-4 border-t-primary p-5 space-y-2"
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-5 w-5 text-primary" />}
                <h3 className="font-semibold text-foreground text-sm">{service.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.text}</p>
            </div>
          );
        })}
      </div>

      {/* Servicegebiete */}
      <h3 className="text-lg font-bold text-foreground mb-2">Unsere Vor-Ort Servicegebiete</h3>
      <p className="text-sm text-muted-foreground mb-4">Wir kommen zu dir in folgende Orte:</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {data.servicegebiete.map((ort) => (
          <span
            key={ort}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border-2 border-primary text-primary bg-card hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
          >
            {ort}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-card rounded-lg border border-border p-5 max-w-2xl">
        <div className="flex items-start gap-3 mb-4">
          <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Vor-Ort Termin anfragen</span> — wir melden uns innerhalb von 24 Stunden und vereinbaren einen passenden Termin bei dir.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/beratung"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <MapPin className="h-4 w-4" />
            Vor-Ort Termin anfragen
          </Link>
          <a
            href={data.phoneTel}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            Standort anrufen
          </a>
        </div>
      </div>

      {/* SEO hidden text */}
      <p className="sr-only">
        NextPhones Vor-Ort Service in: {data.servicegebiete.join(", ")}. WLAN Einrichtung, Router Installation, Netzwerk, Smart Home, Handy Einrichtung, Festnetz und VoIP Installation, Geschäftskunden Service.
      </p>
    </div>
  </section>
);

export default VorOrtServiceSection;
