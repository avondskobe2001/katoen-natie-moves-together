import { format } from "date-fns";
import { User, MapPin, Mail, Calendar, Building2 } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth/profile";
import { AccountStravaConnect } from "@/components/account/AccountStravaConnect";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function AccountPage() {
  const profile = await getCurrentProfile();

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">My profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account and connected services</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-kn-red text-white">
              <User className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>{profile.name}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant={profile.emailType === "corporate" ? "default" : "secondary"}>
                  {profile.emailType === "corporate" ? "Katoen Natie email" : "Personal email"}
                </Badge>
                <Badge variant="success">Approved</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-kn-red" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="h-4 w-4 text-kn-red" />
            <span>{profile.terminal}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-kn-red" />
            <span>{profile.country}</span>
          </div>
          {profile.birthDate && (
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-kn-red" />
              <span>{format(new Date(profile.birthDate), "MMMM d, yyyy")}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <AccountStravaConnect />

      {profile.isAdmin && (
        <Card className="border-kn-red/20 bg-kn-red-soft/30">
          <CardContent className="py-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Administrator</p>
              <p className="text-sm text-muted-foreground">Review pending personal email registrations</p>
            </div>
            <Button asChild size="sm">
              <Link href="/account/admin">Open admin panel</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}