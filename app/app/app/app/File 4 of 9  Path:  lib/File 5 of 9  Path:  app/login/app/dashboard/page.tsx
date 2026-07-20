"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
        return;
      }
      setUser(session.user);
      setChecking(false);
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-mono text-sm text-steel">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-rail">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
              Kitchen Tracker
            </p>
            <h1 className="font-display text-lg font-bold text-paper">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden font-mono text-xs text-paper/60 sm:block">
              {user?.email}
            </p>
            <button
              onClick={handleSignOut}
              className="border border-paper/30 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-paper transition hover:bg-paper/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="border border-dashed border-steel/40 bg-white/50 px-8 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            Next up
          </p>
          <h2 className="mt-2 font-display text-xl font-bold text-ink">
            Inventory tracking goes here
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-steel">
            This is the shell — sign-in and routing are working. The next
            build step wires up the inventory table so you can log stock
            coming in and out.
          </p>
        </div>
      </main>
    </div>
  );
}
