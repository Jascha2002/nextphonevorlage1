import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { RegionalData } from "@/data/regionalData";

interface Props {
  data: RegionalData;
}

const BadgeGroup = ({ label, items }: { label: string; items: string[] }) => (
  <div>
    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border-2 border-primary text-primary bg-card hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const RegionalServiceArea = ({ data }: Props) => (
  <section className="bg-secondary py-12">
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold text-primary">{data.headline}</h2>
      </div>
      <p className="text-muted-foreground mb-8 max-w-2xl">{data.subtext}</p>

      <div className="space-y-6 mb-8">
        <BadgeGroup label={data.stadtteile.label} items={data.stadtteile.items} />
        <BadgeGroup label={data.umgebung.label} items={data.umgebung.items} />
      </div>

      <p className="text-muted-foreground mb-6 max-w-2xl">{data.closingText}</p>

      <Link
        to="/beratung"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        {data.ctaLabel}
      </Link>

      {/* SEO-optimized hidden text for regional search indexing */}
      <p className="sr-only">
        {data.seoDescription} Stadtteile: {data.stadtteile.items.join(", ")}. Umgebung: {data.umgebung.items.join(", ")}.
      </p>
    </div>
  </section>
);

export default RegionalServiceArea;
