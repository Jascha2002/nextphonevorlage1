import { useState, useEffect } from "react";
import { Accessibility, Plus, Minus, RotateCcw } from "lucide-react";

const A11Y_KEY = "np_a11y_settings";

interface A11ySettings {
  fontSize: number; // 0=normal,1=large,2=xlarge
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexicFont: boolean;
}

const defaults: A11ySettings = { fontSize: 0, highContrast: false, reduceMotion: false, dyslexicFont: false };

function load(): A11ySettings {
  try {
    const raw = localStorage.getItem(A11Y_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch { return defaults; }
}

const AccessibilityToolbar = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(load);

  const update = (partial: Partial<A11ySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem(A11Y_KEY, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    // Font size
    const sizes = ["100%", "115%", "130%"];
    root.style.fontSize = sizes[settings.fontSize];

    // High contrast
    root.classList.toggle("high-contrast", settings.highContrast);

    // Reduce motion
    root.classList.toggle("reduce-motion", settings.reduceMotion);

    // Dyslexic font
    root.classList.toggle("dyslexic-font", settings.dyslexicFont);
  }, [settings]);

  const reset = () => update(defaults);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Barrierefreiheit-Einstellungen öffnen"
        className="fixed top-20 right-4 z-[100] h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <Accessibility className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Barrierefreiheit-Einstellungen"
          className="fixed top-32 right-4 z-[100] w-72 bg-background border rounded-lg shadow-xl p-4"
        >
          <h3 className="font-bold text-foreground mb-4 text-sm">Barrierefreiheit</h3>

          {/* Font size */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-foreground">Schriftgröße</span>
            <div className="flex items-center gap-1">
              <button
                aria-label="Schrift verkleinern"
                onClick={() => update({ fontSize: Math.max(0, settings.fontSize - 1) })}
                disabled={settings.fontSize === 0}
                className="h-7 w-7 rounded border flex items-center justify-center text-foreground hover:bg-secondary disabled:opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs text-muted-foreground w-5 text-center">{["A", "A+", "A++"][settings.fontSize]}</span>
              <button
                aria-label="Schrift vergrößern"
                onClick={() => update({ fontSize: Math.min(2, settings.fontSize + 1) })}
                disabled={settings.fontSize === 2}
                className="h-7 w-7 rounded border flex items-center justify-center text-foreground hover:bg-secondary disabled:opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Toggles */}
          {[
            { label: "Kontrast erhöhen", key: "highContrast" as const, val: settings.highContrast },
            { label: "Animationen reduzieren", key: "reduceMotion" as const, val: settings.reduceMotion },
            { label: "Leseschrift (OpenDyslexic)", key: "dyslexicFont" as const, val: settings.dyslexicFont },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between mb-3 cursor-pointer">
              <span className="text-sm text-foreground">{item.label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={item.val}
                onClick={() => update({ [item.key]: !item.val })}
                className={`w-10 h-5 rounded-full relative flex-shrink-0 transition-colors ${item.val ? "bg-primary" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 bg-background rounded-full transition-transform ${item.val ? "right-0.5" : "left-0.5"}`} />
              </button>
            </label>
          ))}

          <button
            onClick={reset}
            className="w-full mt-1 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-ring rounded"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Zurücksetzen
          </button>
        </div>
      )}
    </>
  );
};

export default AccessibilityToolbar;
