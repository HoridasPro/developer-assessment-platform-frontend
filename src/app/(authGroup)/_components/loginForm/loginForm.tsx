// "use client";
// import { cn } from "cn";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";

// import { loginSchema } from "@/validation/loginValidation";
// import { loginFormData } from "@/types/loginFormData";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const validators = useForm<loginFormData>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (data: loginFormData) => {
//     console.log("Login data", data);
//   };
//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={validators.handleSubmit(onSubmit)}>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Inter your email"
//                   {...validators.register("email")}
//                 />
//                 {validators.formState.errors.email && (
//                   <FieldError>
//                     {validators.formState.errors.email.message}
//                   </FieldError>
//                 )}
//               </Field>
//               <Field>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   <a
//                     href="/"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Inter your password"
//                   {...validators.register("password")}
//                 />
//                 {validators.formState.errors.password && (
//                   <FieldError>
//                     {validators.formState.errors.password.message}
//                   </FieldError>
//                 )}
//               </Field>
//               <Field>
//                 <Button type="submit">Login</Button>
//                 <Button variant="outline" type="button">
//                   Login with Google
//                 </Button>
//                 <FieldDescription className="text-center">
//                   Don&apos;t have an account? <a href="/">Sign up</a>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { loginSchema } from "@/validation/loginValidation";
import { loginFormData } from "@/types/loginFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

  const onSubmit = (data: loginFormData) => {
    console.log("Login data", data);
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
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-6 pt-2">
          <form
            onSubmit={validators.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup className="space-y-4">
              {/* Email Field */}
              <Field className="space-y-2">
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
                  <FieldError className="text-xs text-red-500 font-medium mt-1">
                    {validators.formState.errors.email.message}
                  </FieldError>
                )}
              </Field>

              {/* <Field
                className="space-y-2"
                data-invalid={!!validators.formState.errors.email}
              >
                <FieldLabel
                  htmlFor="email"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    validators.formState.errors.email && "text-red-500",
                  )}
                >
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    "w-full h-10 px-3 transition-all focus-visible:ring-2",
                    validators.formState.errors.email &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                  {...validators.register("email")}
                />

                {validators.formState.errors.email && (
                  <FieldError className="text-xs text-red-500 font-medium mt-1">
                    {validators.formState.errors.email.message}
                  </FieldError>
                )}
              </Field> */}
              {/* Password Field */}
              <Field className="space-y-2">
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
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-10 px-3 transition-all focus-visible:ring-2"
                  {...validators.register("password")}
                />
                {validators.formState.errors.password && (
                  <FieldError className="text-xs text-red-500 font-medium mt-1">
                    {validators.formState.errors.password.message}
                  </FieldError>
                )}
              </Field>

              {/* Actions & Buttons */}
              <Field className="space-y-3 pt-2">
                <Button
                  type="submit"
                  className="w-full h-10 font-medium shadow-sm"
                >
                  Login
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-10 font-medium border-slate-200 dark:border-slate-800"
                >
                  Login with Google
                </Button>

                <FieldDescription className="text-center text-xs text-muted-foreground pt-2">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/"
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
