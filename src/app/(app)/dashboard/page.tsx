"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import FinancialHealthScore from "@/components/dashboard/FinancialHealthScore";
import TaxSavingsCounter from "@/components/dashboard/TaxSavingsCounter";
import MicroTaskCard from "@/components/dashboard/MicroTaskCard";
import QuickActions from "@/components/dashboard/QuickActions";

interface UserProfile {
  full_name: string;
  health_score: number;
  total_tax_saved: number;
  streak_days: number;
  onboarding_completed: boolean;
}

interface MicroTask {
  id: string;
  title: string;
  description: string | null;
  type: string;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tasks, setTasks] = useState<MicroTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const [profileRes, tasksRes] = await Promise.all([
        supabase.from("users").select("*").eq("id", user.id).single(),
        supabase
          .from("micro_tasks")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (tasksRes.data) setTasks(tasksRes.data);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-navy-100 rounded animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-white border border-navy-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">
          {profile?.full_name
            ? `Welcome back, ${profile.full_name.split(" ")[0]}`
            : "Welcome back"}
        </h1>
        <p className="text-sm text-navy-500">
          Here&apos;s how your business finances are looking.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <TaxSavingsCounter totalSaved={profile?.total_tax_saved || 0} />
        <FinancialHealthScore score={profile?.health_score || 50} />
        <QuickActions />

        {/* Row 2 */}
        <div className="sm:col-span-2 lg:col-span-2">
          <MicroTaskCard tasks={tasks} />
        </div>

        {/* Streak */}
        <div className="bg-white border border-navy-100 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-navy-500 mb-3">
            Bookkeeping Streak
          </h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-navy-900">
              {profile?.streak_days || 0}
            </p>
            <p className="text-sm text-navy-500 mt-1">days in a row</p>
            {(profile?.streak_days || 0) >= 7 && (
              <p className="text-xs text-teal-600 font-medium mt-2">
                You&apos;re on fire! Keep it up.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Disclaimer */}
      <div className="mt-8 bg-navy-50 border border-navy-100 rounded-xl p-4">
        <p className="text-xs text-navy-500 text-center">
          The Accountant is an AI-powered tool. It provides guidance and
          education, not regulated financial advice. Always verify important
          decisions with a qualified accountant or HMRC directly.
        </p>
      </div>
    </div>
  );
}
