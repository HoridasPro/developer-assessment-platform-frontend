"use client";

import Link from "next/link";
import { LogOut, Menu, Moon, Sun, LayoutDashboard, Code2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";

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

const getDashboardPath = (role?: string) => {
  switch (role?.toUpperCase()) {
    case "CANDIDATE":
      return "/dashboard/candidate";

    case "COMPANY":
      return "/dashboard/company";

    case "ADMIN":
      return "/dashboard/admin";

    default:
      return "/";
  }
};

const PublicHeader = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { data, isLoading } = useGetMe();

  console.log("get user data", data);

  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();

  // Logged-in user information
  const currentUser = data?.data;
  const isLoggedIn = !isLoading && !!currentUser;

  const dashboardPath = getDashboardPath(currentUser?.role);

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
        <Link href="/" className="group flex items-center gap-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/25 transition-transform group-hover:rotate-6">
            <Code2 size={23} />
          </span>
          <span className="text-base font-extrabold tracking-tight sm:text-lg">
            Dev<span className="text-violet-600">Assess</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            Home
          </Link>

          <Link
            href="/publishedAssessmentCards"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/publishedAssessmentCards"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            Assessments
          </Link>

          <Link
            href="/aboutPage"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/aboutPage"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            About
          </Link>

          <Link
            href="/contactPage"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/contactPage"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
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

          {/* Login and Register: only when logged out */}
          {!isLoading && !isLoggedIn && (
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

          {/* Profile Dropdown: only when logged in */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button
                  type="button"
                  title={currentUser?.name}
                  className="flex items-center justify-center rounded-full border p-1 cursor-pointer"
                >
                  {currentUser?.profilePhoto ? (
                    <Image
                      src={currentUser.profilePhoto}
                      alt={currentUser.name || "User profile"}
                      width={50}
                      height={50}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {/* Dashboard: based on user's role */}
                <DropdownMenuItem
                  onClick={() => router.push(dashboardPath)}
                  className="cursor-pointer"
                >
                  <LayoutDashboard className=" h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    router.push("/dashboard/company/updateProfile")
                  }
                  className="cursor-pointer"
                >
                  👤 My Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="cursor-pointer"
                >
                  ⚙️ Settings
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
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/"
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/publishedAssessmentCards"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/publishedAssessmentCards"
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  Assessments
                </Link>
                <Link
                  href="/aboutPage"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/aboutPage"
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contactPage"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/contactPage"
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  Contact
                </Link>

                {/* Logged-in user's menu */}
                {isLoggedIn && (
                  <>
                    <Link
                      href={dashboardPath}
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/company/updateProfile"
                      className="text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      👤 My Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      ⚙️ Settings
                    </Link>
                  </>
                )}

                <div className="mt-4 flex flex-col gap-2">
                  {!isLoading && !isLoggedIn ? (
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
                    isLoggedIn && (
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full"
                      >
                        Logout
                      </Button>
                    )
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
