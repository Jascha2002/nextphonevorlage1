import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import StatsBar from "@/components/home/StatsBar";

interface ServiceSection {
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
}

interface ServiceDetailLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  sections: ServiceSection[];
}

const ServiceDetailLayout = ({ title, subtitle, heroImage, sections }: ServiceDetailLayoutProps) => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[340px] md:h-[420px] overflow-hidden">
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-3"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary/5 py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <Link
            to="/beratung"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Beratung sichern
          </Link>
        </div>
      </div>

      <StatsBar />

      {/* Content sections */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                {section.image && (
                  <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={section.image}
                      alt={section.imageAlt || section.title}
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={section.image ? "w-full md:w-1/2" : "w-full max-w-3xl mx-auto"}>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/beratung"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Beratung sichern
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailLayout;
