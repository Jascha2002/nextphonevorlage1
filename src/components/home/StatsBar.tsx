import { motion } from "framer-motion";

const stats = [
  { value: "5", label: "Standorte" },
  { value: "25", label: "Mitarbeiter" },
  { value: "17.500+", label: "Kunden" },
  { value: "15+", label: "Jahre Erfahrung" },
];

const StatsBar = () => {
  return (
    <section className="bg-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-black text-primary-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/80 mt-1">
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
