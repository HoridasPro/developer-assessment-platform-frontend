"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGoogleAuthLogin, useRegister } from "@/hooks";
import { RegisterFormData } from "@/types/registerFormData";

import { registerSchema } from "@/validation/authValidation";

import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { FcGoogle } from "react-icons/fc";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const validators = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CANDIDATE",
      phone: "",
    },
  });

  const { mutate: register, isPending: registerPending } = useRegister();

  const router = useRouter();

  const onSubmit = (data: RegisterFormData) => {
    register(data, {
      onSuccess: () => {
        toast.add({
          title: "Registration successfully",
          description:
            "Please check your email and verify your account before logging in.",
          type: "success",
        });

        router.push(
          `/verify-register-page?email=${encodeURIComponent(data.email)}`,
        );
      },

      onError: (err) => {
        toast.add({
          title: "Register Failed",
          description: err.message || "Invalid email or password",
          type: "error",
        });
      },
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: googleLogin } = useGoogleAuthLogin();

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
        onSuccess: (data) => {
          toast.add({
            title: "Login Successfully",
            description: "Welcome back",
            type: "success",
          });
          console.log("LOGIN OTP RESPONSE:", data);
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
    <Card
      {...props}
      className="w-full rounded-xl border border-border/60 bg-card p-1 shadow-lg transition-all duration-200 sm:p-2"
    >
      <CardHeader className="space-y-0.5 p-3 text-center sm:p-4">
        <CardTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Create an account
        </CardTitle>

        <CardDescription className="text-xs text-muted-foreground">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent className="px-3 pb-3 pt-0">
        <form
          onSubmit={validators.handleSubmit(onSubmit)}
          className="space-y-2.5"
        >
          <FieldGroup className="space-y-2">
            {/* Full Name */}
            <Field>
              <FieldLabel
                htmlFor="name"
                className="text-xs font-medium text-foreground"
              >
                Full Name
              </FieldLabel>

              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="h-8.5 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...validators.register("name")}
              />

              {validators.formState.errors.name && (
                <FieldError className="text-[10px] font-medium text-destructive">
                  {validators.formState.errors.name.message}
                </FieldError>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-xs font-medium text-foreground"
              >
                Email
              </FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-8.5 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...validators.register("email")}
              />

              {validators.formState.errors.email && (
                <FieldError className="text-[10px] font-medium text-destructive">
                  {validators.formState.errors.email.message}
                </FieldError>
              )}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-xs font-medium text-foreground"
              >
                Password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-8.5 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...validators.register("password")}
                />

                <button
                  className="absolute right-2.5 top-2 cursor-pointer text-muted-foreground hover:text-foreground"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeClosed className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {validators.formState.errors.password && (
                <FieldError className="text-[10px] font-medium text-destructive">
                  {validators.formState.errors.password.message}
                </FieldError>
              )}
            </Field>

            {/* Profile Photo */}
            <Field>
              <FieldLabel
                htmlFor="profilePhoto"
                className="text-xs font-medium text-foreground"
              >
                Profile Photo URL
              </FieldLabel>

              <Input
                id="profilePhoto"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="h-8.5 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...validators.register("profilePhoto")}
              />

              {validators.formState.errors.profilePhoto && (
                <FieldError className="text-[10px] font-medium text-destructive">
                  {validators.formState.errors.profilePhoto.message as string}
                </FieldError>
              )}
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel
                htmlFor="phone"
                className="text-xs font-medium text-foreground"
              >
                Phone Number
              </FieldLabel>

              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="h-8.5 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...validators.register("phone")}
              />

              {validators.formState.errors.phone && (
                <FieldError className="text-[10px] font-medium text-destructive">
                  {validators.formState.errors.phone.message}
                </FieldError>
              )}
            </Field>

            {/* Account Type / Role */}
            <Field>
              <FieldLabel
                htmlFor="role"
                className="text-xs font-medium text-foreground"
              >
                Account Type
              </FieldLabel>

              <select
                id="role"
                className="flex h-8.5 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...validators.register("role")}
              >
                <option value="CANDIDATE">Candidate</option>

                <option value="COMPANY">Company</option>
              </select>

              {validators.formState.errors.role && (
                <FieldError className="text-[10px] font-medium text-destructive">
                  {validators.formState.errors.role.message}
                </FieldError>
              )}
            </Field>

            {/* Buttons */}
            <FieldGroup className="pt-1">
              <Field className="space-y-2">
                <Button
                  type="submit"
                  disabled={registerPending}
                  className="h-8.5 w-full cursor-pointer rounded-md bg-primary text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {registerPending ? (
                    <>
                      <Spinner />
                      Submitting...
                    </>
                  ) : (
                    " Create Account"
                  )}
                </Button>

                {/* <Button
                  variant="outline"
                  type="button"
                  className="flex h-8.5 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <FcGoogle className="size-4 shrink-0" />

                  <span>Sign up with Google</span>
                </Button> */}
                <FieldSeparator>Or continue with</FieldSeparator>

                <GoogleLogin
                  theme="outline"
                  shape="pill"
                  text="continue_with"
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />

                <FieldDescription className="pt-0.5 text-center text-[11px] text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
