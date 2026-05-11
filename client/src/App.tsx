import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Strategy from "./pages/Strategy";
import ClusterPage from "./pages/ClusterPage";
import AuditPage from "./pages/AuditPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/cluster/:slug" element={<ClusterPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <VoiceChat />
        <ExitPopup />
      </div>
    </Router>
  );
}
