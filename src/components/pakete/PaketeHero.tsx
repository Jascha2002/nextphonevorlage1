import { motion } from 'framer-motion';

interface Props {
  onScrollKonfigurator: () => void;
  onScrollPakete: () => void;
}

export default function PaketeHero({ onScrollKonfigurator, onScrollPakete }: Props) {
  return (
    <section className="bg-[#1A1A1A] py-24 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-medium mb-6"
        >
          Kombi-Pakete
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="text-white">ALLES AUS EINER HAND.</span>
          <br />
          <span className="text-primary">EIN PAKET. EIN ANSPRECHPARTNER.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Kombiniere Mobilfunk, Internet, TV, Tablet und mehr — persönlich zusammengestellt von deinem NextPhones Team vor Ort.
          <br />
          Günstiger als einzeln. Einfacher als überall.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={onScrollKonfigurator} className="px-8 py-3.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Paket zusammenstellen
          </button>
          <button onClick={onScrollPakete} className="px-8 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
            Fertige Pakete ansehen
          </button>
        </motion.div>
      </div>
    </section>
  );
}
