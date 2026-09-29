import Link from "next/link";

const AuthHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
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
