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

        {/* Map with all 5 locations */}
        <div className="rounded-lg overflow-hidden shadow-md mb-10">
          <iframe
            title="NextPhones Standorte Übersicht"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d320000!2d11.3!3d50.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUxJzAwLjAiTiAxMcKwMTgnMDAuMCJF!5e0!3m2!1sde!2sde!4v1!5m2!1sde!2sde&q=Meyfartstr.+19+99084+Erfurt|Goldgasse+9+99510+Apolda|Straßburger+Platz+5+99427+Weimar|Wiesestr.+63+07548+Gera|Christian-Schmidt-Str.+12+07545+Gera"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
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
