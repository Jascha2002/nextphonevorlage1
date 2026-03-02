import { ExternalLink } from "lucide-react";

const Partnershop = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground mb-3">Partnershop</h1>
        <p className="text-muted-foreground mb-8">
          Besuchen Sie unseren Online-Partnershop für Smartphones, Tarife und Zubehör.
        </p>
        <a
          href="https://www.handytick.de/?refid=456613"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <ExternalLink className="h-4 w-4" />
          Zum Partnershop
        </a>
      </div>
    </div>
  );
};

export default Partnershop;
