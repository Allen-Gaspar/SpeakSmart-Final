"use client";

import { notFound, useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getLanguageById } from "@/lib/languages";
import { PracticeArea } from "@/components/practice/practice-area";
import { AccentSelector } from "@/components/practice/accent-selector";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PracticePage() {
const params = useParams();
const languageId = params.language as string;
const language = getLanguageById(languageId);


  const [selectedAccent, setSelectedAccent] = useState(
    language?.accents[0]?.id || ""
  );

  if (!language) {
    notFound();
  }

  const currentAccent = language.accents.find((a) => a.id === selectedAccent) || language.accents[0];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/languages" className="inline-block mb-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Languages
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl">{language.flag}</span>
              <div>
                <h1 className="text-3xl font-bold">{language.name} Practice</h1>
                <p className="text-muted-foreground">{language.nativeName}</p>
              </div>
            </div>
          </div>

          {/* Accent Selector */}
          <AccentSelector
            accents={language.accents}
            selectedAccent={selectedAccent}
            onSelectAccent={setSelectedAccent}
          />

          {/* Practice Area */}
          <PracticeArea
            language={language}
            accent={currentAccent}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
