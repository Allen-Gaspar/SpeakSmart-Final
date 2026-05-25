"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Trophy, Medal, Flame, Zap, Crown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

// Mock leaderboard data - will be replaced with Firestore data
const mockLeaderboard = [
  { rank: 1, name: "Maria Garcia", xp: 15420, level: 32, streak: 45, avatar: null },
  { rank: 2, name: "John Smith", xp: 14890, level: 30, streak: 38, avatar: null },
  { rank: 3, name: "Yuki Tanaka", xp: 13750, level: 28, streak: 52, avatar: null },
  { rank: 4, name: "Hans Mueller", xp: 12340, level: 25, streak: 21, avatar: null },
  { rank: 5, name: "Sophie Chen", xp: 11200, level: 23, streak: 33, avatar: null },
  { rank: 6, name: "Ahmed Hassan", xp: 10890, level: 22, streak: 19, avatar: null },
  { rank: 7, name: "Isabella Rossi", xp: 9760, level: 20, streak: 28, avatar: null },
  { rank: 8, name: "James Wilson", xp: 8450, level: 18, streak: 15, avatar: null },
  { rank: 9, name: "Lisa Park", xp: 7890, level: 17, streak: 42, avatar: null },
  { rank: 10, name: "Carlos Rodriguez", xp: 7120, level: 15, streak: 12, avatar: null },
];

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>;
  }
}

function getRankBg(rank: number) {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-transparent border-yellow-500/30";
    case 2:
      return "bg-gradient-to-r from-gray-400/20 via-gray-400/10 to-transparent border-gray-400/30";
    case 3:
      return "bg-gradient-to-r from-amber-600/20 via-amber-600/10 to-transparent border-amber-600/30";
    default:
      return "bg-card/50 border-border";
  }
}

export default function LeaderboardPage() {
  const { userData } = useAuth();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 glow">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
              Compete with language learners from around the world. Earn XP by completing lessons and practicing!
            </p>
          </div>

          {/* User's Position */}
          {userData && (
            <div className="glass rounded-2xl p-6 mb-8 border border-primary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {userData.photoURL ? (
                      <img
                        src={userData.photoURL}
                        alt={userData.displayName || "You"}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <span className="text-lg font-bold text-primary">
                        {userData.displayName?.charAt(0) || "Y"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">Your Position</p>
                    <p className="text-sm text-muted-foreground">{userData.displayName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{userData.xp.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">Level {userData.level}</p>
                    <p className="text-sm text-muted-foreground">{userData.streak} day streak</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Global Rankings</h2>
            </div>
            
            <div className="divide-y divide-border">
              {mockLeaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 ${getRankBg(user.rank)} border-l-4 transition-colors hover:bg-secondary/30`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-10 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {user.name.charAt(0)}
                      </span>
                    </div>

                    {/* Name & Level */}
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">Level {user.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Streak */}
                    <div className="hidden sm:flex items-center gap-1 text-orange-500">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-medium">{user.streak}</span>
                    </div>

                    {/* XP */}
                    <div className="flex items-center gap-1 text-primary">
                      <Zap className="w-5 h-5" />
                      <span className="font-bold">{user.xp.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Leaderboard updates every hour. Keep practicing to climb the ranks!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
