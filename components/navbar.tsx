"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Menu, X, Mic, LogOut, User, LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, userData, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-sm">
              <Mic className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">SPEAKSMART</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/languages" className="text-muted-foreground hover:text-foreground transition-colors">
              Languages
            </Link>
            <Link href="/lessons" className="text-muted-foreground hover:text-foreground transition-colors">
              Lessons
            </Link>
            <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      {userData?.photoURL ? (
                        <img
                          src={userData.photoURL}
                          alt={userData.displayName || "User"}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <span className="hidden lg:inline">{userData?.displayName || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{userData?.displayName}</p>
                    <p className="text-xs text-muted-foreground">Level {userData?.level} - {userData?.xp} XP</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="glow-sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/languages"
              className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Languages
            </Link>
            <Link
              href="/lessons"
              className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lessons
            </Link>
            <Link
              href="/leaderboard"
              className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-destructive hover:bg-secondary transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full glow-sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
