export default function Trending() {
  const destinations = [
    { name: "Kyoto, Japan", image: "bg-emerald-100", tag: "Cultural" },
    { name: "Amalfi, Italy", image: "bg-blue-100", tag: "Coastal" },
    { name: "Banff, Canada", image: "bg-teal-100", tag: "Nature" },
    { name: "Bali, Indonesia", image: "bg-orange-100", tag: "Tropical" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold font-outfit text-slate-900 mb-8">Trending Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest, i) => (
          <div key={i} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
            <div className={`absolute inset-0 ${dest.image} group-hover:scale-110 transition-transform duration-700`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider mb-2">{dest.tag}</span>
              <h3 className="text-xl font-bold text-white font-outfit">{dest.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
