import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";

export function SupabaseSetupNotice() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="font-semibold">Supabase not configured</p>
          <p>
            Registration requires a free Supabase project. Use the setup wizard to connect in a few minutes.
          </p>
        </div>
      </div>
      <Button asChild className="w-full">
        <Link href="/setup">
          Open setup wizard <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}