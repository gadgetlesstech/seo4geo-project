import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Strategy from "./pages/Strategy";
import ClusterPage from "./pages/ClusterPage";
import AuditPage from "./pages/AuditPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VoiceChat from "./components/VoiceChat";

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if ((state as any)?.keepScroll) return;
    window.scrollTo(0, 0);
  }, [pathname, state]);
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
          </Routes>
        </main>
        <Footer />
        <VoiceChat />
      </div>
    </Router>
  );
}
