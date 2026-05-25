import Link from "next/link";
import { languages } from "@/lib/languages";
import { ArrowRight, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickPractice() {
  // Show first 6 languages for quick access
  const quickLanguages = languages.slice(0, 6);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Quick Practice</h3>
          <p className="text-sm text-muted-foreground">Choose a language to start practicing</p>
        </div>
        <Link href="/languages">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {quickLanguages.map((language) => (
          <Link
            key={language.id}
            href={`/practice/${language.id}`}
            className="group p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{language.flag}</span>
              <div>
                <p className="font-medium">{language.name}</p>
                <p className="text-xs text-muted-foreground">{language.accents.length} accents</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Mic className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">Ready to practice?</h4>
            <p className="text-sm text-muted-foreground">Select a language above or try our featured lesson</p>
          </div>
          <Link href="/lessons">
            <Button>
              Start Lesson
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
