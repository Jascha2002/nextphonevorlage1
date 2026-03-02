import { motion } from "framer-motion";

const stats = [
  { value: "5", label: "Standorte" },
  { value: "25", label: "Mitarbeiter" },
  { value: "120+", label: "Partner" },
  { value: "17.500+", label: "zufriedene Kunden" },
  { value: "15+", label: "Jahre Erfahrung" },
];

const StatsBar = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
