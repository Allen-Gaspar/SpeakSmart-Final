"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickPractice } from "@/components/dashboard/quick-practice";
import { AchievementBanner } from "@/components/dashboard/achievement-banner";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!user || !userData) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, <span className="gradient-text">{userData.displayName}</span>
            </h1>
            <p className="text-muted-foreground">
              Continue your language learning journey. You&apos;re on a {userData.streak} day streak!
            </p>
          </div>

          {/* Achievement Banner */}
          <AchievementBanner userData={userData} />

          {/* Stats Grid */}
          <DashboardStats userData={userData} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <QuickPractice />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
