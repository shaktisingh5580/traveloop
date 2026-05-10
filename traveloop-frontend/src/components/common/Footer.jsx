import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-20 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-6">
            <div className="h-16 w-auto min-w-[180px] flex items-center justify-start -ml-4">
              <img src="/logo.png" alt="Traveloop Logo" className="h-full w-auto object-contain scale-125 origin-left" />
            </div>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Making travel planning collaborative, beautiful, and stress-free.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">Product</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">Support</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Guides</Link></li>
            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 Traveloop Inc.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
