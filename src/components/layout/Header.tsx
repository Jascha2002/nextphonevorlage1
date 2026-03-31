import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { locations } from "@/data/locations";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLink {
  label: string;
  path: string;
  external?: boolean;
  children?: { label: string; path: string }[];
}

const navLinks: NavLink[] = [
  { label: "Startseite", path: "/" },
  {
    label: "Standorte",
    path: "/standorte",
    children: locations.map((l) => ({
      label: l.city,
      path: `/standorte/${l.slug}`,
    })),
  },
  {
    label: "Leistungen",
    path: "/leistungen",
    children: [
      { label: "DSL & Festnetz", path: "/leistungen/dsl-festnetz" },
      { label: "Mobilfunk", path: "/leistungen/mobilfunk" },
      { label: "Handyservice", path: "/leistungen/handyservice" },
      { label: "WLAN-Einrichtung", path: "/leistungen/wlan-einrichtung" },
      { label: "VoIP-Telefonie", path: "/leistungen/voip-telefonie" },
      { label: "Geschäftskunden", path: "/leistungen/geschaeftskunden" },
    ],
  },
  { label: "Pakete", path: "/pakete" },
  { label: "Vertriebspartner", path: "/vertriebspartner" },
  { label: "Partnershop", path: "https://www.handytick.de/?refid=456613", external: true },
  { label: "Karriere", path: "/karriere" },
  { label: "Team", path: "/team" },
  { label: "Blog", path: "/blog" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/images/nextphones-logo.png");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const applyLogoForTheme = () => {
      const isDark = root.classList.contains("dark");

      if (!isDark) {
        setLogoSrc("/images/nextphones-logo.png");
        return;
      }

      const img = new Image();
      img.src = "/images/nextphones-logo.png";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          const isNearBlack = r <= 70 && g <= 70 && b <= 70;
          if (a > 0 && isNearBlack) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setLogoSrc(canvas.toDataURL("image/png"));
      };
    };

    applyLogoForTheme();

    const observer = new MutationObserver(applyLogoForTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] bg-background border-b border-brand-red transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex-shrink-0 cursor-pointer select-none">
            <img src={logoSrc} alt="NextPhones Logo" className="h-14 md:h-16" draggable={false} />
          </Link>
          <Link
            to="/admin/login"
            className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            title="Admin Bereich"
          >
            <Shield className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Hauptnavigation" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setDropdownOpen(link.path)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                    location.pathname.startsWith(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {dropdownOpen === link.path && (
                  <div className="absolute top-full left-0 pt-1">
                    <div className="bg-background rounded-lg shadow-lg border py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm hover:bg-secondary hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary border-b-2 border-brand-red" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <ThemeToggle />
          <Link
            to="/beratung"
            className="ml-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Beratung sichern
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground" aria-label="Menü">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-brand-red shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.external ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-sm font-medium hover:text-primary"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.path} className="block py-2 text-sm font-medium hover:text-primary">
                    {link.label}
                  </Link>
                )}
                {link.children && (
                  <div className="pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <ThemeToggle />
              <Link
                to="/beratung"
                className="flex-1 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg text-center"
              >
                Beratung sichern
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
