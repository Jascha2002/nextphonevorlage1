import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("nextphones-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("nextphones-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Zu Hellmodus wechseln" : "Zu Dunkelmodus wechseln"}
      className="flex items-center gap-1.5 px-3 py-1.5 h-[36px] rounded-full border border-border bg-card text-foreground text-xs font-medium transition-all duration-300 ease-in-out hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{dark ? "Hell" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
