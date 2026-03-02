import { motion } from "framer-motion";

const FoerdermittelSection = () => {
  return (
    <section className="py-16 bg-surface-warm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <img
            src="/images/funding-logo.png"
            alt="Gefördert durch Freistaat Thüringen und ESF+"
            className="h-16 md:h-20"
          />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Gefördert durch den Freistaat Thüringen
            </h3>
            <p className="text-sm text-muted-foreground">
              NextPhones wird durch den Freistaat Thüringen und den Europäischen Sozialfonds Plus (ESF+) unterstützt und gefördert. Dies ermöglicht uns, qualitativ hochwertige Beratung und Dienstleistungen in der Region anzubieten.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoerdermittelSection;
