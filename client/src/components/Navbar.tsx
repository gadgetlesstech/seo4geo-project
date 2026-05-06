import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/src/assets/logo.png";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinkClass = "text-[14px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors cursor-pointer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const goFramework = () => {
    setIsOpen(false);
    if (location.pathname === "/") {
      document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <button onClick={goHome} className="flex items-center space-x-2 group">
              <img src={logo} alt="Gadgetlesstech" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform" />
              <span className="font-display font-black text-xl tracking-tighter uppercase italic text-white leading-none">
                Gadgetlesstech<span className="text-cyan-400">.</span>
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={goHome} className={navLinkClass}>Home</button>
            <Link to="/strategy" className={navLinkClass}>SEO Strategy</Link>
            <button onClick={goFramework} className={navLinkClass}>Framework</button>
            <Link to="/audit" className={navLinkClass}>Free Audit</Link>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-calendar'))}
              className="px-8 py-3 bg-[#00b8db] text-black text-[14px] font-black uppercase tracking-widest rounded-md hover:bg-white transition-all shadow-[0_0_20px_rgba(0,184,219,0.3)]"
            >
              Book a Call
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <button onClick={goHome} className="block w-full text-left px-3 py-3 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Home</button>
              <Link to="/strategy" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">SEO Strategy</Link>
              <button onClick={goFramework} className="block w-full text-left px-3 py-3 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Framework</button>
              <Link to="/audit" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-sm font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors">Free Audit</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
