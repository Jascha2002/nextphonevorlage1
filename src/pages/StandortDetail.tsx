import { useParams, Link } from "react-router-dom";
import { locations } from "@/data/locations";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const StandortDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((l) => l.slug === slug);

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
          <p className="text-primary-foreground/80">{location.address}, {location.zip}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div>
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
                  <a href={`tel:${location.phone.replace("/", "")}`} className="text-sm text-primary hover:underline">{location.phone}</a>
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

            <div className="mt-8">
              <Link
                to="/beratung"
                className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Beratung buchen
              </Link>
            </div>
          </div>

          {/* Map */}
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
        </div>
      </div>
    </div>
  );
};

export default StandortDetail;
