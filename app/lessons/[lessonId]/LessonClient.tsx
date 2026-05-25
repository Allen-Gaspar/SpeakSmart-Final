"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getLessonById } from "@/lib/lessons";
import { getLanguageById } from "@/lib/languages";
import { LessonPractice } from "@/components/lessons/lesson-practice";
import { LessonComplete } from "@/components/lessons/lesson-complete";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Zap, BookOpen } from "lucide-react";
import Link from "next/link";


export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const lesson = getLessonById(lessonId);

  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);

  if (!lesson) {
    notFound();
  }

  const language = getLanguageById(lesson.languageId);

  const handleComplete = (finalScores: number[]) => {
    setScores(finalScores);
    setCompleted(true);
  };

  const handleRestart = () => {
    setStarted(false);
    setCompleted(false);
    setScores([]);
  };

  if (completed) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <LessonComplete
          lesson={lesson}
          scores={scores}
          onRestart={handleRestart}
          onContinue={() => router.push("/lessons")}
        />
        <Footer />
      </main>
    );
  }

  if (started) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <LessonPractice
          lesson={lesson}
          language={language!}
          onComplete={handleComplete}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/lessons" className="inline-block mb-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
          </Link>

          {/* Lesson Card */}
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{language?.flag}</span>
              <div>
                <span className="text-sm text-primary font-medium">{language?.name}</span>
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {lesson.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-bold">{lesson.duration}</p>
                <p className="text-sm text-muted-foreground">Minutes</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <BookOpen className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-bold">{lesson.phrases.length}</p>
                <p className="text-sm text-muted-foreground">Phrases</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{lesson.xpReward}</p>
                <p className="text-sm text-muted-foreground">XP Reward</p>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">What You Will Learn</h3>
              <div className="space-y-2">
                {lesson.phrases.slice(0, 3).map((phrase, index) => (
                  <div key={phrase.id} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{phrase.text}</p>
                      <p className="text-sm text-muted-foreground">{phrase.translation}</p>
                    </div>
                  </div>
                ))}
                {lesson.phrases.length > 3 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    And {lesson.phrases.length - 3} more phrases...
                  </p>
                )}
              </div>
            </div>

            {/* Start Button */}
            <Button
              size="lg"
              className="w-full glow py-6 text-lg"
              onClick={() => setStarted(true)}
            >
              Start Lesson
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
