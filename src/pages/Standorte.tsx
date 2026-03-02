import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { locations } from "@/data/locations";

const Standorte = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Unsere Standorte</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          5× in Thüringen für Sie da — besuchen Sie uns vor Ort.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              to={`/standorte/${loc.slug}`}
              className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <MapPin className="h-6 w-6 text-primary mb-3" />
              <h2 className="text-xl font-semibold text-foreground mb-2">{loc.city}</h2>
              <p className="text-sm text-muted-foreground mb-1">{loc.address}</p>
              <p className="text-sm text-muted-foreground mb-1">{loc.zip}</p>
              <p className="text-sm text-muted-foreground mb-3">{loc.phone}</p>
              <p className="text-xs text-muted-foreground">{loc.hours.weekday}</p>
              <p className="text-xs text-muted-foreground mb-4">{loc.hours.saturday}</p>
              <span className="text-sm font-medium text-primary">Zum Standort →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Standorte;
