import Link from "next/link";
import { Mic } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">SPEAKSMART</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered voice language learning platform. Master any language with personalized accent training.
            </p>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-semibold mb-4">Languages</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/practice/english" className="hover:text-foreground transition-colors">English</Link></li>
              <li><Link href="/practice/spanish" className="hover:text-foreground transition-colors">Spanish</Link></li>
              <li><Link href="/practice/french" className="hover:text-foreground transition-colors">French</Link></li>
              <li><Link href="/practice/german" className="hover:text-foreground transition-colors">German</Link></li>
              <li><Link href="/languages" className="hover:text-foreground transition-colors">View All</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/lessons" className="hover:text-foreground transition-colors">Lessons</Link></li>
              <li><Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Progress Tracking</Link></li>
              <li><Link href="/profile" className="hover:text-foreground transition-colors">Achievements</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 SPEAKSMART. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Built with AI-powered voice recognition
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
