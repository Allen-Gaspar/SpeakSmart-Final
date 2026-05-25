"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function CTASection() {
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass rounded-3xl p-8 sm:p-12 glow">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-balance">Ready to Start Your Language Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
            Join thousands of learners who are mastering new languages with SPEAKSMART&apos;s 
            AI-powered voice recognition technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="glow px-8 py-6 text-lg">
                  <Mic className="w-5 h-5 mr-2" />
                  Continue Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="px-8 py-6 text-lg">
                    <Mic className="w-5 h-5 mr-2" />
                    Start Learning Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">No credit card required</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
