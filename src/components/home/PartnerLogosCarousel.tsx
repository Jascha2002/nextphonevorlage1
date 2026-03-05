import { Link } from "react-router-dom";

const partners = [
  "Telekom", "Vodafone", "o2", "1&1", "congstar",
  "freenet", "yourfone", "Sky", "Thüringer Netkom",
  "PYUR", "ay yildiz", "Wertgarantie",
];

const LogoItem = ({ name }: { name: string }) => (
  <div className="flex-shrink-0 mx-3">
    <div className="bg-white dark:bg-white/10 rounded-full px-6 py-3 shadow-sm flex items-center justify-center h-[56px] min-w-[140px]">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">{name}</span>
    </div>
  </div>
);

const InfiniteRow = ({ direction }: { direction: "left" | "right" }) => {
  const animClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  return (
    <div className="overflow-hidden group">
      <div className={`flex ${animClass} group-hover:[animation-play-state:paused]`}>
        {[...partners, ...partners, ...partners].map((p, i) => (
          <LogoItem key={`${p}-${i}`} name={p} />
        ))}
      </div>
    </div>
  );
};

const PartnerLogosCarousel = () => {
  return (
    <section className="py-[60px] bg-[#F5F5F5] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Unsere Vertriebspartner</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Über 120 Partner — wir finden den besten Tarif für Sie.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <InfiniteRow direction="left" />
        <InfiniteRow direction="right" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm mb-3">
          Und viele mehr — wir vergleichen alle großen Anbieter für Sie.
        </p>
        <Link
          to="/vertriebspartner"
          className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
        >
          Alle Partner ansehen →
        </Link>
      </div>
    </section>
  );
};

export default PartnerLogosCarousel;
