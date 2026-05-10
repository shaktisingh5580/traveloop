import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/lib/api";

const CATEGORY_LABELS = {
  transport: "Travel",
  accommodation: "Hotel",
  food: "Food",
  activities: "Activities",
  shopping: "Shopping",
  miscellaneous: "Misc",
};

export default function TripBudget() {
  const router = useRouter();
  const { tripId } = router.query;
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "miscellaneous",
    description: "",
    amount: "",
    expense_date: "",
    is_estimated: true,
  });

  useEffect(() => {
    if (!tripId) return;
    const fetchData = async () => {
      try {
        const [tripData, expData] = await Promise.all([
          api.get(`/trips/${tripId}`).catch(() => null),
          api.get(`/trips/${tripId}/expenses`).catch(() => []),
        ]);
        setTrip(tripData);
        setExpenses(expData || []);
      } catch (err) {
        console.error("Failed to load budget:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  // Add expense
  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount) return;
    try {
      const created = await api.post(`/trips/${tripId}/expenses`, {
        category: newExpense.category,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        expense_date: newExpense.expense_date || new Date().toISOString().split("T")[0],
        is_estimated: newExpense.is_estimated,
      });
      setExpenses([...expenses, created]);
      setNewExpense({ category: "miscellaneous", description: "", amount: "", expense_date: "", is_estimated: true });
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    await api.del(`/trips/${tripId}/expenses/${id}`).catch(() => {});
  };

  // Filter & sort
  const filtered = expenses
    .filter(e => filterCat === "all" || e.category === filterCat)
    .filter(e => (e.description || "").toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "date") return (b.expense_date || "").localeCompare(a.expense_date || "");
      if (sortBy === "amount") return (parseFloat(b.amount) || 0) - (parseFloat(a.amount) || 0);
      if (sortBy === "category") return (a.category || "").localeCompare(b.category || "");
      return 0;
    });

  // Calculations
  const subtotal = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const taxRate = 0.05;
  const tax = Math.round(subtotal * taxRate);
  const discount = 0;
  const grandTotal = subtotal + tax - discount;
  const totalBudget = parseFloat(trip?.total_budget) || 0;
  const remaining = totalBudget - grandTotal;

  // Category breakdown for donut
  const byCategory = {};
  expenses.forEach(e => {
    const cat = e.category || "miscellaneous";
    byCategory[cat] = (byCategory[cat] || 0) + (parseFloat(e.amount) || 0);
  });
  const categoryColors = {
    transport: "#3b82f6",
    accommodation: "#8b5cf6",
    food: "#f59e0b",
    activities: "#10b981",
    shopping: "#ec4899",
    miscellaneous: "#6b7280",
  };

  // Invoice ID
  const invoiceId = `INV-${(tripId || "").toString().slice(0, 8).toUpperCase()}`;
  const generatedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

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
      <Head><title>Expense Invoice | Traveloop</title></Head>
      <div className="space-y-6 pb-20">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-brand-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
            <option value="all">Filter: All</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
            <option value="category">Sort: Category</option>
          </select>
        </div>

        {/* Back link */}
        <Link href="/trips" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
          ← back to My Trips
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Invoice Card */}
          <div className="flex-1 space-y-6">
            {/* Invoice Header */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Trip image */}
                <div className="w-28 h-28 rounded-2xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                  {trip?.cover_image_url ? (
                    <img src={trip.cover_image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🏕️</span>
                  )}
                </div>

                {/* Trip info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{trip?.name || "Trip"}</h2>
                    <p className="text-xs text-slate-500 mt-1">{trip?.start_date} – {trip?.end_date}</p>
                    <p className="text-xs text-slate-500">{trip?.stop_count || 0} cities</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold">Invoice ID</p>
                    <p className="text-sm font-bold text-slate-900">{invoiceId}</p>
                    <p className="text-xs text-slate-400 font-bold mt-2">Generated Date</p>
                    <p className="text-sm text-slate-700">{generatedDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold">Payment Status</p>
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-600">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-5 py-3 font-bold text-slate-600 w-10">#</th>
                      <th className="text-left px-5 py-3 font-bold text-slate-600">Category</th>
                      <th className="text-left px-5 py-3 font-bold text-slate-600">Description</th>
                      <th className="text-left px-5 py-3 font-bold text-slate-600">Qty/Details</th>
                      <th className="text-right px-5 py-3 font-bold text-slate-600">Unit Cost</th>
                      <th className="text-right px-5 py-3 font-bold text-slate-600">Amount</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((expense, i) => (
                      <tr key={expense.id || i} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-5 py-4 text-slate-400 font-medium">{i + 1}</td>
                        <td className="px-5 py-4">
                          <span className="text-slate-900 font-medium">{CATEGORY_LABELS[expense.category] || expense.category}</span>
                        </td>
                        <td className="px-5 py-4 text-slate-700">{expense.description}</td>
                        <td className="px-5 py-4 text-slate-500">{expense.expense_date || "—"}</td>
                        <td className="px-5 py-4 text-right text-slate-700 font-medium">₹{parseFloat(expense.amount || 0).toLocaleString()}</td>
                        <td className="px-5 py-4 text-right font-bold text-slate-900">₹{parseFloat(expense.amount || 0).toLocaleString()}</td>
                        <td className="px-3">
                          <button onClick={() => handleDelete(expense.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-5 py-8 text-center text-slate-400">No expenses recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t border-slate-200 bg-slate-50">
                <div className="max-w-xs ml-auto px-5 py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-bold text-slate-900">₹ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tax (5%)</span>
                    <span className="font-medium text-slate-700">₹ {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Discount</span>
                    <span className="font-medium text-slate-700">₹ {discount}</span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-900">Grand Total</span>
                    <span className="font-bold text-slate-900 text-lg">₹ {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Expense */}
            {showAddForm && (
              <div className="bg-white border-2 border-dashed border-brand-300 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Add Expense</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <input type="text" placeholder="Description" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} />
                  <input type="number" placeholder="Amount (₹)" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddExpense} className="px-5 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600">Add</button>
                  <button onClick={() => setShowAddForm(false)} className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl">Cancel</button>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowAddForm(true)} className="flex-1 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-brand-500 hover:text-brand-600 transition-all">
                + Add Expense
              </button>
              <button onClick={() => window.print()} className="flex-1 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-all">
                Download Invoice
              </button>
              <button onClick={() => window.print()} className="flex-1 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-all">
                Export as PDF
              </button>
              <button className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all">
                Mark as Paid
              </button>
            </div>
          </div>

          {/* Budget Insights Sidebar */}
          <div className="w-full lg:w-72">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-8">
              <h3 className="text-sm font-bold text-slate-900 mb-5">Budget Insights</h3>

              {/* Simple Donut Chart */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                    {(() => {
                      let offset = 0;
                      return Object.entries(byCategory).map(([cat, amount]) => {
                        const percent = subtotal > 0 ? (amount / subtotal) * 100 : 0;
                        const dashArray = `${percent} ${100 - percent}`;
                        const el = (
                          <circle
                            key={cat}
                            cx="18" cy="18" r="15.915"
                            fill="none"
                            stroke={categoryColors[cat] || "#6b7280"}
                            strokeWidth="3"
                            strokeDasharray={dashArray}
                            strokeDashoffset={-offset}
                            strokeLinecap="round"
                          />
                        );
                        offset += percent;
                        return el;
                      });
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-900">{Math.round((grandTotal / (totalBudget || 1)) * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Budget</span>
                  <span className="font-bold text-slate-900">₹{totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Spent</span>
                  <span className="font-bold text-slate-900">₹{grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Remaining</span>
                  <span className={`font-bold ${remaining >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    ₹{remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Category legend */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                {Object.entries(byCategory).map(([cat, amount]) => (
                  <div key={cat} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoryColors[cat] || "#6b7280" }} />
                    <span className="flex-1 text-slate-600">{CATEGORY_LABELS[cat] || cat}</span>
                    <span className="font-bold text-slate-900">₹{amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <Link href={`/trips/${tripId}/view`} className="mt-4 block w-full text-center py-3 bg-white border border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:border-slate-300 transition-all">
                View Full Budget
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
