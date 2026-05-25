"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, Globe, Sparkles, Volume2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Language Learning</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-balance">Master Any Language with</span>
            <br />
            <span className="gradient-text">Voice Recognition AI</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Practice speaking with real-time AI feedback, learn authentic accents from 10+ countries, 
            and track your progress with personalized lessons.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="glow px-8 py-6 text-lg">
                  <Mic className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="glow px-8 py-6 text-lg">
                    <Mic className="w-5 h-5 mr-2" />
                    Start Learning Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">25+</div>
              <div className="text-sm text-muted-foreground">Accents</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">AI</div>
              <div className="text-sm text-muted-foreground">Feedback</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Free</div>
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="hidden lg:block">
          <div className="absolute top-40 left-10 w-16 h-16 glass rounded-2xl flex items-center justify-center animate-bounce" style={{ animationDuration: "3s" }}>
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <div className="absolute top-60 right-10 w-16 h-16 glass rounded-2xl flex items-center justify-center animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>
            <Volume2 className="w-8 h-8 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
