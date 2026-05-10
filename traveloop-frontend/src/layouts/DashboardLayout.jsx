import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white selection:bg-brand-100 selection:text-brand-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50/30 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <Topbar />
        
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
