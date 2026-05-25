import { Zap, Flame, BookOpen, Clock, Trophy, Target } from "lucide-react";

interface UserData {
  xp: number;
  level: number;
  streak: number;
  totalLessons: number;
  totalPracticeMinutes: number;
}

interface ProfileStatsProps {
  userData: UserData;
}

export function ProfileStats({ userData }: ProfileStatsProps) {
  const stats = [
    {
      icon: Zap,
      label: "Total XP",
      value: userData.xp.toLocaleString(),
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Trophy,
      label: "Level",
      value: userData.level,
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
      label: "Lessons",
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
    {
      icon: Target,
      label: "Accuracy",
      value: "82%",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Your Statistics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass rounded-2xl p-4 text-center">
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
