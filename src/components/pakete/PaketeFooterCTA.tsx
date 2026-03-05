import { Link } from 'react-router-dom';

export default function PaketeFooterCTA() {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">NOCH FRAGEN ZU DEN PAKETEN?</h2>
        <p className="text-white/80 text-lg mb-8">Ruf uns einfach an — wir beraten dich kostenlos.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:03615188706" className="px-8 py-3.5 bg-white text-foreground font-semibold rounded-lg hover:bg-white/90 transition-colors">
            📞 0361 5188706
          </a>
          <Link to="/beratung" className="px-8 py-3.5 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-black transition-colors">
            Beratung buchen
          </Link>
        </div>
      </div>
    </section>
  );
}
