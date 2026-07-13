"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, X } from "lucide-react";

export function StravaCallbackNotice() {
  const searchParams = useSearchParams();
  const stravaStatus = searchParams.get("strava");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (stravaStatus === "connected" || stravaStatus === "error") {
      setVisible(true);
    }
  }, [stravaStatus]);

  if (!visible || !stravaStatus) return null;

  const isSuccess = stravaStatus === "connected";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border px-5 py-4 shadow-xl backdrop-blur-sm ${
        isSuccess
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-red-500/30 bg-red-500/10"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
      ) : (
        <XCircle className="h-5 w-5 text-red-400" />
      )}
      <p className="text-sm font-medium">
        {isSuccess
          ? "Strava connected! Your activities will sync automatically."
          : "Failed to connect Strava. Please try again."}
      </p>
      <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}