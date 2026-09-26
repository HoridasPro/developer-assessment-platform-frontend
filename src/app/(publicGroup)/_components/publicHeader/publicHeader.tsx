"use client";

import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PublicHeader = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Dev<span className="text-primary">Assess</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>

          <Link
            href="/assessments"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Assessments
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Login */}
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Login
            </Button>
          </Link>

          {/* Register */}
          <Link href="/register">
            <Button className="hidden sm:inline-flex">Register</Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  Dev<span className="text-primary">Assess</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-4">
                <Link href="/">Home</Link>

                <Link href="/assessments">Assessments</Link>

                <Link href="/about">About</Link>

                <Link href="/contact">Contact</Link>

                <div className="mt-4 flex flex-col gap-2">
                  {/* Mobile Login */}
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>

                  {/* Mobile Register */}
                  <Link href="/register">
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
