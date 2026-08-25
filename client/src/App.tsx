import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Strategy from "./pages/Strategy";
import ClusterPage from "./pages/ClusterPage";
import AuditPage from "./pages/AuditPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import RoofingRankingGap from "./pages/RoofingRankingGap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MinimalFooter from "./components/MinimalFooter";
import VoiceChat from "./components/VoiceChat";
import { ExitPopup } from "./components/ExitPopup";

function ScrollToTop() {
  const { pathname, hash, state } = useLocation();
  useEffect(() => {
    if ((state as any)?.keepScroll) return;
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isSqueezePage = pathname === "/roofing-ranking-gap";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {!isSqueezePage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/cluster/:slug" element={<ClusterPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/roofing-ranking-gap" element={<RoofingRankingGap />} />
        </Routes>
      </main>
      {isSqueezePage ? <MinimalFooter /> : <Footer />}
      {!isSqueezePage && <VoiceChat />}
      {!isSqueezePage && <ExitPopup />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}
