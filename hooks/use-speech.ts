"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface UseSpeechRecognitionResult {
  isListening: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  isSupported: boolean;
  startListening: (lang?: string) => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
    }
  }, []);

  const startListening = useCallback((lang: string = "en-US") => {
    if (typeof window === "undefined") return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";
      let maxConfidence = 0;

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
          maxConfidence = Math.max(maxConfidence, result[0].confidence);
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
      if (maxConfidence > 0) {
        setConfidence(maxConfidence);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setConfidence(0);
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    confidence,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}

// Pronunciation scoring using Levenshtein distance
export function calculatePronunciationScore(
  expected: string,
  actual: string
): { accuracy: number; fluency: number; completeness: number; overall: number } {
  const normalizedExpected = expected.toLowerCase().trim();
  const normalizedActual = actual.toLowerCase().trim();

  // Calculate Levenshtein distance for accuracy
  const distance = levenshteinDistance(normalizedExpected, normalizedActual);
  const maxLength = Math.max(normalizedExpected.length, normalizedActual.length);
  const accuracy = maxLength > 0 ? Math.max(0, (1 - distance / maxLength) * 100) : 0;

  // Calculate completeness (how much of the expected text was captured)
  const expectedWords = normalizedExpected.split(/\s+/).filter(Boolean);
  const actualWords = normalizedActual.split(/\s+/).filter(Boolean);
  const matchedWords = expectedWords.filter((word) =>
    actualWords.some((actualWord) => 
      actualWord.includes(word) || word.includes(actualWord) || 
      levenshteinDistance(word, actualWord) <= Math.floor(word.length * 0.3)
    )
  );
  const completeness = expectedWords.length > 0 
    ? (matchedWords.length / expectedWords.length) * 100 
    : 0;

  // Fluency based on word count ratio
  const fluency = Math.min(100, (actualWords.length / Math.max(expectedWords.length, 1)) * 100);

  // Overall score (weighted average)
  const overall = accuracy * 0.5 + completeness * 0.3 + fluency * 0.2;

  return {
    accuracy: Math.round(accuracy),
    fluency: Math.round(fluency),
    completeness: Math.round(completeness),
    overall: Math.round(overall),
  };
}

function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Text-to-Speech hook
export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const speak = useCallback((text: string, lang: string = "en-US", rate: number = 1) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking, isSupported };
}
