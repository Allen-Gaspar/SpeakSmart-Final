export interface Lesson {
  id: string;
  title: string;
  description: string;
  languageId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
  duration: number; // minutes
  phrases: LessonPhrase[];
}

export interface LessonPhrase {
  id: string;
  text: string;
  translation: string;
  hint?: string;
}

export const lessons: Lesson[] = [
  // English Lessons
  {
    id: "en-greetings",
    title: "Basic Greetings",
    description: "Learn essential greetings and introductions",
    languageId: "english",
    difficulty: "beginner",
    xpReward: 50,
    duration: 5,
    phrases: [
      { id: "1", text: "Hello, how are you?", translation: "A common greeting", hint: "Emphasize 'how'" },
      { id: "2", text: "Good morning!", translation: "Morning greeting", hint: "Stress 'morning'" },
      { id: "3", text: "Nice to meet you.", translation: "Introduction phrase", hint: "Link 'Nice' and 'to'" },
      { id: "4", text: "My name is...", translation: "Introducing yourself", hint: "Pause before your name" },
      { id: "5", text: "Have a great day!", translation: "Farewell phrase", hint: "Upward tone on 'day'" },
    ],
  },
  {
    id: "en-weather",
    title: "Talking About Weather",
    description: "Discuss weather conditions naturally",
    languageId: "english",
    difficulty: "beginner",
    xpReward: 60,
    duration: 7,
    phrases: [
      { id: "1", text: "The weather is beautiful today.", translation: "Describing nice weather", hint: "Stress 'beautiful'" },
      { id: "2", text: "It looks like rain.", translation: "Predicting rain", hint: "Draw out 'looks'" },
      { id: "3", text: "It is quite cold outside.", translation: "Describing cold weather", hint: "Emphasize 'cold'" },
      { id: "4", text: "The sun is shining brightly.", translation: "Sunny weather", hint: "Lift tone on 'brightly'" },
    ],
  },
  // Spanish Lessons
  {
    id: "es-greetings",
    title: "Saludos Basicos",
    description: "Learn basic Spanish greetings",
    languageId: "spanish",
    difficulty: "beginner",
    xpReward: 50,
    duration: 5,
    phrases: [
      { id: "1", text: "Hola, como estas?", translation: "Hello, how are you?", hint: "Roll the 'r' in 'estas'" },
      { id: "2", text: "Buenos dias!", translation: "Good morning!", hint: "Stress 'di-as'" },
      { id: "3", text: "Mucho gusto.", translation: "Nice to meet you.", hint: "Short 'u' sounds" },
      { id: "4", text: "Me llamo...", translation: "My name is...", hint: "Double 'l' sounds like 'y'" },
    ],
  },
  {
    id: "es-restaurant",
    title: "En el Restaurante",
    description: "Order food and drinks in Spanish",
    languageId: "spanish",
    difficulty: "intermediate",
    xpReward: 80,
    duration: 10,
    phrases: [
      { id: "1", text: "Una mesa para dos, por favor.", translation: "A table for two, please.", hint: "Soften the 'v' in 'favor'" },
      { id: "2", text: "Me gustaria ordenar.", translation: "I would like to order.", hint: "Roll the 'r' in 'ordenar'" },
      { id: "3", text: "La cuenta, por favor.", translation: "The check, please.", hint: "Stress 'cuen-ta'" },
    ],
  },
  // French Lessons
  {
    id: "fr-greetings",
    title: "Salutations de Base",
    description: "Essential French greetings",
    languageId: "french",
    difficulty: "beginner",
    xpReward: 50,
    duration: 5,
    phrases: [
      { id: "1", text: "Bonjour, comment allez-vous?", translation: "Hello, how are you?", hint: "Silent 's' at end" },
      { id: "2", text: "Enchante de vous rencontrer.", translation: "Nice to meet you.", hint: "Nasal 'en' sounds" },
      { id: "3", text: "Je m'appelle...", translation: "My name is...", hint: "Liaison between words" },
      { id: "4", text: "Bonne journee!", translation: "Have a nice day!", hint: "Stress 'jour-nee'" },
    ],
  },
  // German Lessons
  {
    id: "de-greetings",
    title: "Grundlegende Begrussung",
    description: "Basic German greetings",
    languageId: "german",
    difficulty: "beginner",
    xpReward: 50,
    duration: 5,
    phrases: [
      { id: "1", text: "Guten Tag, wie geht es Ihnen?", translation: "Good day, how are you?", hint: "Pronounce 'ch' in throat" },
      { id: "2", text: "Freut mich, Sie kennenzulernen.", translation: "Nice to meet you.", hint: "Clear 'eu' sound" },
      { id: "3", text: "Ich heisse...", translation: "My name is...", hint: "Soft 'ss' sound" },
    ],
  },
  // Japanese Lessons
  {
    id: "ja-greetings",
    title: "Basic Japanese Greetings",
    description: "Essential Japanese greetings",
    languageId: "japanese",
    difficulty: "beginner",
    xpReward: 60,
    duration: 6,
    phrases: [
      { id: "1", text: "Konnichiwa", translation: "Hello/Good afternoon", hint: "Even stress on syllables" },
      { id: "2", text: "Hajimemashite", translation: "Nice to meet you", hint: "Slight pause after 'ha'" },
      { id: "3", text: "Watashi no namae wa...", translation: "My name is...", hint: "Soft 'wa' particle" },
      { id: "4", text: "Arigatou gozaimasu", translation: "Thank you very much", hint: "Emphasize 'gozaimasu'" },
    ],
  },
  // Chinese Lessons
  {
    id: "zh-greetings",
    title: "Basic Mandarin Greetings",
    description: "Essential Mandarin Chinese greetings",
    languageId: "chinese",
    difficulty: "beginner",
    xpReward: 70,
    duration: 8,
    phrases: [
      { id: "1", text: "Ni hao", translation: "Hello", hint: "Rising tone on both syllables" },
      { id: "2", text: "Ni hao ma?", translation: "How are you?", hint: "Question tone on 'ma'" },
      { id: "3", text: "Wo jiao...", translation: "My name is...", hint: "Falling-rising tone on 'wo'" },
      { id: "4", text: "Xie xie", translation: "Thank you", hint: "Fourth tone, falling sharply" },
    ],
  },
];

export const getLessonsByLanguage = (languageId: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.languageId === languageId);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === lessonId);
};

export const getAllLessons = (): Lesson[] => {
  return lessons;
};
