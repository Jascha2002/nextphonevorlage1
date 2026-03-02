import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "np_cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_DURATION_MS = 365 * 24 * 60 * 60 * 1000; // 12 months

interface ConsentData {
  version: number;
  timestamp: string;
  categories: {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
  };
}

function getStoredConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data: ConsentData = JSON.parse(raw);
    if (data.version !== CONSENT_VERSION) return null;
    const elapsed = Date.now() - new Date(data.timestamp).getTime();
    if (elapsed > CONSENT_DURATION_MS) return null;
    return data;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentData | null>(() => getStoredConsent());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!consent) setVisible(true);
  }, [consent]);

  const save = useCallback((categories: ConsentData["categories"]) => {
    const data: ConsentData = { version: CONSENT_VERSION, timestamp: new Date().toISOString(), categories };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    setConsent(data);
    setVisible(false);
  }, []);

  const reopen = useCallback(() => setVisible(true), []);

  return { consent, visible, save, reopen };
}

export function CookieBannerProvider({ children, reopen }: { children: React.ReactNode; reopen: (fn: () => void) => void }) {
  const { visible, save, reopen: reopenFn } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => { reopen(reopenFn); }, [reopen, reopenFn]);

  if (!visible) return <>{children}</>;

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveSelection = () => save({ necessary: true, analytics, marketing });

  return (
    <>
      {children}
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground/50 z-[9998]" aria-hidden="true" />

      {/* Banner */}
      <div
        role="dialog"
        aria-label="Cookie-Einwilligung"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 z-[9999] bg-background border-t-[3px] border-brand-red shadow-2xl"
      >
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <h2 className="text-lg font-bold text-foreground mb-2">Wir verwenden Cookies 🍪</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Diese Website verwendet Cookies und ähnliche Technologien. Technisch notwendige Cookies sind für den Betrieb der Website erforderlich. Weitere Cookies verwenden wir nur mit Ihrer Einwilligung für Analysezwecke. Weitere Informationen finden Sie in unserer{" "}
            <Link to="/datenschutz" className="text-primary underline hover:opacity-80">Datenschutzerklärung</Link>.
          </p>

          {/* Details toggle */}
          {showDetails && (
            <div className="space-y-3 mb-4">
              {/* Necessary */}
              <div className="flex items-center justify-between bg-secondary rounded-lg p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Technisch notwendig</p>
                  <p className="text-xs text-muted-foreground">Für den Betrieb der Website unbedingt erforderlich. Speicherdauer: Session</p>
                </div>
                <div className="w-11 h-6 bg-primary rounded-full relative cursor-not-allowed" aria-label="Immer aktiv">
                  <div className="absolute right-0.5 top-0.5 h-5 w-5 bg-primary-foreground rounded-full" />
                </div>
              </div>

              {/* Analytics */}
              <label className="flex items-center justify-between bg-secondary rounded-lg p-3 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-foreground">Analyse & Statistik</p>
                  <p className="text-xs text-muted-foreground">Helfen uns zu verstehen, wie Besucher die Website nutzen. Anbieter: Google Analytics. Speicherdauer: 2 Jahre</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics(!analytics)}
                  className={`w-11 h-6 rounded-full relative flex-shrink-0 transition-colors ${analytics ? "bg-primary" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 bg-background rounded-full transition-transform ${analytics ? "right-0.5" : "left-0.5"}`} />
                </button>
              </label>

              {/* Marketing */}
              <label className="flex items-center justify-between bg-secondary rounded-lg p-3 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-foreground">Marketing</p>
                  <p className="text-xs text-muted-foreground">Ermöglichen personalisierte Werbung. Speicherdauer: 1 Jahr</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={marketing}
                  onClick={() => setMarketing(!marketing)}
                  className={`w-11 h-6 rounded-full relative flex-shrink-0 transition-colors ${marketing ? "bg-primary" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 bg-background rounded-full transition-transform ${marketing ? "right-0.5" : "left-0.5"}`} />
                </button>
              </label>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <button onClick={rejectAll} className="flex-1 px-5 py-2.5 border-2 border-primary text-primary bg-background font-semibold text-sm rounded-lg hover:bg-primary/5 transition-colors">
              Alle ablehnen
            </button>
            {showDetails && (
              <button onClick={saveSelection} className="flex-1 px-5 py-2.5 border-2 border-border text-foreground bg-background font-semibold text-sm rounded-lg hover:bg-secondary transition-colors">
                Auswahl speichern
              </button>
            )}
            <button onClick={acceptAll} className="flex-1 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity">
              Alle akzeptieren
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => setShowDetails(!showDetails)} className="text-xs text-primary hover:underline">
              {showDetails ? "Weniger anzeigen" : "Einstellungen anpassen"}
            </button>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <Link to="/datenschutz" className="hover:text-primary">Datenschutzerklärung</Link>
              <Link to="/impressum" className="hover:text-primary">Impressum</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
