import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Standorte from "./pages/Standorte";
import StandortDetail from "./pages/StandortDetail";
import Leistungen from "./pages/Leistungen";
import DslFestnetz from "./pages/leistungen/DslFestnetz";
import Mobilfunk from "./pages/leistungen/Mobilfunk";
import Handyservice from "./pages/leistungen/Handyservice";
import WlanEinrichtung from "./pages/leistungen/WlanEinrichtung";
import VoipTelefonie from "./pages/leistungen/VoipTelefonie";
import Geschaeftskunden from "./pages/leistungen/Geschaeftskunden";
import Beratung from "./pages/Beratung";
import StromCheck from "./pages/StromCheck";
import Karriere from "./pages/Karriere";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import Vertriebspartner from "./pages/Vertriebspartner";
import TarifRechner from "./pages/TarifRechner";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Agb from "./pages/Agb";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/standorte" element={<Standorte />} />
            <Route path="/standorte/:slug" element={<StandortDetail />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/leistungen/dsl-festnetz" element={<DslFestnetz />} />
            <Route path="/leistungen/mobilfunk" element={<Mobilfunk />} />
            <Route path="/leistungen/handyservice" element={<Handyservice />} />
            <Route path="/leistungen/wlan-einrichtung" element={<WlanEinrichtung />} />
            <Route path="/leistungen/voip-telefonie" element={<VoipTelefonie />} />
            <Route path="/leistungen/geschaeftskunden" element={<Geschaeftskunden />} />
            <Route path="/beratung" element={<Beratung />} />
            <Route path="/strom-check" element={<StromCheck />} />
            <Route path="/karriere" element={<Karriere />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/vertriebspartner" element={<Vertriebspartner />} />
            <Route path="/tarif-rechner" element={<TarifRechner />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<Agb />} />
            <Route path="/barrierefreiheit" element={<Barrierefreiheit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
