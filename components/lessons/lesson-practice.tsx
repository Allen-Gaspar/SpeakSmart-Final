"use client";

import { useState } from "react";
import type { Lesson } from "@/lib/lessons";
import type { Language } from "@/lib/languages";
import { useSpeechRecognition, useTextToSpeech, calculatePronunciationScore } from "@/hooks/use-speech";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, ArrowRight, AlertCircle, Lightbulb } from "lucide-react";

interface LessonPracticeProps {
  lesson: Lesson;
  language: Language;
  onComplete: (scores: number[]) => void;
}

export function LessonPractice({ lesson, language, onComplete }: LessonPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const { speak, isSpeaking } = useTextToSpeech();

  const currentPhrase = lesson.phrases[currentIndex];
  const progress = ((currentIndex) / lesson.phrases.length) * 100;

  const handleListen = () => {
    speak(currentPhrase.text, language.speechCode, 0.85);
  };

  const handleStartRecording = () => {
    resetTranscript();
    setCurrentScore(null);
    startListening(language.speechCode);
  };

  const handleStopRecording = () => {
    stopListening();
    if (transcript.trim()) {
      const score = calculatePronunciationScore(currentPhrase.text, transcript);
      setCurrentScore(score.overall);
    }
  };

  const handleNext = () => {
    const finalScore = currentScore || 0;
    const newScores = [...scores, finalScore];
    setScores(newScores);
    
    if (currentIndex < lesson.phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentScore(null);
      resetTranscript();
      setShowHint(false);
    } else {
      onComplete(newScores);
    }
  };

  const handleSkip = () => {
    const newScores = [...scores, 0];
    setScores(newScores);
    
    if (currentIndex < lesson.phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentScore(null);
      resetTranscript();
      setShowHint(false);
    } else {
      onComplete(newScores);
    }
  };

  if (!isSupported) {
    return (
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Speech Recognition Not Supported</h3>
            <p className="text-muted-foreground">
              Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Phrase {currentIndex + 1} of {lesson.phrases.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Phrase Card */}
        <div className="glass rounded-3xl p-8 mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Say this phrase:</p>
            <p className="text-3xl font-bold mb-2">{currentPhrase.text}</p>
            <p className="text-muted-foreground">{currentPhrase.translation}</p>
          </div>

          {/* Hint */}
          {currentPhrase.hint && (
            <div className="mb-6">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-sm text-primary hover:underline mx-auto"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? "Hide hint" : "Show hint"}
              </button>
              {showHint && (
                <p className="text-center text-sm text-muted-foreground mt-2 p-3 bg-primary/10 rounded-lg">
                  {currentPhrase.hint}
                </p>
              )}
            </div>
          )}

          {/* Listen Button */}
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              onClick={handleListen}
              disabled={isSpeaking}
              className="gap-2"
            >
              <Volume2 className={`w-5 h-5 ${isSpeaking ? "animate-pulse text-primary" : ""}`} />
              {isSpeaking ? "Playing..." : "Listen to pronunciation"}
            </Button>
          </div>

          {/* Recording Area */}
          <div className="flex flex-col items-center">
            <button
              onClick={isListening ? handleStopRecording : handleStartRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse glow"
                  : "bg-primary text-primary-foreground hover:scale-105 glow-sm"
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            <p className="mt-3 text-sm text-muted-foreground">
              {isListening ? "Listening... Click to stop" : "Click to record"}
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="mt-6 p-4 bg-secondary/50 rounded-xl text-center">
              <p className="text-sm text-muted-foreground mb-1">You said:</p>
              <p className="text-lg font-medium">{transcript}</p>
            </div>
          )}

          {/* Score */}
          {currentScore !== null && (
            <div className="mt-6 text-center">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
                currentScore >= 70 
                  ? "bg-green-500/20 text-green-500" 
                  : currentScore >= 50 
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-orange-500/20 text-orange-500"
              }`}>
                <span className="text-2xl font-bold">{currentScore}%</span>
                <span className="text-sm">
                  {currentScore >= 70 ? "Great!" : currentScore >= 50 ? "Good effort!" : "Keep trying!"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentScore === null && !transcript}
            className="gap-2"
          >
            {currentIndex < lesson.phrases.length - 1 ? "Next Phrase" : "Complete Lesson"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
