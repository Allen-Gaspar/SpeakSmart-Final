import { Award, Star, Flame, BookOpen, Mic, Trophy, Target, Zap, Crown, Medal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  requirement: string;
}

const allAchievements: Achievement[] = [
  {
    id: "welcome",
    name: "Welcome",
    description: "Started your language learning journey",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    requirement: "Create an account",
  },
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Completed your first lesson",
    icon: BookOpen,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    requirement: "Complete 1 lesson",
  },
  {
    id: "voice-master",
    name: "Voice Master",
    description: "Recorded 10 voice samples",
    icon: Mic,
    color: "text-primary",
    bgColor: "bg-primary/10",
    requirement: "Record 10 voice samples",
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintained a 7-day streak",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    requirement: "7 day streak",
  },
  {
    id: "streak-30",
    name: "Monthly Master",
    description: "Maintained a 30-day streak",
    icon: Flame,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    requirement: "30 day streak",
  },
  {
    id: "perfect-score",
    name: "Perfectionist",
    description: "Achieved 100% on a lesson",
    icon: Target,
    color: "text-accent",
    bgColor: "bg-accent/10",
    requirement: "100% lesson score",
  },
  {
    id: "level-5",
    name: "Rising Star",
    description: "Reached level 5",
    icon: Trophy,
    color: "text-primary",
    bgColor: "bg-primary/10",
    requirement: "Reach level 5",
  },
  {
    id: "level-10",
    name: "Language Explorer",
    description: "Reached level 10",
    icon: Award,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    requirement: "Reach level 10",
  },
  {
    id: "xp-1000",
    name: "XP Hunter",
    description: "Earned 1,000 XP",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    requirement: "Earn 1,000 XP",
  },
  {
    id: "xp-10000",
    name: "XP Champion",
    description: "Earned 10,000 XP",
    icon: Crown,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    requirement: "Earn 10,000 XP",
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "Practiced 5 different languages",
    icon: Medal,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    requirement: "Practice 5 languages",
  },
];

interface AchievementsListProps {
  achievements: string[];
  level: number;
}

export function AchievementsList({ achievements, level }: AchievementsListProps) {
  const earnedAchievements = allAchievements.filter((a) => achievements.includes(a.id));
  const lockedAchievements = allAchievements.filter((a) => !achievements.includes(a.id));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Achievements</h2>
      
      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Unlocked ({earnedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {earnedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="glass rounded-2xl p-4 flex items-center gap-4"
              >
                <div className={`w-14 h-14 rounded-xl ${achievement.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <achievement.icon className={`w-7 h-7 ${achievement.color}`} />
                </div>
                <div>
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Locked ({lockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="glass rounded-2xl p-4 flex items-center gap-4 opacity-50"
              >
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <achievement.icon className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.requirement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
