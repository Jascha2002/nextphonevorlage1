import { Link } from "react-router-dom";
import { locations } from "@/data/locations";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onOpenCookieSettings?: () => void;
}

const Footer = ({ onOpenCookieSettings }: FooterProps) => {
  return (
    <footer className="bg-brand-dark text-secondary border-t-2 border-brand-red" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Contact */}
          <div>
            <img src="/images/footer-logo.png" alt="NextPhones" className="h-10 mb-4" />
            <p className="text-sm text-muted-foreground mb-3">Dein Telefonladen in der Region</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Meyfartstr. 19, 99084 Erfurt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:03615188706" className="hover:text-primary transition-colors">0361 5188706</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@nextphones.de" className="hover:text-primary transition-colors">info@nextphones.de</a>
              </div>
            </div>
          </div>

          {/* Standorte */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Standorte</h4>
            <ul className="space-y-2 text-sm">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link to={`/standorte/${loc.slug}`} className="text-muted-foreground hover:text-primary transition-colors">{loc.city}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Leistungen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["DSL & Festnetz", "Mobilfunk", "Handyservice", "WLAN-Einrichtung", "VoIP-Telefonie", "Geschäftskunden"].map((s) => (
                <li key={s}>
                  <Link to="/leistungen" className="hover:text-primary transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches & Öffnungszeiten */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li><Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link></li>
              <li><Link to="/agb" className="hover:text-primary transition-colors">AGB</Link></li>
              <li><Link to="/barrierefreiheit" className="hover:text-primary transition-colors">Barrierefreiheit</Link></li>
              <li>
                <button onClick={onOpenCookieSettings} className="hover:text-primary transition-colors text-left">
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
            <h4 className="font-semibold mb-2 text-primary-foreground text-sm">Öffnungszeiten</h4>
            <p className="text-sm text-muted-foreground">Mo–Fr 09:00–18:00</p>
            <p className="text-sm text-muted-foreground">Sa 10:00–14:00</p>
          </div>
        </div>

        {/* Funding logo */}
        <div className="mt-10 pt-6 border-t border-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/images/funding-logo.png" alt="Gefördert durch Freistaat Thüringen" className="h-20 md:h-24" />
          <p className="text-xs text-muted-foreground">© 2025 NextPhones | Alle Preise inkl. MwSt.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
