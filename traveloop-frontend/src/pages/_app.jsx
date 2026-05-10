import Head from "next/head";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");

  return (
    <>
      <Head>
        <title>Traveloop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="font-sans antialiased text-slate-900 min-h-screen bg-white">
        {isDashboard ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </>
  );
}
