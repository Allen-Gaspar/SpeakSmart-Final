"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProfileStats } from "@/components/profile/profile-stats";
import { AchievementsList } from "@/components/profile/achievements-list";
import { Loader2, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
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
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="glass rounded-3xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center glow">
                  {userData.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={userData.displayName || "User"}
                      className="w-24 h-24 rounded-full"
                    />
                  ) : (
                    <User className="w-12 h-12 text-primary" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {userData.level}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-1">{userData.displayName}</h1>
                <p className="text-muted-foreground mb-4">{userData.email}</p>
                
                {/* Level Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Level {userData.level}</span>
                    <span className="text-muted-foreground">
                      {userData.xp % (userData.level * 100)} / {userData.level * 100} XP
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ 
                        width: `${((userData.xp % (userData.level * 100)) / (userData.level * 100)) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {userData.xp.toLocaleString()} Total XP
                  </span>
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm">
                    {userData.streak} Day Streak
                  </span>
                </div>
              </div>

              {/* Settings Button */}
              <Link href="/settings">
                <Button variant="outline" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <ProfileStats userData={userData} />

          {/* Achievements */}
          <AchievementsList achievements={userData.achievements} level={userData.level} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
