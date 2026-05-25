interface Score {
  accuracy: number;
  fluency: number;
  completeness: number;
  overall: number;
}

interface PronunciationScoreProps {
  score: Score;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  return "text-orange-500";
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-orange-500";
}

export function PronunciationScore({ score }: PronunciationScoreProps) {
  const metrics = [
    { label: "Accuracy", value: score.accuracy, description: "How well you matched the words" },
    { label: "Fluency", value: score.fluency, description: "Smoothness of your speech" },
    { label: "Completeness", value: score.completeness, description: "How much of the phrase you covered" },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className={`text-5xl font-bold ${getScoreColor(score.overall)}`}>
          {score.overall}%
        </div>
        <p className="text-muted-foreground mt-1">Overall Score</p>
      </div>

      {/* Individual Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{metric.label}</span>
              <span className={`font-bold ${getScoreColor(metric.value)}`}>{metric.value}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getScoreBarColor(metric.value)}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Tips */}
      {score.overall < 80 && (
        <div className="bg-primary/10 rounded-xl p-4">
          <h4 className="font-semibold mb-2">Tips for Improvement</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {score.accuracy < 70 && (
              <li>Focus on pronouncing each word clearly and distinctly.</li>
            )}
            {score.fluency < 70 && (
              <li>Try to speak more naturally without long pauses between words.</li>
            )}
            {score.completeness < 70 && (
              <li>Make sure to say the complete phrase. Take your time!</li>
            )}
            <li>Listen to the native pronunciation again before your next attempt.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
