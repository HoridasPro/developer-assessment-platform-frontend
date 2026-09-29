import { ReactNode } from "react";
import AuthHeader from "./_components/authHeader/authHeader";
import AuthFooter from "./_components/authFooter/authFooter";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center">
    
        <div className="w-full max-w-[7xl] mx-auto overflow-hidden rounded-2xl">
          {children}
        </div>
      </main>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;