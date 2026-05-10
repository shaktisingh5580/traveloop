import Head from "next/head";
import Navbar from "@/components/common/Navbar";
import Hero from "@/sections/home/Hero";
import Trending from "@/sections/home/Trending";

export default function Home() {
  return (
    <>
      <Head>
        <title>Traveloop | Premium Trip Planner</title>
        <meta name="description" content="Plan your next adventure with Traveloop. Modern, simple, and collaborative travel planning." />
      </Head>

      <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <Hero />
        <Trending />
      </div>
    </>
  );
}
