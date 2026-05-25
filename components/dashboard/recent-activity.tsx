"use client";

import { Clock, Mic, Award, BookOpen } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "practice" | "lesson" | "achievement";
  title: string;
  description: string;
  timestamp: string;
}

// Mock data - will be replaced with Firestore data
const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "practice",
    title: "Speaking Practice",
    description: "Practiced English pronunciation",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "lesson",
    title: "Lesson Completed",
    description: "Spanish Basics - Greetings",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    type: "achievement",
    title: "Achievement Unlocked",
    description: "First Steps - Complete your first lesson",
    timestamp: "2 days ago",
  },
  {
    id: "4",
    type: "practice",
    title: "Speaking Practice",
    description: "Practiced French phrases",
    timestamp: "3 days ago",
  },
];

const iconMap = {
  practice: Mic,
  lesson: BookOpen,
  achievement: Award,
};

const colorMap = {
  practice: "text-primary bg-primary/10",
  lesson: "text-green-500 bg-green-500/10",
  achievement: "text-yellow-500 bg-yellow-500/10",
};

export function RecentActivity() {
  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <Clock className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = iconMap[activity.type];
          const colors = colorMap[activity.type];

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.split(" ")[1]}`}>
                <Icon className={`w-5 h-5 ${colors.split(" ")[0]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>

      {mockActivities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No recent activity</p>
          <p className="text-sm text-muted-foreground">Start practicing to see your progress here!</p>
        </div>
      )}
    </div>
  );
}
