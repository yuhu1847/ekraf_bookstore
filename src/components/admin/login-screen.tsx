"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Info, Lock, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useStore, DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/store";

/** Admin login — validated against demo credentials, session kept in localStorage. */
export function LoginScreen() {
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // tiny delay so the button shows a real busy state
    window.setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) {
        toast.success("Welcome back", { description: "Signed in as site admin." });
      } else {
        setError("Invalid email or password. Try the demo credentials below.");
      }
    }, 350);
  }

  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = "";
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-mocha-deep shadow-sm backdrop-blur transition-colors hover:text-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mocha"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to store
        </Link>

        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-lg shadow-espresso/5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mocha text-cream">
              <BookOpen className="h-5.5 w-5.5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-heading text-xl font-extrabold text-espresso">
                Ink &amp; Ember
              </h1>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Admin panel
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@inkember.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-mocha-deep"
            >
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <LogIn className="ml-2 h-4 w-4" aria-hidden="true" />}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-mocha/25 bg-accent/60 px-4 py-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-mocha-deep" aria-hidden="true" />
            <div className="text-sm">
              <p className="font-semibold text-espresso">Demo credentials</p>
              <p className="mt-0.5 text-muted-foreground">
                Email <code className="font-semibold text-mocha-deep">{DEMO_EMAIL}</code>
                {" · "}Password{" "}
                <code className="font-semibold text-mocha-deep">{DEMO_PASSWORD}</code>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo mode — the session and all data live in your browser only.
        </p>
      </div>
    </main>
  );
}
