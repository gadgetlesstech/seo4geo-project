import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5 text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-display font-black text-2xl tracking-tighter uppercase mb-6 block italic text-white leading-none">
              Gadgetlesstech<span className="text-cyan-400">.</span>
            </Link>
            <p className="max-w-sm leading-relaxed mb-8 text-sm">
              A modern SEO system built on semantic authority, query expansion, and page-level ranking signals. Proprietary methodology for local and national results.
            </p>
          </div>
          <div>
            <h4 className="font-display font-black text-[12px] uppercase tracking-widest text-white mb-8">The Framework</h4>
            <ul className="space-y-4 text-[12px] font-bold uppercase tracking-widest">
              <li><Link to="/strategy" className="hover:text-cyan-400 transition-colors">Ranking System™</Link></li>
              <li><Link to={{ pathname: "/", hash: "#framework" }} className="hover:text-cyan-400 transition-colors">Authority Stack</Link></li>
              <li><Link to="/audit" className="hover:text-cyan-400 transition-colors">Free SEO Audit</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-black text-[12px] uppercase tracking-widest text-white mb-8">Company</h4>
            <ul className="space-y-4 text-[12px] font-bold uppercase tracking-widest">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[12px] uppercase font-bold tracking-widest">
          <p>© 2026 Gadgetlesstech. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
