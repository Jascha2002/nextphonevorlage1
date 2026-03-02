import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingElements from "@/components/FloatingElements";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[70px]">{children}</main>
      <Footer />
      <FloatingElements />
    </div>
  );
};

export default Layout;
