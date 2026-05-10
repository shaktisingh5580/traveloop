import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TripIndex() {
  const router = useRouter();
  const { tripId } = router.query;

  useEffect(() => {
    if (tripId) {
      router.replace(`/trips/${tripId}/view`);
    }
  }, [tripId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
