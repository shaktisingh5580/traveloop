import Head from "next/head";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { AuthProvider } from "@/context/AuthContext";
import AuthModals from "@/components/auth/AuthModals";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard") ||
                      router.pathname.startsWith("/trips") ||
                      router.pathname.startsWith("/cities") ||
                      router.pathname.startsWith("/community") ||
                      router.pathname.startsWith("/profile") ||
                      router.pathname.startsWith("/activities") ||
                      router.pathname.startsWith("/settings") ||
                      router.pathname.startsWith("/booking");
  const isAuth = router.pathname.startsWith("/login") || router.pathname.startsWith("/signup");

  return (
    <AuthProvider>
      <AuthModals />
      <Head>
        <title>Traveloop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isAuth ? (
        <Component {...pageProps} />
      ) : isDashboard ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </AuthProvider>
  );
}
