import LessonClientPage from "./LessonClient"; // Double-check your actual filename here!
import { lessons } from "@/lib/lessons"; // Or wherever your lessons array data is stored

export const dynamicParams = false;

// This tells Next.js to pre-build every single lesson link!
export async function generateStaticParams() {
  return lessons.map((lesson) => ({
    lessonId: lesson.id, // This must match the folder name [lessonId]
  }));
}

export default function Page() {
  return <LessonClientPage />;
}
