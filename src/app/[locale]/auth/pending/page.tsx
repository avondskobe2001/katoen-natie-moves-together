import { Clock } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";

export default function PendingApprovalPage() {
  return (
    <AuthShell
      title="Awaiting approval"
      subtitle="Your registration is being reviewed by the Katoen Natie team"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <Clock className="h-7 w-7 text-amber-700" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You registered with a personal email address. A Katoen Natie administrator will review your
          request and approve your account. You will receive access once approved.
        </p>
        <p className="text-xs text-muted-foreground">
          Katoen Natie employees can register instantly with their <strong>@katoennatie.com</strong> email.
        </p>
        <Button variant="outline" asChild>
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </AuthShell>
  );
}