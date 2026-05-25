export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  accents: Accent[];
  speechCode: string;
}

export interface Accent {
  id: string;
  name: string;
  region: string;
  speechCode: string;
}

export const languages: Language[] = [
  {
    id: "english",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    speechCode: "en-US",
    accents: [
      { id: "en-us", name: "American", region: "United States", speechCode: "en-US" },
      { id: "en-gb", name: "British", region: "United Kingdom", speechCode: "en-GB" },
      { id: "en-au", name: "Australian", region: "Australia", speechCode: "en-AU" },
      { id: "en-in", name: "Indian", region: "India", speechCode: "en-IN" },
    ],
  },
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    speechCode: "es-ES",
    accents: [
      { id: "es-es", name: "Castilian", region: "Spain", speechCode: "es-ES" },
      { id: "es-mx", name: "Mexican", region: "Mexico", speechCode: "es-MX" },
      { id: "es-ar", name: "Argentine", region: "Argentina", speechCode: "es-AR" },
    ],
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    speechCode: "fr-FR",
    accents: [
      { id: "fr-fr", name: "Parisian", region: "France", speechCode: "fr-FR" },
      { id: "fr-ca", name: "Canadian", region: "Canada", speechCode: "fr-CA" },
    ],
  },
  {
    id: "german",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    speechCode: "de-DE",
    accents: [
      { id: "de-de", name: "Standard", region: "Germany", speechCode: "de-DE" },
      { id: "de-at", name: "Austrian", region: "Austria", speechCode: "de-AT" },
      { id: "de-ch", name: "Swiss", region: "Switzerland", speechCode: "de-CH" },
    ],
  },
  {
    id: "chinese",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    speechCode: "zh-CN",
    accents: [
      { id: "zh-cn", name: "Mandarin", region: "Mainland China", speechCode: "zh-CN" },
      { id: "zh-tw", name: "Taiwanese", region: "Taiwan", speechCode: "zh-TW" },
      { id: "zh-hk", name: "Cantonese", region: "Hong Kong", speechCode: "zh-HK" },
    ],
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    speechCode: "ja-JP",
    accents: [
      { id: "ja-jp", name: "Standard", region: "Japan", speechCode: "ja-JP" },
    ],
  },
  {
    id: "korean",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    speechCode: "ko-KR",
    accents: [
      { id: "ko-kr", name: "Standard", region: "South Korea", speechCode: "ko-KR" },
    ],
  },
  {
    id: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    speechCode: "pt-PT",
    accents: [
      { id: "pt-pt", name: "European", region: "Portugal", speechCode: "pt-PT" },
      { id: "pt-br", name: "Brazilian", region: "Brazil", speechCode: "pt-BR" },
    ],
  },
  {
    id: "italian",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    speechCode: "it-IT",
    accents: [
      { id: "it-it", name: "Standard", region: "Italy", speechCode: "it-IT" },
    ],
  },
  {
    id: "arabic",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    speechCode: "ar-SA",
    accents: [
      { id: "ar-sa", name: "Saudi", region: "Saudi Arabia", speechCode: "ar-SA" },
      { id: "ar-eg", name: "Egyptian", region: "Egypt", speechCode: "ar-EG" },
    ],
  },
];

export const getLanguageById = (id: string): Language | undefined => {
  return languages.find((lang) => lang.id === id);
};

export const getAccentById = (languageId: string, accentId: string): Accent | undefined => {
  const language = getLanguageById(languageId);
  return language?.accents.find((accent) => accent.id === accentId);
};
