import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";

const steps = [
  {
    question: "Für wen suchst du einen Tarif?",
    options: [
      { emoji: "📱", label: "Für mich privat", value: "privat" },
      { emoji: "👨‍👩‍👧", label: "Für meine Familie", value: "familie" },
      { emoji: "💼", label: "Für mein Unternehmen", value: "unternehmen" },
      { emoji: "👴", label: "Für Senioren", value: "senioren" },
    ],
  },
  {
    question: "Was ist dir am wichtigsten?",
    options: [
      { emoji: "📶", label: "Viel Datenvolumen", value: "daten" },
      { emoji: "📞", label: "Günstige Telefonie", value: "telefonie" },
      { emoji: "🌐", label: "Schnelles Internet", value: "internet" },
      { emoji: "⚖️", label: "Preis-Leistung", value: "preis-leistung" },
    ],
  },
  {
    question: "Wie viel Datenvolumen brauchst du?",
    options: [
      { emoji: "", label: "Bis 5 GB — Gelegenheitsnutzer", value: "5gb" },
      { emoji: "", label: "5–15 GB — Normalnutzer", value: "15gb" },
      { emoji: "", label: "15–30 GB — Vielnutzer", value: "30gb" },
      { emoji: "", label: "Unbegrenzt — Poweruser", value: "unbegrenzt" },
    ],
  },
  {
    question: "Was darf der Tarif kosten?",
    options: [
      { emoji: "", label: "Bis 15€ / Monat", value: "15" },
      { emoji: "", label: "15–25€ / Monat", value: "25" },
      { emoji: "", label: "25–40€ / Monat", value: "40" },
      { emoji: "", label: "Preis ist egal", value: "egal" },
    ],
  },
];

interface Result {
  provider: string;
  bullets: string[];
}

function getResult(answers: string[]): Result {
  const [who, priority, data, budget] = answers;

  if (who === "unternehmen") {
    return { provider: "Thüringer Netkom / 1&1 Business", bullets: ["Geschäftskunden-Tarife mit SLA", "Feste Ansprechpartner", "Flottenmanagement möglich"] };
  }
  if (who === "senioren" && (budget === "15" || budget === "25")) {
    return { provider: "congstar / yourfone", bullets: ["Einfache Tarifstruktur", "Keine versteckten Kosten", "Flexible Laufzeiten"] };
  }
  if (who === "familie" && (priority === "daten" || data === "unbegrenzt")) {
    return { provider: "Vodafone GigaMobil", bullets: ["Family-Cards mit geteiltem Volumen", "5G für die ganze Familie", "Bis zu 4 SIM-Karten"] };
  }
  if (who === "privat" && data === "unbegrenzt" && (budget === "40" || budget === "egal")) {
    return { provider: "Telekom MagentaMobil", bullets: ["Unbegrenztes Datenvolumen", "Bestes 5G-Netz Deutschlands", "StreamOn inklusive"] };
  }
  if (priority === "preis-leistung" && (budget === "15" || budget === "25")) {
    return { provider: "o2 / congstar", bullets: ["Top Preis-Leistung", "Flexible Vertragslaufzeiten", "Gutes Netz zum kleinen Preis"] };
  }
  return { provider: "Vodafone", bullets: ["Starkes 5G-Netz", "Flexible Tarifoptionen", "Attraktive Smartphone-Bundles"] };
}

const TarifRechnerQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const progress = showResult ? 100 : (currentStep / steps.length) * 100;

  const selectOption = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? getResult(answers) : null;

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <span className="inline-block bg-white text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          ⚡ Kostenloser Tarifcheck
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Welcher Tarif passt zu dir?</h2>
        <p className="text-white/80 max-w-lg mx-auto mb-8">
          Beantworte 4 kurze Fragen — wir zeigen dir die besten Optionen.
        </p>

        {/* Progress */}
        <div className="mb-8">
          <p className="text-white/70 text-sm mb-2">
            {showResult ? "Ergebnis" : `Schritt ${currentStep + 1} von ${steps.length}`}
          </p>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">{steps[currentStep].question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(opt.value)}
                    className="bg-white rounded-xl p-5 text-left hover:ring-2 hover:ring-white/50 hover:scale-[1.02] transition-all flex items-center gap-3 group"
                  >
                    {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                    <span className="font-semibold text-primary">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-auto"
            >
              <CheckCircle2 className="h-14 w-14 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-1">Deine Empfehlung</h3>
              <p className="text-muted-foreground text-sm mb-4">Unser Tipp für dich:</p>
              <p className="text-xl font-bold text-foreground mb-4">{result!.provider}</p>
              <ul className="space-y-2 mb-6 text-left">
                {result!.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/beratung"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Beratung buchen
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
                >
                  <RotateCcw className="h-4 w-4" /> Nochmal starten
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-white/60 text-sm mt-8">
          Keine Verpflichtung — kostenlose Beratung in allen 5 Filialen.
        </p>
      </div>
    </section>
  );
};

export default TarifRechnerQuiz;
