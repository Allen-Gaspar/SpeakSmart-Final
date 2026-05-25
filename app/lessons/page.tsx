import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getAllLessons, type Lesson } from "@/lib/lessons";
import { getLanguageById } from "@/lib/languages";
import Link from "next/link";
import { Clock, Zap, ArrowRight, BookOpen } from "lucide-react";

function getDifficultyColor(difficulty: Lesson["difficulty"]): string {
  switch (difficulty) {
    case "beginner":
      return "bg-green-500/10 text-green-500";
    case "intermediate":
      return "bg-yellow-500/10 text-yellow-500";
    case "advanced":
      return "bg-red-500/10 text-red-500";
  }
}

export default function LessonsPage() {
  const lessons = getAllLessons();

  // Group lessons by language
  const lessonsByLanguage = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.languageId]) {
      acc[lesson.languageId] = [];
    }
    acc[lesson.languageId].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-balance">Structured </span>
              <span className="gradient-text">Lessons</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Follow our curated lessons to build your language skills step by step. 
              Each lesson includes guided phrases with pronunciation practice.
            </p>
          </div>

          {/* Lessons by Language */}
          <div className="space-y-12">
            {Object.entries(lessonsByLanguage).map(([languageId, languageLessons]) => {
              const language = getLanguageById(languageId);
              if (!language) return null;

              return (
                <div key={languageId}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{language.flag}</span>
                    <h2 className="text-2xl font-bold">{language.name}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {languageLessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.id}`}
                        className="glass rounded-2xl p-6 hover:bg-card/90 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary" />
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-lg ${getDifficultyColor(lesson.difficulty)}`}>
                            {lesson.difficulty}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {lesson.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {lesson.duration} min
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <Zap className="w-4 h-4" />
                              {lesson.xpReward} XP
                            </span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
