import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { locations } from "@/data/locations";

const StandortePreview = () => {
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
            Unsere Standorte
          </h2>
          <p className="text-muted-foreground">5× in Thüringen für Sie da</p>
        </motion.div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden shadow-md mb-10">
          <iframe
            title="NextPhones Standorte"
            src="https://maps.google.com/maps?q=Meyfartstr.+19,+99084+Erfurt&t=&z=8&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            className="w-full"
          />
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/standorte/${loc.slug}`}
                className="block bg-card rounded-lg p-5 border shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">{loc.city}</h3>
                <p className="text-xs text-muted-foreground mb-3">{loc.address}, {loc.zip}</p>
                <span className="text-xs font-medium text-primary">Zum Standort →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandortePreview;
