import Link from "next/link";

const AuthFooter = () => {
  return (
    <footer className="border-t border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs transition-all sm:flex-row sm:px-6 sm:text-sm lg:px-8">
        <p className="font-medium tracking-tight text-slate-400 hover:text-slate-200 transition-colors">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-100">DevAssess</span>. All
          rights reserved.
        </p>
        <span
          className="hidden sm:inline-block text-slate-700"
          aria-hidden="true"
        >
          •
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link
            href="/"
            className="font-medium text-slate-400 underline-offset-4 hover:text-indigo-400 hover:underline transition-all duration-200"
          >
            Privacy Policy
          </Link>

          <span className="text-slate-700" aria-hidden="true">
            •
          </span>

          <Link
            href="/"
            className="font-medium text-slate-400 underline-offset-4 hover:text-indigo-400 hover:underline transition-all duration-200"
          >
            Terms of Service
          </Link>

          <span className="text-slate-700" aria-hidden="true">
            •
          </span>

          <Link
            href="/"
            className="font-medium text-slate-400 underline-offset-4 hover:text-indigo-400 hover:underline transition-all duration-200"
          >
            Help
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
