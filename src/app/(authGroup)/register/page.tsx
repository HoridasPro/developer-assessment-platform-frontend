import Image from "next/image";
import { SignupForm } from "../_components/registerForm/registerForm";

export default function Register() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-2xl border bg-card shadow-lg overflow-hidden min-h-[600px]">
        <div className="flex w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>

        <div className="relative hidden md:flex h-full w-full bg-white items-center justify-center p-4">
          <div className="relative w-full h-full min-h-[500px]">
            <Image
              src="/register.png"
              alt="Register"
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
