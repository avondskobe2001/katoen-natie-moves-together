"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { getEmailType, isKatoenNatieEmail } from "@/lib/auth/email";
import { terminals } from "@/data/terminals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Link } from "@/lib/i18n/navigation";
import { AlertCircle, Building2, CheckCircle2, Loader2, Mail } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terminalId, setTerminalId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const emailType = useMemo(() => (email.includes("@") ? getEmailType(email) : null), [email]);
  const selectedTerminal = terminals.find((t) => t.id === terminalId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password || !terminalId || !birthDate) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const birth = new Date(birthDate);
    if (Number.isNaN(birth.getTime()) || birth > new Date()) {
      setError("Please enter a valid birth date.");
      return;
    }

    if (!selectedTerminal) {
      setError("Please select a valid terminal.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            name: name.trim(),
            terminal: selectedTerminal.name,
            terminal_id: selectedTerminal.id,
            country: selectedTerminal.country,
            region: selectedTerminal.region,
            birth_date: birthDate,
            email_type: getEmailType(email),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user && !data.session) {
        setSuccess(true);
        return;
      }

      if (isKatoenNatieEmail(email)) {
        router.push("/account");
      } else {
        router.push("/auth/pending");
      }
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-3">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
        <h3 className="font-bold text-lg">Check your email</h3>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to <strong>{email}</strong>. After confirming, you can sign in.
          {emailType === "personal" && (
            <> Your personal email registration will be reviewed by the Katoen Natie team before full access is granted.</>
          )}
        </p>
        <Button asChild variant="outline">
          <Link href="/auth/login">Go to Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sophie Van Der Berg" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@katoennatie.com"
          required
        />
        {emailType === "corporate" && (
          <p className="flex items-center gap-1.5 text-xs text-emerald-700">
            <Building2 className="h-3.5 w-3.5" />
            Katoen Natie email — instant access after confirmation
          </p>
        )}
        {emailType === "personal" && (
          <p className="flex items-center gap-1.5 text-xs text-amber-700">
            <Mail className="h-3.5 w-3.5" />
            Personal email — requires approval by the Katoen Natie team
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="terminal">Terminal</Label>
        <Select id="terminal" value={terminalId} onChange={(e) => setTerminalId(e.target.value)} required>
          <option value="">Select your terminal</option>
          {terminals.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} — {t.country}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">Birth date</Label>
        <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-kn-red hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}