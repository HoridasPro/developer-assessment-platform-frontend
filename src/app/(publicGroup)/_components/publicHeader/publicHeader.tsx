"use client";

import Link from "next/link";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetMe, useLogout } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PublicHeader = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        toast.add({
          title: "Logged out",
          description: res?.message || "You have been logged out successfully",
          type: "success",
        });

        queryClient.clear();

        router.push("/login");
      },
      onError: (err) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        queryClient.clear();

        toast.add({
          title: "Logged out",
          description: err?.message || "Logged out locally",
          type: "error",
        });

        router.push("/login");
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight sm:text-2xl">
          Dev<span className="text-primary">Assess</span>
        </Link>

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

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {!isLoading && !data && (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="hidden sm:inline-flex cursor-pointer">
                  Register
                </Button>
              </Link>
            </>
          )}

          {!isLoading && data && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button
                  type="button"
                  title={data?.data?.name}
                  className="flex items-center justify-center rounded-full border p-1 cursor-pointer"
                >
                  {data?.data?.profilePhoto ? (
                    <Image
                      src={data.data.profilePhoto}
                      alt={data.data.name}
                      width={50}
                      height={50}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {data?.data?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link href="/profile">👤 My Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/settings">⚙️ Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden">
              <Menu className="h-5 w-5" />
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
                  {!isLoading && !data ? (
                    <>
                      <Link href="/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </>
                  ) : (
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  )}
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
