import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { locations } from "@/data/locations";
import { regionalData } from "@/data/regionalData";
import { vorOrtData } from "@/data/vorOrtData";
import RegionalServiceArea from "@/components/standort/RegionalServiceArea";
import VorOrtServiceSection from "@/components/standort/VorOrtServiceSection";
import { MapPin, Phone, Clock, Navigation, User, Briefcase, Users, Building2 } from "lucide-react";

const services = [
  { icon: User, label: "Privatkunden", desc: "DSL, Mobilfunk, Handyservice & mehr" },
  { icon: Briefcase, label: "Geschäftskunden", desc: "Rahmenverträge, VoIP & IT-Lösungen" },
  { icon: Users, label: "Vertriebspartner", desc: "Telekom, Vodafone, 1&1, congstar & mehr" },
];

const StandortDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((l) => l.slug === slug);
  const region = slug ? regionalData[slug] : undefined;
  const vorOrt = slug ? vorOrtData[slug] : undefined;

  useEffect(() => {
    if (region) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", region.seoDescription);
      } else {
        const tag = document.createElement("meta");
        tag.name = "description";
        tag.content = region.seoDescription;
        document.head.appendChild(tag);
      }
    }
  }, [region]);

  if (!location) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Standort nicht gefunden</h1>
        <Link to="/standorte" className="text-primary hover:underline">Alle Standorte anzeigen</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">{location.name}</h1>
          <p className="text-primary-foreground/80 mb-6">{location.address}, {location.zip}</p>
          <Link
            to="/beratung"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Beratung sichern
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 border shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Adresse</p>
                  <p className="text-sm text-muted-foreground">{location.address}, {location.zip}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Telefon</p>
                  <a href={`tel:${location.phone.replace(/[\s\-\/]/g, "")}`} className="text-sm text-primary hover:underline">{location.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Öffnungszeiten</p>
                  <p className="text-sm text-muted-foreground">{location.hours.weekday}</p>
                  <p className="text-sm text-muted-foreground">{location.hours.saturday}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Navigation className="h-4 w-4" />
                Route planen
              </a>
            </div>

            {/* Contact person */}
            <div className="bg-surface-warm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{location.contact.name}</p>
                  <p className="text-xs text-muted-foreground">{location.contact.role}</p>
                </div>
              </div>
              <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary pl-4">
                "{location.contact.quote}"
              </blockquote>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Unsere Leistungen</h2>
              <div className="space-y-3">
                {services.map((s) => (
                  <div key={s.label} className="flex items-start gap-3 bg-card rounded-lg p-4 border">
                    <s.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider logos */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Unsere Partner</h2>
              <img src="/images/provider-logos.png" alt="NextPhones Partner" className="w-full" />
            </div>
          </div>

          {/* Map */}
          <div className="space-y-8">
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                title={location.name}
                src={`https://maps.google.com/maps?q=${location.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full"
              />
            </div>

            {/* CTA */}
            <Link
              to="/beratung"
              className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Jetzt Beratung sichern
            </Link>
          </div>
        </div>
      </div>

      {/* Regional service area */}
      {region && <RegionalServiceArea data={region} />}

      {/* Vor-Ort Service */}
      {vorOrt && <VorOrtServiceSection data={vorOrt} />}
    </div>
  );
};

export default StandortDetail;
