import Link from "next/link";

const AuthHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight sm:text-2xl bg-accent"
        >
          <span className="text-primary">Dev</span>Assess
        </Link>
     

        {/* Back to Home */}
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to Home
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
