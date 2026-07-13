"use client";

import { useState } from "react";
import { CheckCircle2, Copy, ExternalLink, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/lib/i18n/navigation";

const SQL_FILE = "supabase/setup-all.sql";

export function SupabaseSetupWizard() {
  const [url, setUrl] = useState("");
  const [anonKey, setAnonKey] = useState("");
  const [serviceKey, setServiceKey] = useState("");
  const [adminEmails, setAdminEmails] = useState("admin@katoennatie.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/dev/configure-supabase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, anonKey, serviceKey, adminEmails }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save credentials");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Could not save credentials. Try editing .env.local manually.");
    } finally {
      setLoading(false);
    }
  };

  const copySql = async () => {
    try {
      const res = await fetch("/api/dev/setup-sql");
      const sql = await res.text();
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Could not copy SQL. Open supabase/setup-all.sql in your project folder.");
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
        <h3 className="text-xl font-bold">Credentials saved!</h3>
        <p className="text-sm text-muted-foreground">
          Restart the dev server for changes to take effect:
        </p>
        <code className="block text-xs bg-muted rounded-lg p-3 text-left">
          Ctrl+C in terminal → npm run dev
        </code>
        <p className="text-sm text-muted-foreground">
          Then run the SQL in Supabase (step 2 below) if you haven&apos;t already.
        </p>
        <Button asChild>
          <Link href="/auth/register">Go to Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-kn-red text-white text-sm font-bold">1</span>
          <h3 className="font-bold">Create a Supabase project</h3>
        </div>
        <p className="text-sm text-muted-foreground pl-9">
          Free account at supabase.com. Create a new project (takes ~2 minutes).
        </p>
        <div className="pl-9">
          <Button variant="outline" size="sm" asChild>
            <a href="https://supabase.com/dashboard/new" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Open Supabase Dashboard
            </a>
          </Button>
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-kn-red text-white text-sm font-bold">2</span>
          <h3 className="font-bold">Run the database setup SQL</h3>
        </div>
        <p className="text-sm text-muted-foreground pl-9">
          In Supabase → <strong>SQL Editor</strong> → New query → paste the contents of{" "}
          <code className="text-xs bg-muted px-1 rounded">{SQL_FILE}</code> → Run.
        </p>
        <p className="text-sm text-muted-foreground pl-9">
          Also enable <strong>Authentication → Providers → Email</strong>.
        </p>
        <div className="pl-9">
          <Button variant="outline" size="sm" onClick={copySql}>
            {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "SQL copied to clipboard!" : "Copy setup SQL to clipboard"}
          </Button>
        </div>
      </div>

      {/* Step 3 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-kn-red text-white text-sm font-bold">3</span>
          <h3 className="font-bold">Paste your API keys</h3>
        </div>
        <p className="text-sm text-muted-foreground pl-9">
          Supabase → <strong>Project Settings → API</strong>. Copy Project URL and anon public key.
        </p>

        <form onSubmit={handleSave} className="pl-9 space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="supabase-url">Project URL</Label>
            <Input
              id="supabase-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://abcdefgh.supabase.co"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="anon-key">anon public key</Label>
            <Input
              id="anon-key"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-key">service_role key (optional, for admin approvals)</Label>
            <Input
              id="service-key"
              value={serviceKey}
              onChange={(e) => setServiceKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-emails">Admin emails (comma-separated)</Label>
            <Input
              id="admin-emails"
              value={adminEmails}
              onChange={(e) => setAdminEmails(e.target.value)}
              placeholder="admin@katoennatie.com"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Save &amp; connect Supabase
          </Button>
        </form>
      </div>
    </div>
  );
}