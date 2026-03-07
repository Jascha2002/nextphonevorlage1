import { useState } from "react";
import { Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DeutLichtBadge = () => {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="fixed bottom-6 left-6 z-40" style={{ pointerEvents: "auto" }}>
      {/* Tooltip - desktop only */}
      {!isMobile && hovered && (
        <div
          className="absolute bottom-full left-0 mb-2 whitespace-nowrap transition-opacity duration-200"
          style={{
            background: "rgba(10,10,10,0.80)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(227,6,19,0.25)",
            borderRadius: 12,
            padding: "5px 12px",
            fontSize: 11,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}
        >
          Diese Website wurde von DeutLicht® entwickelt
        </div>
      )}
      <a
        href="https://www.deutlicht.de"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="inline-flex items-center gap-1.5 no-underline"
        style={{
          height: isMobile ? 24 : 28,
          padding: isMobile ? "4px 10px" : "6px 14px",
          background: hovered ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.80)",
          backdropFilter: "blur(8px)",
          border: hovered ? "1px solid rgba(227,6,19,0.5)" : "1px solid rgba(227,6,19,0.25)",
          borderRadius: 20,
          boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          fontSize: isMobile ? 10 : 11,
          fontWeight: 600,
          letterSpacing: "0.3px",
          color: hovered ? "rgba(255,255,255,1.0)" : "rgba(255,255,255,0.65)",
          fontFamily: "Inter, sans-serif",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "all 0.2s ease",
          textDecoration: "none",
        }}
      >
        <Zap size={isMobile ? 10 : 12} color="#E30613" fill="#E30613" />
        by DeutLicht®
      </a>
    </div>
  );
};

export default DeutLichtBadge;
