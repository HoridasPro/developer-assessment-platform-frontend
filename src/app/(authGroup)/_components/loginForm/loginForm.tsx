"use client";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { loginSchema } from "@/validation/authValidation";
import { loginFormData } from "@/types/loginFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useGoogleAuthLogin, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { GoogleLogin } from "@react-oauth/google";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const validators = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: googleLogin } = useGoogleAuthLogin();

  const onSubmit = (data: loginFormData) => {
    login(data, {
      onSuccess: (res) => {
        toast.add({
          title: "Welcome to back",
          description: res.message || "Login Successfully",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Authorization failure",
          description: err.message || " Something is wroing",
          type: "error",
        });
      },
    });
  };

  // Google auth login
  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google idToken not found",
        description: "Something went wrong please try again",
        type: "error",
      });
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Login Successfully",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description: err.message || "Something went wrong please try again",
            type: "error",
          });
        },
      },
    );
  };
  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong please try again",
      type: "error",
    });
  };

  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-2",
        className,
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <CardHeader className="space-y-1 text-center sm:text-center px-6 pt-6 pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-6 pt-2">
          <form
            onSubmit={validators.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup className="space-y-4">
              {/* Email Field */}
              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-10 px-3 transition-all focus-visible:ring-2"
                  {...validators.register("email")}
                />
                {validators.formState.errors.email && (
                  <FieldError>
                    {validators.formState.errors.email.message}
                  </FieldError>
                )}
              </Field>

              {/* Password Field */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    Password
                  </FieldLabel>
                  <a
                    href="/"
                    className="text-xs text-primary font-medium underline-offset-4 hover:underline transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-10 px-3 transition-all focus-visible:ring-2"
                    {...validators.register("password")}
                  />

                  <button
                    className="absolute right-3 top-2 cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
                {validators.formState.errors.password && (
                  <FieldError>
                    {validators.formState.errors.password.message}
                  </FieldError>
                )}
              </Field>
              {/* Actions & Buttons */}
              <Field className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={loginPending}
                  className="w-full h-10 font-medium shadow-sm cursor-pointer text-sm rounded-2xl"
                >
                  {loginPending ? (
                    <>
                      <Spinner /> Submitting...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <FieldSeparator>Or continue with</FieldSeparator>

                <GoogleLogin
                  theme="outline"
                  shape="pill"
                  text="continue_with"
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />

                <FieldDescription className="text-center text-xs text-muted-foreground pt-2">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/register"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
