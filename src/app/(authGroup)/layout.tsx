import { ReactNode } from "react";
import AuthHeader from "./_components/authHeader/authHeader";
import AuthFooter from "./_components/authFooter/authFooter";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
