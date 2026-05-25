import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { languages } from "@/lib/languages";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LanguagesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-balance">Choose Your </span>
              <span className="gradient-text">Language</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Select from 10 languages with multiple regional accents. 
              Practice speaking with AI-powered feedback and improve your pronunciation.
            </p>
          </div>

          {/* Languages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {languages.map((language) => (
              <Link
                key={language.id}
                href={`/practice/${language.id}`}
                className="glass rounded-2xl p-6 hover:bg-card/90 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{language.flag}</span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{language.name}</h3>
                <p className="text-muted-foreground mb-4">{language.nativeName}</p>
                
                {/* Accents */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">
                    {language.accents.length} Accent{language.accents.length > 1 ? "s" : ""} Available
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {language.accents.slice(0, 3).map((accent) => (
                      <span
                        key={accent.id}
                        className="text-xs px-2 py-1 rounded-lg bg-secondary/50"
                      >
                        {accent.name}
                      </span>
                    ))}
                    {language.accents.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-lg bg-secondary/50">
                        +{language.accents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
