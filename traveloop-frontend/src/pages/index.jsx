import Head from "next/head";
import Hero from "@/sections/home/Hero";
import Trending from "@/sections/home/Trending";
import { useState, useEffect } from "react";
import * as api from "@/lib/api";

export default function Home() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    api.get("/cities/popular").then(res => setDestinations(res || [])).catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>Traveloop | India's Premium Trip Planner</title>
        <meta name="description" content="Plan your next Indian adventure with Traveloop. Modern, simple, and collaborative travel planning." />
      </Head>

      <Hero />
      <Trending destinations={destinations} />
      
      {/* Placeholder Sections for Navigation */}
      <section id="features" className="py-24 bg-slate-50 scroll-mt-20">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Intelligent Features</h2>
            <p className="text-slate-500">Discover what makes Traveloop the best planning tool.</p>
         </div>
      </section>

      <section id="community" className="py-24 bg-white scroll-mt-20">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Traveler Community</h2>
            <p className="text-slate-500">Connect with fellow explorers across India.</p>
         </div>
      </section>

      <section id="pricing" className="py-24 bg-slate-50 scroll-mt-20">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-slate-500">Start planning your dream escape for free today.</p>
         </div>
      </section>
    </>
  );
}
