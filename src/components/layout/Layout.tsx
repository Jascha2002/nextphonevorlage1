import { ReactNode, useCallback, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingElements from "@/components/FloatingElements";
import { CookieBannerProvider } from "@/components/CookieBanner";
import DeutLichtBadge from "@/components/DeutLichtBadge";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const reopenRef = useRef<(() => void) | null>(null);

  const registerReopen = useCallback((fn: () => void) => {
    reopenRef.current = fn;
  }, []);

  return (
    <CookieBannerProvider reopen={registerReopen}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Zum Hauptinhalt springen
      </a>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 pt-[70px]" role="main">{children}</main>
        <Footer onOpenCookieSettings={() => reopenRef.current?.()} />
        <FloatingElements />
        <DeutLichtBadge />
        <AccessibilityToolbar />
      </div>
    </CookieBannerProvider>
  );
};

export default Layout;
