import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const StromCheckTeaser = () => {
  return (
    <section className="py-20 bg-surface-warm">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Kostenloser Stromtarif-Check
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Prüfen Sie jetzt Ihren aktuellen Tarif kostenfrei und entdecken Sie Ihr Sparpotenzial.
          </p>
          <Link
            to="/strom-check"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Jetzt prüfen
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StromCheckTeaser;
