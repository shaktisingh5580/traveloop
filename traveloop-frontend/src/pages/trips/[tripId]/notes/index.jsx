import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/lib/api";

export default function TripNotes() {
  const router = useRouter();
  const { tripId } = router.query;
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", note_date: "", stop_id: "" });

  // Fetch data
  useEffect(() => {
    if (!tripId) return;
    const fetchData = async () => {
      try {
        const [tripData, notesData, stopsData] = await Promise.all([
          api.get(`/trips/${tripId}`).catch(() => null),
          api.get(`/trips/${tripId}/notes`).catch(() => []),
          api.get(`/trips/${tripId}/stops`).catch(() => []),
        ]);
        setTrip(tripData);
        setNotes(notesData || []);
        setStops(stopsData || []);
      } catch (err) {
        console.error("Failed to load notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  // Add note
  const handleAddNote = async () => {
    if (!formData.title.trim() && !formData.content.trim()) return;
    try {
      const created = await api.post(`/trips/${tripId}/notes`, {
        title: formData.title || "Untitled Note",
        content: formData.content,
        note_date: formData.note_date || new Date().toISOString().split("T")[0],
        stop_id: formData.stop_id || null,
      });
      setNotes([created, ...notes]);
      setFormData({ title: "", content: "", note_date: "", stop_id: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  // Update note
  const handleUpdateNote = async () => {
    if (!editingId) return;
    try {
      const updated = await api.put(`/trips/${tripId}/notes/${editingId}`, {
        title: formData.title,
        content: formData.content,
        note_date: formData.note_date || null,
        stop_id: formData.stop_id || null,
      });
      setNotes(notes.map(n => n.id === editingId ? { ...n, ...updated } : n));
      setEditingId(null);
      setFormData({ title: "", content: "", note_date: "", stop_id: "" });
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId) => {
    if (!confirm("Delete this note?")) return;
    setNotes(notes.filter(n => n.id !== noteId));
    try {
      await api.del(`/trips/${tripId}/notes/${noteId}`);
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  // Start editing
  const startEdit = (note) => {
    setEditingId(note.id);
    setFormData({
      title: note.title || "",
      content: note.content || "",
      note_date: note.note_date || "",
      stop_id: note.stop_id || "",
    });
    setShowAddForm(false);
  };

  // Filter & sort
  const filtered = notes
    .filter(n => {
      if (filterTab === "by_day" && !n.note_date) return false;
      if (filterTab === "by_stop" && !n.stop_id) return false;
      return true;
    })
    .filter(n =>
      (n.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.content || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      if (sortBy === "oldest") return new Date(a.created_at || 0) - new Date(b.created_at || 0);
      if (sortBy === "date") return (a.note_date || "").localeCompare(b.note_date || "");
      return 0;
    });

  // Find stop name by ID
  const getStopName = (stopId) => {
    const stop = stops.find(s => s.id === stopId);
    return stop?.city?.name || stop?.city_name || "";
  };

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
      <Head><title>Trip Notes | Traveloop</title></Head>
      <div className="max-w-3xl mx-auto space-y-5 pb-20">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-brand-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={filterTab} onChange={(e) => setFilterTab(e.target.value)}>
            <option value="all">Group by: All</option>
            <option value="by_day">By Day</option>
            <option value="by_stop">By Stop</option>
          </select>
          <button className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-colors">Filter</button>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="date">Sort: Date</option>
          </select>
        </div>

        {/* Title + Trip selector + Add button */}
        <h1 className="text-xl font-bold text-slate-900 font-outfit">Trip Notes</h1>

        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium">
            <span className="text-slate-500">Trip:</span>
            <span className="font-bold text-slate-900">{trip?.name || "Select trip"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          <button
            onClick={() => { setShowAddForm(true); setEditingId(null); setFormData({ title: "", content: "", note_date: "", stop_id: "" }); }}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-brand-500 hover:text-brand-600 transition-all flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            + Add Note
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2">
          {[
            { key: "all", label: "All" },
            { key: "by_day", label: "by Day" },
            { key: "by_stop", label: "by Stop" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === tab.key
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add / Edit Form */}
        {(showAddForm || editingId) && (
          <div className="bg-white border-2 border-dashed border-brand-300 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">{editingId ? "Edit Note" : "New Note"}</h3>
            <input
              type="text"
              placeholder="Note title (e.g. Hotel check-in details)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              autoFocus
            />
            <textarea
              rows={3}
              placeholder="Write your note here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 resize-none"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Date</label>
                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500" value={formData.note_date} onChange={(e) => setFormData({ ...formData, note_date: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Stop (optional)</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500" value={formData.stop_id} onChange={(e) => setFormData({ ...formData, stop_id: e.target.value })}>
                  <option value="">No specific stop</option>
                  {stops.map(s => <option key={s.id} value={s.id}>{s.city?.name || s.city_name || `Stop ${s.sort_order + 1}`}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={editingId ? handleUpdateNote : handleAddNote} className="px-5 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600 transition-all">
                {editingId ? "Save Changes" : "Add Note"}
              </button>
              <button onClick={() => { setShowAddForm(false); setEditingId(null); }} className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        )}

        {/* Notes List */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900">
                      {note.title || "Untitled"}
                      {note.stop_id && (
                        <span className="text-slate-400 font-normal"> – {getStopName(note.stop_id)} stop</span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed line-clamp-2">{note.content}</p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                      {note.note_date || new Date(note.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Edit / Delete buttons */}
                  <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(note)}
                      className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-400 text-sm mb-4">No notes yet for this trip.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-sm font-bold text-brand-500 hover:text-brand-600"
            >
              + Add your first note
            </button>
          </div>
        )}
      </div>
    </>
  );
}
