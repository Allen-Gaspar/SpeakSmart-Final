import Link from "next/link";
import { languages } from "@/lib/languages";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LanguagesSection() {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-balance">Learn </span>
            <span className="gradient-text">10 Languages</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From English to Arabic, master the world&apos;s most spoken languages with authentic regional accents.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {languages.map((language) => (
            <Link
              key={language.id}
              href={`/practice/${language.id}`}
              className="glass rounded-2xl p-6 text-center hover:bg-card/90 hover:scale-105 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3">{language.flag}</div>
              <h3 className="font-semibold mb-1">{language.name}</h3>
              <p className="text-sm text-muted-foreground">{language.nativeName}</p>
              <p className="text-xs text-primary mt-2">{language.accents.length} accent{language.accents.length > 1 ? "s" : ""}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/languages">
            <Button variant="outline" size="lg">
              Explore All Languages
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
