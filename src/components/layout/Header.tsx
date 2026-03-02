import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { locations } from "@/data/locations";

const navLinks = [
  { label: "Startseite", path: "/" },
  {
    label: "Standorte",
    path: "/standorte",
    children: locations.map((l) => ({
      label: l.city,
      path: `/standorte/${l.slug}`,
    })),
  },
  { label: "Leistungen", path: "/leistungen" },
  { label: "Vertriebspartner", path: "/vertriebspartner" },
  { label: "Karriere", path: "/karriere" },
  { label: "Team", path: "/team" },
  { label: "Blog", path: "/blog" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] bg-background border-b border-brand-red transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/nextphones-logo.png"
            alt="NextPhones Logo"
            className="h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                    location.pathname.startsWith("/standorte")
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 bg-background rounded-lg shadow-lg border py-2 min-w-[200px]">
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
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary border-b-2 border-brand-red"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/beratung"
            className="ml-4 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Beratung sichern
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menü"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-brand-red shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  className="block py-2 text-sm font-medium hover:text-primary"
                >
                  {link.label}
                </Link>
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
            <Link
              to="/beratung"
              className="mt-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg text-center"
            >
              Beratung sichern
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
