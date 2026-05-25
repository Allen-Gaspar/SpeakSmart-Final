import type { Lesson } from "@/lib/lessons";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Zap, RotateCcw, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface LessonCompleteProps {
  lesson: Lesson;
  scores: number[];
  onRestart: () => void;
  onContinue: () => void;
}

export function LessonComplete({ lesson, scores, onRestart, onContinue }: LessonCompleteProps) {
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
    : 0;
  
  const earnedXP = Math.round((averageScore / 100) * lesson.xpReward);
  const isPerfect = averageScore >= 90;
  const isGood = averageScore >= 70;

  useEffect(() => {
    if (isPerfect) {
      // Celebration confetti for perfect score
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7c3aed", "#a855f7", "#c084fc"],
      });
    } else if (isGood) {
      // Smaller celebration for good score
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
      });
    }
  }, [isPerfect, isGood]);

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-3xl p-8 text-center">
          {/* Icon */}
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isPerfect 
              ? "bg-yellow-500/20 glow" 
              : isGood 
                ? "bg-green-500/20" 
                : "bg-primary/20"
          }`}>
            {isPerfect ? (
              <Trophy className="w-10 h-10 text-yellow-500" />
            ) : (
              <Star className="w-10 h-10 text-primary" />
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">
            {isPerfect ? "Perfect Score!" : isGood ? "Lesson Complete!" : "Keep Practicing!"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isPerfect 
              ? "Outstanding work! You nailed every phrase!" 
              : isGood 
                ? "Great job completing this lesson!" 
                : "You completed the lesson. Practice more to improve!"}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <div className={`text-3xl font-bold ${
                averageScore >= 70 ? "text-green-500" : averageScore >= 50 ? "text-yellow-500" : "text-orange-500"
              }`}>
                {averageScore}%
              </div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
                <Zap className="w-6 h-6" />
                {earnedXP}
              </div>
              <p className="text-sm text-muted-foreground">XP Earned</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-3xl font-bold">{scores.length}</div>
              <p className="text-sm text-muted-foreground">Phrases</p>
            </div>
          </div>

          {/* Phrase Breakdown */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-left">Phrase Breakdown</h3>
            <div className="space-y-2">
              {lesson.phrases.map((phrase, index) => (
                <div
                  key={phrase.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <span className="text-sm truncate flex-1 text-left">{phrase.text}</span>
                  <span className={`font-bold ml-4 ${
                    scores[index] >= 70 
                      ? "text-green-500" 
                      : scores[index] >= 50 
                        ? "text-yellow-500" 
                        : "text-orange-500"
                  }`}>
                    {scores[index] || 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" onClick={onRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Practice Again
            </Button>
            <Button onClick={onContinue} className="gap-2 glow-sm">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
