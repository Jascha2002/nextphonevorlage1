import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowUp } from "lucide-react";

const FloatingElements = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Beratung sichern sticky button */}
      <Link
        to="/beratung"
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition-all flex items-center gap-2 font-semibold text-sm"
      >
        <MessageCircle className="h-4 w-4" />
        Beratung sichern
      </Link>

      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 z-40 bg-foreground text-background p-3 rounded-full shadow-lg hover:opacity-80 transition-all"
          aria-label="Nach oben"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </>
  );
};

export default FloatingElements;
