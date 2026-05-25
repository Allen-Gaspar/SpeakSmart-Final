import { Award, Star, Trophy } from "lucide-react";

interface UserData {
  xp: number;
  level: number;
  streak: number;
  achievements: string[];
}

interface AchievementBannerProps {
  userData: UserData;
}

const milestones = [
  { level: 5, title: "Rising Star", icon: Star },
  { level: 10, title: "Language Explorer", icon: Trophy },
  { level: 25, title: "Polyglot Master", icon: Award },
];

export function AchievementBanner({ userData }: AchievementBannerProps) {
  // Find the next milestone
  const nextMilestone = milestones.find((m) => m.level > userData.level) || milestones[milestones.length - 1];
  const prevMilestone = milestones.filter((m) => m.level <= userData.level).pop();
  const progress = prevMilestone
    ? ((userData.level - prevMilestone.level) / (nextMilestone.level - prevMilestone.level)) * 100
    : (userData.level / nextMilestone.level) * 100;

  // Show celebration banner for new achievements
  if (userData.achievements.includes("welcome") && userData.level === 1) {
    return (
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center glow-sm">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Welcome to SPEAKSMART!</p>
            <p className="text-sm text-muted-foreground">
              You&apos;ve earned the Welcome badge. Complete your first lesson to level up!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <nextMilestone.icon className="w-5 h-5 text-primary" />
          <span className="font-medium">Next Milestone: {nextMilestone.title}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          Level {userData.level} / {nextMilestone.level}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
