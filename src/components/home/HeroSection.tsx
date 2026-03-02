import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  "DSL & Festnetz",
  "Mobilfunk",
  "Handyservice",
  "WLAN-Einrichtung",
  "VoIP",
  "Geschäftskunden",
];

const HeroSection = () => {
  const tickerText = services.join(" · ") + " · ";

  return (
    <section className="relative h-screen flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/team-photo-1.jpeg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground mb-4"
          >
            NextPhones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-2xl text-primary-foreground/90 mb-8"
          >
            Dein Telefonladen in der Region
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/standorte"
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Standort finden
            </Link>
            <Link
              to="/beratung"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              Beratung sichern
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative bg-foreground/80 py-3 overflow-hidden">
        <div className="animate-ticker whitespace-nowrap flex">
          <span className="text-primary-foreground text-sm font-medium tracking-wide">
            {tickerText}{tickerText}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
