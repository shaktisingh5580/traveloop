import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/lib/api";

const CATEGORIES = [
  { value: "documents", label: "Documents", icon: "📄" },
  { value: "clothing", label: "Clothing", icon: "👕" },
  { value: "electronics", label: "Electronics", icon: "🔌" },
  { value: "toiletries", label: "Toiletries", icon: "🧴" },
  { value: "medicine", label: "Medicine", icon: "💊" },
  { value: "accessories", label: "Accessories", icon: "🎒" },
  { value: "miscellaneous", label: "Miscellaneous", icon: "📦" },
];

export default function PackingChecklist() {
  const router = useRouter();
  const { tripId } = router.query;
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("category");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "miscellaneous", quantity: 1, is_essential: false });

  // Fetch trip + packing items
  useEffect(() => {
    if (!tripId) return;
    const fetchData = async () => {
      try {
        const [tripData, packingData] = await Promise.all([
          api.get(`/trips/${tripId}`).catch(() => null),
          api.get(`/trips/${tripId}/packing`).catch(() => []),
        ]);
        setTrip(tripData);
        setItems(packingData || []);
      } catch (err) {
        console.error("Failed to load packing data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  // Toggle packed status
  const togglePacked = async (item) => {
    const updated = { ...item, is_packed: !item.is_packed };
    setItems(items.map(i => i.id === item.id ? updated : i));
    try {
      await api.put(`/trips/${tripId}/packing/${item.id}`, { is_packed: !item.is_packed });
    } catch (err) {
      // Revert on error
      setItems(items.map(i => i.id === item.id ? item : i));
      console.error("Failed to update item:", err);
    }
  };

  // Add new item
  const handleAddItem = async () => {
    if (!newItem.name.trim()) return;
    try {
      const created = await api.post(`/trips/${tripId}/packing`, {
        name: newItem.name,
        category: newItem.category,
        quantity: newItem.quantity,
        is_essential: newItem.is_essential,
      });
      setItems([...items, created]);
      setNewItem({ name: "", category: "miscellaneous", quantity: 1, is_essential: false });
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    setItems(items.filter(i => i.id !== itemId));
    try {
      await api.del(`/trips/${tripId}/packing/${itemId}`);
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  // Reset all
  const handleResetAll = async () => {
    if (!confirm("Unpack all items? This will mark everything as not packed.")) return;
    const resetItems = items.map(i => ({ ...i, is_packed: false }));
    setItems(resetItems);
    // Update each item
    for (const item of items) {
      if (item.is_packed) {
        await api.put(`/trips/${tripId}/packing/${item.id}`, { is_packed: false }).catch(() => {});
      }
    }
  };

  // Filter & sort
  const filtered = items
    .filter(i => filterCategory === "all" || i.category === filterCategory)
    .filter(i => i.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "category") return (a.category || "").localeCompare(b.category || "");
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "packed") return (a.is_packed === b.is_packed ? 0 : a.is_packed ? 1 : -1);
      return 0;
    });

  // Group by category
  const grouped = {};
  filtered.forEach(item => {
    const cat = item.category || "miscellaneous";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  // Stats
  const totalItems = items.length;
  const packedCount = items.filter(i => i.is_packed).length;
  const progressPercent = totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <svg className="animate-spin h-8 w-8 text-brand-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  return (
    <>
      <Head><title>Packing Checklist | Traveloop</title></Head>
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-brand-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">Group by: All</option>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <button className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-colors">Filter</button>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="category">Sort: Category</option>
            <option value="name">Sort: A-Z</option>
            <option value="packed">Sort: Packed</option>
          </select>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-slate-900 font-outfit">Packing Checklist</h1>

        {/* Trip Selector */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium">
          <span className="text-slate-500">Trip:</span>
          <span className="font-bold text-slate-900">{trip?.name || "Select a trip"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m6 9 6 6 6-6"/></svg>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700">
              Progress: {packedCount}/{totalItems} items packed
            </span>
            <span className="text-xs font-bold text-slate-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Grouped Items */}
        {Object.keys(grouped).length > 0 ? (
          Object.entries(grouped).map(([category, catItems]) => {
            const catInfo = CATEGORIES.find(c => c.value === category) || { label: category, icon: "📦" };
            const catPacked = catItems.filter(i => i.is_packed).length;
            return (
              <div key={category} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                {/* Category Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span>{catInfo.icon}</span>
                    <h3 className="text-sm font-bold text-slate-900">{catInfo.label}</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{catPacked}/{catItems.length}</span>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100">
                  {catItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors group">
                      {/* Checkbox */}
                      <button
                        onClick={() => togglePacked(item)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                          item.is_packed
                            ? "bg-brand-500 border-brand-500"
                            : "border-slate-300 hover:border-brand-500"
                        }`}
                      >
                        {item.is_packed && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </button>

                      {/* Item name */}
                      <span className={`flex-1 text-sm ${item.is_packed ? "text-slate-400 line-through" : "text-slate-900"} transition-colors`}>
                        {item.name}
                      </span>

                      {/* Essential badge */}
                      {item.is_essential && (
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Essential</span>
                      )}

                      {/* Quantity */}
                      {item.quantity > 1 && (
                        <span className="text-xs text-slate-400 font-medium">×{item.quantity}</span>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-400 mb-4">No items in your checklist yet.</p>
          </div>
        )}

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-white border-2 border-dashed border-brand-300 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Add New Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Item name (e.g. Passport)"
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                autoFocus
              />
              <select
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
              </select>
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-600">Qty:</label>
                <input
                  type="number"
                  min={1}
                  className="w-20 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-brand-500" checked={newItem.is_essential} onChange={(e) => setNewItem({ ...newItem, is_essential: e.target.checked })} />
                  <span className="text-xs font-bold text-slate-600">Essential</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddItem} className="px-5 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600 transition-all">Add Item</button>
              <button onClick={() => setShowAddForm(false)} className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex-1 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            + add item to checklist
          </button>
          <button
            onClick={handleResetAll}
            className="flex-1 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-all"
          >
            Reset all
          </button>
          <button
            className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all"
          >
            Share Checklist
          </button>
        </div>
      </div>
    </>
  );
}
