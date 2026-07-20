"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rail px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Ticket stub card */}
        <div className="relative bg-paper shadow-xl">
          {/* Perforated top edge */}
          <div className="ticket-edge h-3 w-full bg-rail" />

          <div className="px-8 py-10">
            <div className="mb-8 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                Kitchen Tracker
              </p>
              <h1 className="mt-2 font-display text-2xl font-bold text-ink">
                Clock in
              </h1>
              <p className="mt-1 text-sm text-steel">
                Sign in to check today&rsquo;s stock.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block font-mono text-xs uppercase tracking-wide text-steel"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-steel/30 bg-white px-3 py-2 text-ink outline-none focus:border-amber"
                  placeholder="you@yourkitchen.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block font-mono text-xs uppercase tracking-wide text-steel"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-steel/30 bg-white px-3 py-2 text-ink outline-none focus:border-amber"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="border border-clay/30 bg-clay/10 px-3 py-2 text-sm text-clay">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rail py-2.5 font-display font-semibold text-paper transition hover:bg-ink disabled:opacity-50"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>

          {/* Perforated bottom edge */}
          <div className="ticket-edge h-3 w-full bg-rail" />
        </div>

        <p className="mt-6 text-center font-mono text-xs text-paper/50">
          New kitchen? Ask your manager for an invite.
        </p>
      </div>
    </div>
  );
}
