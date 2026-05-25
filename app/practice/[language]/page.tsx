import PracticePage from "./PracticeClient";
import { languages } from "@/lib/languages";

export const dynamicParams = false;

// This forces Next.js to build static pages for all your languages!
export async function generateStaticParams() {
  return languages.map((language) => ({
    language: language.id,
  }));
}

export default function Page() {
  return <PracticePage />;
}
