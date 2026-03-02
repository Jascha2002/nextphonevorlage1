import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Wifi, Smartphone, Phone, Wrench, ArrowRight, ArrowLeft, CheckCircle2, TrendingDown } from "lucide-react";

type CustomerType = "privat" | "geschaeft" | null;

interface Need {
  id: string;
  label: string;
  icon: React.ElementType;
}

const privatNeeds: Need[] = [
  { id: "dsl", label: "DSL & Festnetz", icon: Wifi },
  { id: "mobilfunk", label: "Mobilfunk", icon: Smartphone },
  { id: "handyservice", label: "Handyservice & Reparatur", icon: Wrench },
  { id: "strom", label: "Strom & Gas", icon: TrendingDown },
];

const geschaeftNeeds: Need[] = [
  { id: "dsl", label: "DSL & Festnetz", icon: Wifi },
  { id: "mobilfunk", label: "Mobilfunk & Flotten", icon: Smartphone },
  { id: "voip", label: "VoIP-Telefonie / Placetel", icon: Phone },
  { id: "rahmen", label: "Rahmenverträge", icon: Briefcase },
];

interface Recommendation {
  title: string;
  provider: string;
  saving: string;
  features: string[];
}

function getRecommendations(type: CustomerType, needs: string[]): Recommendation[] {
  const recs: Recommendation[] = [];

  if (needs.includes("dsl")) {
    recs.push(
      type === "geschaeft"
        ? { title: "Business DSL / Glasfaser", provider: "Telekom · 1&1 · Thüringer Netkom", saving: "bis zu 25 €", features: ["Feste IP-Adresse", "Priorisierter Service", "SLA-Garantie"] }
        : { title: "DSL / Glasfaser für Zuhause", provider: "Telekom · Vodafone · 1&1 · PYUR", saving: "bis zu 15 €", features: ["Bis 1.000 Mbit/s", "WLAN-Router inklusive", "Kostenlose Einrichtung"] }
    );
  }
  if (needs.includes("mobilfunk")) {
    recs.push(
      type === "geschaeft"
        ? { title: "Business Mobilfunk & Flotten", provider: "Telekom · Vodafone · o2", saving: "bis zu 30 €", features: ["Flottenmanagement", "Shared-Data-Tarife", "Persönlicher Ansprechpartner"] }
        : { title: "Mobilfunk-Tarif", provider: "Telekom · congstar · o2 · yourfone", saving: "bis zu 20 €", features: ["5G-Highspeed", "Flexible Laufzeiten", "Top-Smartphones"] }
    );
  }
  if (needs.includes("handyservice")) {
    recs.push({ title: "Handyservice & Reparatur", provider: "NextPhones Werkstatt", saving: "bis zu 50 €", features: ["Display-Reparatur ab 49 €", "Express-Service möglich", "Wertgarantie Versicherung"] });
  }
  if (needs.includes("strom")) {
    recs.push({ title: "Strom- & Gastarif-Check", provider: "Über NextPhones Energieberatung", saving: "bis zu 40 €", features: ["Kostenloser Tarifvergleich", "Anbieterwechsel-Service", "Keine versteckten Kosten"] });
  }
  if (needs.includes("voip")) {
    recs.push({ title: "VoIP Cloud-Telefonie", provider: "Placetel · Telekom", saving: "bis zu 35 €", features: ["Cloud-Telefonanlage", "Unbegrenzte Nebenstellen", "CRM-Integration"] });
  }
  if (needs.includes("rahmen")) {
    recs.push({ title: "Rahmenvertrag", provider: "Telekom · Vodafone · 1&1", saving: "bis zu 40 €", features: ["Mengenrabatte", "Zentrale Verwaltung", "Exklusive Konditionen"] });
  }

  return recs;
}

const TarifRechner = () => {
  const [step, setStep] = useState(0);
  const [customerType, setCustomerType] = useState<CustomerType>(null);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const needs = customerType === "geschaeft" ? geschaeftNeeds : privatNeeds;
  const recommendations = getRecommendations(customerType, selectedNeeds);
  const totalSaving = recommendations.reduce((sum, r) => {
    const match = r.saving.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 0);
  }, 0);

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) => prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]);
  };

  const reset = () => { setStep(0); setCustomerType(null); setSelectedNeeds([]); };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Tarif-Rechner</h1>
        <p className="text-muted-foreground text-center mb-10">
          Welcher Tarif passt zu Dir? Finde es in 3 Schritten heraus.
        </p>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {["Kundentyp", "Bedarf", "Empfehlung"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline">{label}</span>
              {i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">Bist Du Privat- oder Geschäftskunde?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { type: "privat" as const, icon: User, label: "Privatkunde", desc: "Internet, Mobilfunk & mehr für Zuhause" },
                  { type: "geschaeft" as const, icon: Briefcase, label: "Geschäftskunde", desc: "Lösungen für Ihr Unternehmen" },
                ].map((opt) => (
                  <button
                    key={opt.type}
                    onClick={() => { setCustomerType(opt.type); setSelectedNeeds([]); setStep(1); }}
                    className="bg-card rounded-lg border-2 p-8 text-center hover:border-primary transition-colors service-card-glow group border-border"
                  >
                    <opt.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-foreground mb-1">{opt.label}</h3>
                    <p className="text-sm text-muted-foreground">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">Was brauchst Du?</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">Wähle einen oder mehrere Bereiche aus.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {needs.map((need) => (
                  <button
                    key={need.id}
                    onClick={() => toggleNeed(need.id)}
                    className={`rounded-lg border-2 p-5 text-left transition-colors flex items-center gap-4 ${
                      selectedNeeds.includes(need.id) ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <need.icon className={`h-6 w-6 flex-shrink-0 ${selectedNeeds.includes(need.id) ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium text-foreground">{need.label}</span>
                    {selectedNeeds.includes(need.id) && <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Zurück
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedNeeds.length === 0}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Empfehlung anzeigen <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Results */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <h2 className="text-xl font-bold text-foreground mb-2 text-center">Deine persönliche Empfehlung</h2>
              <p className="text-center text-muted-foreground text-sm mb-8">
                Basierend auf Deiner Auswahl als <span className="font-semibold text-foreground">{customerType === "geschaeft" ? "Geschäftskunde" : "Privatkunde"}</span>
              </p>

              {/* Saving highlight */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-8 text-center">
                <p className="text-sm text-muted-foreground mb-1">Geschätzte monatliche Ersparnis</p>
                <p className="text-4xl font-bold text-primary">bis zu {totalSaving} €<span className="text-base font-normal text-muted-foreground"> / Monat</span></p>
              </div>

              <div className="space-y-4 mb-8">
                {recommendations.map((rec) => (
                  <div key={rec.title} className="bg-card rounded-lg border shadow-sm p-6 service-card-glow transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-foreground">{rec.title}</h3>
                        <p className="text-xs text-muted-foreground">{rec.provider}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary whitespace-nowrap">{rec.saving} / Monat sparen</span>
                    </div>
                    <ul className="space-y-1">
                      {rec.features.map((f) => (
                        <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/beratung"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Jetzt Beratung sichern
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Nochmal starten
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TarifRechner;
