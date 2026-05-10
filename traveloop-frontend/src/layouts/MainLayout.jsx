import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      <Navbar />
      <main className="animate-in fade-in duration-1000">
        {children}
      </main>
      <Footer />
    </div>
  );
}
