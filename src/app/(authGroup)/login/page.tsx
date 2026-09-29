import Image from "next/image";
import { LoginForm } from "../_components/loginForm/loginForm";

export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-2xl border bg-card shadow-lg overflow-hidden min-h-[600px]">
        <div className="flex w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        <div className="relative hidden md:flex h-full w-full bg-white items-center justify-center p-4">
          <div className="relative w-full h-full min-h-[500px]">
            <Image
              src="/login.png"
              alt="Login"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
