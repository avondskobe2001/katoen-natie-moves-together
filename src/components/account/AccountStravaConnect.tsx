"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, CheckCircle2, Loader2, RefreshCw, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface StravaStatus {
  configured: boolean;
  connected: boolean;
  athleteId: number | null;
}

interface SyncResult {
  totalDistance: number;
  totalElevation: number;
  activityCount: number;
}

export function AccountStravaConnect() {
  const [status, setStatus] = useState<StravaStatus | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    const res = await fetch("/api/strava/status");
    const data = await res.json();
    setStatus(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/strava/sync", { method: "POST" });
      if (res.ok) setSyncResult(await res.json());
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    await fetch("/api/strava/disconnect", { method: "POST" });
    setSyncResult(null);
    fetchStatus();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-kn-red" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#FC4C02]/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FC4C02]/10">
            <Activity className="h-5 w-5 text-[#FC4C02]" />
          </div>
          <div>
            <CardTitle className="text-lg">Strava</CardTitle>
            <p className="text-sm text-muted-foreground">Link Strava to sync rides and challenges</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!status?.configured ? (
          <p className="text-sm text-muted-foreground">
            Strava is not configured on this server. Ask your administrator to add API credentials.
          </p>
        ) : status.connected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Strava linked to your account</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSync} disabled={syncing} className="bg-[#FC4C02] hover:bg-[#e04400] text-white">
                {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Sync activities
              </Button>
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                <Unlink className="h-4 w-4" /> Unlink
              </Button>
            </div>
            {syncResult && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-kn-red">{formatNumber(syncResult.totalDistance)}</p>
                  <p className="text-xs text-muted-foreground">km synced</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{formatNumber(syncResult.totalElevation)}</p>
                  <p className="text-xs text-muted-foreground">elevation (m)</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{syncResult.activityCount}</p>
                  <p className="text-xs text-muted-foreground">rides</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your Strava account to automatically log cycling distance for challenges and the Tour de France.
            </p>
            <Button asChild className="bg-[#FC4C02] hover:bg-[#e04400] text-white">
              <a href="/api/strava/auth?return_to=account">
                <Activity className="h-4 w-4" /> Link Strava
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}