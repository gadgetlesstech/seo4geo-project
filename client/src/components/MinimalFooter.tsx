import { Link } from "react-router-dom";

export default function MinimalFooter() {
  return (
    <footer className="bg-black pt-12 pb-10 border-t border-white/5 text-gray-600 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-3">
          SEO4GEO &mdash; Powered By The Gadgetlesstech Ranking System&trade;
        </p>
        <p className="text-[11px] font-medium mb-4">&copy; 2026 Gadgetlesstech. All rights reserved.</p>
        <div className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-widest">
          <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-gray-800">|</span>
          <Link to="/terms" className="hover:text-cyan-400 transition-colors">
            Terms of Service
          </Link>
          <span className="text-gray-800">|</span>
          <Link to="/contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
