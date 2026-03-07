import { Link } from "react-router-dom";
import { locations } from "@/data/locations";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onOpenCookieSettings?: () => void;
}

const Footer = ({ onOpenCookieSettings }: FooterProps) => {
  return (
    <footer className="bg-brand-dark text-white border-t-2 border-brand-red" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Contact */}
          <div>
            <img src="/images/footer-logo.png" alt="NextPhones" className="h-10 mb-4" />
            <p className="text-sm text-white/70 mb-3">Dein Telefonladen in der Region</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-white/80">Meyfartstr. 19, 99084 Erfurt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:03615188706" className="text-white/80 hover:text-primary transition-colors">0361 5188706</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@nextphones.de" className="text-white/80 hover:text-primary transition-colors">info@nextphones.de</a>
              </div>
            </div>
          </div>

          {/* Standorte */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Standorte</h4>
            <ul className="space-y-2 text-sm">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link to={`/standorte/${loc.slug}`} className="text-white/70 hover:text-primary transition-colors">{loc.city}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Leistungen</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {["DSL & Festnetz", "Mobilfunk", "Handyservice", "WLAN-Einrichtung", "VoIP-Telefonie", "Geschäftskunden"].map((s) => (
                <li key={s}>
                  <Link to="/leistungen" className="hover:text-primary transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches & Öffnungszeiten */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-white/70 mb-6">
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
            <h4 className="font-semibold mb-2 text-white text-sm">Öffnungszeiten</h4>
            <p className="text-sm text-white/70">Mo–Fr 09:00–18:00</p>
            <p className="text-sm text-white/70">Sa 10:00–14:00</p>
          </div>
        </div>

        {/* Funding logo */}
        <div className="mt-10 pt-6 border-t border-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/images/funding-logo.png" alt="Gefördert durch Freistaat Thüringen" className="h-20 md:h-24" />
          <p className="text-xs text-white/50">© 2025 NextPhones | Alle Preise inkl. MwSt.</p>
        </div>

        {/* DeutLicht credit */}
        <div
          className="mt-3 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-center">
            <a
              href="https://www.deutlicht.de"
              target="_blank"
              rel="noopener noreferrer"
              className="deutlicht-footer-credit"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E30613";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Designed &amp; developed by DeutLicht®
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
