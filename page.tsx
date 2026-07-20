"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      router.replace(session ? "/dashboard" : "/login");
    });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <p className="font-mono text-sm text-steel">Loading…</p>
    </div>
  );
}
