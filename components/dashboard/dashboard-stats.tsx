import { Flame, Zap, BookOpen, Clock, TrendingUp } from "lucide-react";

interface UserData {
  xp: number;
  level: number;
  streak: number;
  totalLessons: number;
  totalPracticeMinutes: number;
}

interface DashboardStatsProps {
  userData: UserData;
}

export function DashboardStats({ userData }: DashboardStatsProps) {
  const xpToNextLevel = (userData.level * 100) - (userData.xp % (userData.level * 100));
  const levelProgress = ((userData.xp % (userData.level * 100)) / (userData.level * 100)) * 100;

  const stats = [
    {
      icon: Zap,
      label: "Total XP",
      value: userData.xp.toLocaleString(),
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: TrendingUp,
      label: "Level",
      value: userData.level,
      subtext: `${xpToNextLevel} XP to next level`,
      progress: levelProgress,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Flame,
      label: "Day Streak",
      value: userData.streak,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: BookOpen,
      label: "Lessons Completed",
      value: userData.totalLessons,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Clock,
      label: "Practice Time",
      value: `${userData.totalPracticeMinutes}m`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="glass rounded-2xl p-4">
          <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          {stat.progress !== undefined && (
            <div className="mt-2">
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
