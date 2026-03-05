import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
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
import VodafoneGigaMobil from "./pages/blog/VodafoneGigaMobil";
import TelekomPreiserhoehung from "./pages/blog/TelekomPreiserhoehung";
import SamsungGalaxyS26 from "./pages/blog/SamsungGalaxyS26";
import Vertriebspartner from "./pages/Vertriebspartner";
import Pakete from "./pages/Pakete";
import TarifRechner from "./pages/TarifRechner";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Agb from "./pages/Agb";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminAktionen from "./pages/admin/AdminAktionen";
import AdminBewertungen from "./pages/admin/AdminBewertungen";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminStandorte from "./pages/admin/AdminStandorte";
import AdminBenachrichtigungen from "./pages/admin/AdminBenachrichtigungen";
import AdminEinstellungen from "./pages/admin/AdminEinstellungen";
import AdminPakete from "./pages/admin/AdminPakete";

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <AdminLayout>{children}</AdminLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/standorte" element={<Layout><Standorte /></Layout>} />
            <Route path="/standorte/:slug" element={<Layout><StandortDetail /></Layout>} />
            <Route path="/leistungen" element={<Layout><Leistungen /></Layout>} />
            <Route path="/leistungen/dsl-festnetz" element={<Layout><DslFestnetz /></Layout>} />
            <Route path="/leistungen/mobilfunk" element={<Layout><Mobilfunk /></Layout>} />
            <Route path="/leistungen/handyservice" element={<Layout><Handyservice /></Layout>} />
            <Route path="/leistungen/wlan-einrichtung" element={<Layout><WlanEinrichtung /></Layout>} />
            <Route path="/leistungen/voip-telefonie" element={<Layout><VoipTelefonie /></Layout>} />
            <Route path="/leistungen/geschaeftskunden" element={<Layout><Geschaeftskunden /></Layout>} />
            <Route path="/beratung" element={<Layout><Beratung /></Layout>} />
            <Route path="/strom-check" element={<Layout><StromCheck /></Layout>} />
            <Route path="/karriere" element={<Layout><Karriere /></Layout>} />
            <Route path="/team" element={<Layout><Team /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/vodafone-gigamobil-rabatt" element={<Layout><VodafoneGigaMobil /></Layout>} />
            <Route path="/blog/telekom-preiserhoehung-optionen" element={<Layout><TelekomPreiserhoehung /></Layout>} />
            <Route path="/blog/samsung-galaxy-s26-angebot" element={<Layout><SamsungGalaxyS26 /></Layout>} />
            <Route path="/pakete" element={<Layout><Pakete /></Layout>} />
            <Route path="/vertriebspartner" element={<Layout><Vertriebspartner /></Layout>} />
            <Route path="/tarif-rechner" element={<Layout><TarifRechner /></Layout>} />
            <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
            <Route path="/datenschutz" element={<Layout><Datenschutz /></Layout>} />
            <Route path="/agb" element={<Layout><Agb /></Layout>} />
            <Route path="/barrierefreiheit" element={<Layout><Barrierefreiheit /></Layout>} />

            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/registrieren" element={<AdminRegister />} />
            <Route path="/admin/passwort-vergessen" element={<AdminForgotPassword />} />
            <Route path="/admin/passwort-zuruecksetzen" element={<AdminResetPassword />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/blog" element={<AdminRoute><AdminBlog /></AdminRoute>} />
            <Route path="/admin/aktionen" element={<AdminRoute><AdminAktionen /></AdminRoute>} />
            <Route path="/admin/bewertungen" element={<AdminRoute><AdminBewertungen /></AdminRoute>} />
            <Route path="/admin/team" element={<AdminRoute><AdminTeam /></AdminRoute>} />
            <Route path="/admin/standorte" element={<AdminRoute><AdminStandorte /></AdminRoute>} />
            <Route path="/admin/benachrichtigungen" element={<AdminRoute><AdminBenachrichtigungen /></AdminRoute>} />
            <Route path="/admin/einstellungen" element={<AdminRoute><AdminEinstellungen /></AdminRoute>} />
            <Route path="/admin/pakete" element={<AdminRoute><AdminPakete /></AdminRoute>} />

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
