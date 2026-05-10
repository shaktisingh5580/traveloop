import Head from "next/head";
import { useRouter } from "next/router";

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;

  const results = [
    { id: 1, name: "Luxury Seine Cruise", location: "Paris, France", price: "$85", rating: "4.9", reviews: "2.4k", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Louvre Skip-the-line", location: "Paris, France", price: "$45", rating: "4.8", reviews: "10k+", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Montmartre Walking Tour", location: "Paris, France", price: "$25", rating: "4.7", reviews: "1.2k", img: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Versailles Day Trip", location: "Paris, France", price: "$120", rating: "4.9", reviews: "5.6k", img: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <>
      <Head><title>Search Results | Traveloop</title></Head>
      <div className="max-w-[1400px] mx-auto py-12 px-6">
        <div className="mb-12">
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Search Results</p>
          <h1 className="text-4xl font-bold font-outfit text-slate-900 tracking-tight">Showing results for "{q || "Paris"}"</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-72 space-y-10">
            <div>
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Categories</h3>
              <div className="space-y-3">
                {["All Activities", "Museums", "Tours", "Food & Drink", "Nightlife"].map((cat, i) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked={i === 0} className="w-5 h-5 rounded-lg border-slate-200 text-emerald-500 focus:ring-emerald-500/20" />
                    <span className={`text-sm font-medium ${i === 0 ? "text-slate-900" : "text-slate-500"} group-hover:text-slate-900 transition-colors`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Price Range</h3>
              <div className="px-2">
                 <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                 <div className="flex justify-between mt-4">
                    <span className="text-xs font-bold text-slate-400">$0</span>
                    <span className="text-xs font-bold text-slate-900">$500+</span>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Rating</h3>
              <div className="space-y-3">
                {[5, 4, 3].map((star) => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-emerald-500 focus:ring-emerald-500/20" />
                    <div className="flex items-center gap-1">
                       {[...Array(5)].map((_, i) => (
                         <svg key={i} className={`w-3.5 h-3.5 ${i < star ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                       ))}
                       <span className="text-xs font-bold text-slate-500 ml-2">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
             <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{results.length} Activities Found</p>
                <select className="bg-transparent border-none text-sm font-bold text-slate-900 focus:ring-0 cursor-pointer">
                   <option>Sort by: Recommended</option>
                   <option>Price: Low to High</option>
                   <option>Price: High to Low</option>
                   <option>Top Rated</option>
                </select>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.map((res) => (
                  <div key={res.id} className="group bg-white border border-slate-100 rounded-[2.5rem] p-4 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                     <div className="aspect-[16/10] rounded-[2rem] overflow-hidden relative mb-6">
                        <img src={res.img} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-widest">
                           {res.location}
                        </div>
                     </div>
                     <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="flex items-center text-amber-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                              <span className="text-xs font-bold text-slate-900 ml-1">{res.rating}</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">({res.reviews} reviews)</span>
                        </div>
                        <h3 className="text-xl font-bold font-outfit text-slate-900 group-hover:text-emerald-600 transition-colors mb-4">{res.name}</h3>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-5">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From</span>
                              <span className="text-2xl font-bold text-slate-900 font-outfit">{res.price}</span>
                           </div>
                           <button className="w-12 h-12 rounded-2xl bg-slate-900 group-hover:bg-emerald-500 text-white flex items-center justify-center transition-all shadow-lg shadow-slate-900/10">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-16 text-center">
                <button className="px-10 py-5 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all uppercase tracking-widest text-xs">Load More Results</button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
