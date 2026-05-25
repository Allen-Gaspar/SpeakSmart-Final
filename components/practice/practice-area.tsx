"use client";

import { useState } from "react";
import type { Language, Accent } from "@/lib/languages";
import { useSpeechRecognition, useTextToSpeech, calculatePronunciationScore } from "@/hooks/use-speech";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { PronunciationScore } from "./pronunciation-score";

interface PracticeAreaProps {
  language: Language;
  accent: Accent;
}

// Sample phrases for each language
const samplePhrases: Record<string, string[]> = {
  english: [
    "Hello, how are you today?",
    "The weather is beautiful.",
    "I would like to order some coffee.",
    "Thank you very much for your help.",
    "Where is the nearest train station?",
  ],
  spanish: [
    "Hola, como estas hoy?",
    "El tiempo es hermoso.",
    "Me gustaria pedir un cafe.",
    "Muchas gracias por tu ayuda.",
    "Donde esta la estacion de tren mas cercana?",
  ],
  french: [
    "Bonjour, comment allez-vous?",
    "Le temps est magnifique.",
    "Je voudrais commander un cafe.",
    "Merci beaucoup pour votre aide.",
    "Ou est la gare la plus proche?",
  ],
  german: [
    "Hallo, wie geht es Ihnen?",
    "Das Wetter ist schon.",
    "Ich mochte einen Kaffee bestellen.",
    "Vielen Dank fur Ihre Hilfe.",
    "Wo ist der nachste Bahnhof?",
  ],
  chinese: [
    "你好，今天怎么样？",
    "天气很好。",
    "我想点一杯咖啡。",
    "非常感谢你的帮助。",
    "最近的火车站在哪里？",
  ],
  japanese: [
    "こんにちは、お元気ですか？",
    "天気がいいですね。",
    "コーヒーを注文したいです。",
    "ご協力ありがとうございます。",
    "一番近い駅はどこですか？",
  ],
  korean: [
    "안녕하세요, 오늘 어떠세요?",
    "날씨가 좋네요.",
    "커피 한 잔 주문하고 싶어요.",
    "도움 주셔서 감사합니다.",
    "가장 가까운 역이 어디예요?",
  ],
  portuguese: [
    "Ola, como voce esta?",
    "O tempo esta lindo.",
    "Gostaria de pedir um cafe.",
    "Muito obrigado pela sua ajuda.",
    "Onde fica a estacao de trem mais proxima?",
  ],
  italian: [
    "Ciao, come stai?",
    "Il tempo e bellissimo.",
    "Vorrei ordinare un caffe.",
    "Grazie mille per il tuo aiuto.",
    "Dov&apos;e la stazione ferroviaria piu vicina?",
  ],
  arabic: [
    "مرحبا، كيف حالك اليوم؟",
    "الطقس جميل.",
    "أود أن أطلب قهوة.",
    "شكرا جزيلا على مساعدتك.",
    "أين أقرب محطة قطار؟",
  ],
};

export function PracticeArea({ language, accent }: PracticeAreaProps) {
  const phrases = samplePhrases[language.id] || samplePhrases.english;
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [score, setScore] = useState<{
    accuracy: number;
    fluency: number;
    completeness: number;
    overall: number;
  } | null>(null);
  const [showResults, setShowResults] = useState(false);

  const {
    isListening,
    transcript,
    isSupported: speechRecognitionSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const { speak, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  const currentPhrase = phrases[currentPhraseIndex];

  const handleListen = () => {
    speak(currentPhrase, accent.speechCode, 0.85);
  };

  const handleStartRecording = () => {
    resetTranscript();
    setScore(null);
    setShowResults(false);
    startListening(accent.speechCode);
  };

  const handleStopRecording = () => {
    stopListening();
    if (transcript.trim()) {
      const calculatedScore = calculatePronunciationScore(currentPhrase, transcript);
      setScore(calculatedScore);
      setShowResults(true);
    }
  };

  const handleNextPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    resetTranscript();
    setScore(null);
    setShowResults(false);
  };

  const handleReset = () => {
    resetTranscript();
    setScore(null);
    setShowResults(false);
  };

  if (!speechRecognitionSupported) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Speech Recognition Not Supported</h3>
        <p className="text-muted-foreground">
          Your browser does not support speech recognition. Please use Chrome, Edge, or Safari for the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Phrase Card */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Practice Phrase</h3>
          <span className="text-sm text-muted-foreground">
            {currentPhraseIndex + 1} / {phrases.length}
          </span>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6 mb-6">
          <p className="text-2xl font-medium text-center leading-relaxed">{currentPhrase}</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={handleListen}
            disabled={isSpeaking || !ttsSupported}
            className="gap-2"
          >
            <Volume2 className={`w-5 h-5 ${isSpeaking ? "animate-pulse text-primary" : ""}`} />
            {isSpeaking ? "Playing..." : "Listen"}
          </Button>

          <Button
            variant="outline"
            onClick={handleNextPhrase}
            className="gap-2"
          >
            Next Phrase
          </Button>
        </div>
      </div>

      {/* Recording Area */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Your Turn</h3>

        <div className="flex flex-col items-center">
          {/* Microphone Button */}
          <button
            onClick={isListening ? handleStopRecording : handleStartRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? "bg-destructive text-destructive-foreground animate-pulse glow"
                : "bg-primary text-primary-foreground hover:scale-105 glow-sm"
            }`}
          >
            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>

          <p className="mt-4 text-sm text-muted-foreground">
            {isListening ? "Listening... Click to stop" : "Click to start recording"}
          </p>

          {/* Transcript Display */}
          {transcript && (
            <div className="mt-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your Speech:</span>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-lg text-center">{transcript}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {showResults && score && (
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            {score.overall >= 70 ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-yellow-500" />
            )}
            <h3 className="text-lg font-semibold">
              {score.overall >= 70 ? "Great Job!" : "Keep Practicing!"}
            </h3>
          </div>

          <PronunciationScore score={score} />

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="outline" onClick={handleReset}>
              Try Again
            </Button>
            <Button onClick={handleNextPhrase}>
              Next Phrase
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
