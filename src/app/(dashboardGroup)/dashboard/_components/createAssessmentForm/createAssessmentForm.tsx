// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Calendar,
//   Clock,
//   DollarSign,
//   FileText,
//   Save,
//   Users,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Field, FieldError, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import { useCreateAssessment } from "@/hooks";
// import { toast } from "@/components/ui/toast";
// import {
//   createAssessmentSchema,
//   TCreateAssessmentPayload,
// } from "@/validation/createAssessmentValidation";

// const CreateAssessmentForm = () => {
//   const validators = useForm({
//     resolver: zodResolver(createAssessmentSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       duration: 0,
//       passingScore: 0,
//       maxAttempts: 1,
//       price: 0,
//       startAt: "",
//       endAt: "",
//     },
//   });

//   const router = useRouter();

//   const { mutate: createAssessment, isPending } = useCreateAssessment();

//   const onSubmit = (data: TCreateAssessmentPayload) => {
//     const payload = {
//       ...data,
//       startAt: new Date(data.startAt).toISOString(),
//       endAt: new Date(data.endAt).toISOString(),
//     };

//     createAssessment(payload, {
//       onSuccess: (res) => {
//         toast.add({
//           title: "Created assessment",
//           description: res.message || "Created assessment successfully",
//           type: "success",
//         });
//         router.push("/dashboard/company/assessments");
//       },

//       onError: (err) => {
//         toast.add({
//           title: "Create assessment failed",
//           description: err.message || "Something is wrong",
//           type: "error",
//         });
//       },
//     });
//   };

//   return (
//     <form onSubmit={validators.handleSubmit(onSubmit)} className="space-y-6">
//       {/* Basic Information */}
//       <Card className="overflow-hidden border-border/60 shadow-sm">
//         <CardHeader className="border-b bg-muted/20 p-4 sm:p-6">
//           <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
//             <FileText className="size-5 shrink-0" />
//             Basic Information
//           </CardTitle>

//           <CardDescription className="text-sm">
//             Enter the basic information for this assessment.
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-6 p-4 sm:p-6 lg:p-7">
//           {/* Title */}
//           <Field>
//             <FieldLabel htmlFor="title">Assessment Title</FieldLabel>

//             <Input
//               id="title"
//               placeholder="Full Stack Developer Assessment"
//               className="h-11 w-full"
//               {...validators.register("title")}
//             />

//             <FieldError>
//               {validators.formState.errors.title?.message}
//             </FieldError>
//           </Field>

//           {/* Description */}
//           <Field>
//             <FieldLabel htmlFor="description">Description</FieldLabel>

//             <Textarea
//               id="description"
//               placeholder="Describe this assessment..."
//               className="min-h-32 w-full resize-y"
//               {...validators.register("description")}
//             />

//             <FieldError>
//               {validators.formState.errors.description?.message}
//             </FieldError>
//           </Field>
//         </CardContent>
//       </Card>

//       {/* Assessment Configuration */}
//       <Card className="overflow-hidden border-border/60 shadow-sm">
//         <CardHeader className="border-b bg-muted/20 p-4 sm:p-6">
//           <CardTitle className="text-lg sm:text-xl">
//             Assessment Configuration
//           </CardTitle>

//           <CardDescription className="text-sm">
//             Configure duration, score, attempts and pricing.
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="p-4 sm:p-6 lg:p-7">
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {/* Duration */}
//             <Field>
//               <FieldLabel
//                 htmlFor="duration"
//                 className="flex items-center gap-2"
//               >
//                 <Clock className="size-4 shrink-0" />
//                 Duration
//               </FieldLabel>

//               <div className="relative">
//                 <Input
//                   id="duration"
//                   type="number"
//                   min={1}
//                   className="h-11 pr-14"
//                   {...validators.register("duration")}
//                 />

//                 <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                   min
//                 </span>
//               </div>

//               <FieldError>
//                 {validators.formState.errors.duration?.message}
//               </FieldError>
//             </Field>

//             {/* Passing Score */}
//             <Field>
//               <FieldLabel htmlFor="passingScore">Passing Score</FieldLabel>

//               <div className="relative">
//                 <Input
//                   id="passingScore"
//                   type="number"
//                   min={0}
//                   max={100}
//                   className="h-11 pr-10"
//                   {...validators.register("passingScore")}
//                 />

//                 <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                   %
//                 </span>
//               </div>

//               <FieldError>
//                 {validators.formState.errors.passingScore?.message}
//               </FieldError>
//             </Field>

//             {/* Max Attempts */}
//             <Field>
//               <FieldLabel
//                 htmlFor="maxAttempts"
//                 className="flex items-center gap-2"
//               >
//                 <Users className="size-4 shrink-0" />
//                 Maximum Attempts
//               </FieldLabel>

//               <Input
//                 id="maxAttempts"
//                 type="number"
//                 min={1}
//                 max={10}
//                 className="h-11 w-full"
//                 {...validators.register("maxAttempts")}
//               />

//               <FieldError>
//                 {validators.formState.errors.maxAttempts?.message}
//               </FieldError>
//             </Field>

//             {/* Price */}
//             <Field>
//               <FieldLabel htmlFor="price" className="flex items-center gap-2">
//                 <DollarSign className="size-4 shrink-0" />
//                 Price
//               </FieldLabel>

//               <Input
//                 id="price"
//                 type="number"
//                 min={0}
//                 step="0.01"
//                 placeholder="30"
//                 className="h-11 w-full"
//                 {...validators.register("price")}
//               />

//               <p className="text-xs text-muted-foreground">
//                 Assessment price in USD.
//               </p>

//               <FieldError>
//                 {validators.formState.errors.price?.message}
//               </FieldError>
//             </Field>

//             {/* Start At */}
//             <Field>
//               <FieldLabel htmlFor="startAt" className="flex items-center gap-2">
//                 <Calendar className="size-4 shrink-0" />
//                 Start Date & Time
//               </FieldLabel>

//               <Input
//                 id="startAt"
//                 type="datetime-local"
//                 className="h-11 w-full"
//                 {...validators.register("startAt")}
//               />

//               <FieldError>
//                 {validators.formState.errors.startAt?.message}
//               </FieldError>
//             </Field>

//             {/* End At */}
//             <Field>
//               <FieldLabel htmlFor="endAt" className="flex items-center gap-2">
//                 <Calendar className="size-4 shrink-0" />
//                 End Date & Time
//               </FieldLabel>

//               <Input
//                 id="endAt"
//                 type="datetime-local"
//                 className="h-11 w-full"
//                 {...validators.register("endAt")}
//               />

//               <FieldError>
//                 {validators.formState.errors.endAt?.message}
//               </FieldError>
//             </Field>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Actions */}
//       <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
//         <Button
//           type="button"
//           variant="outline"
//           disabled={isPending}
//           className="w-full sm:w-auto cursor-pointer rounded-xl"
//           onClick={() => router.push("/dashboard/company/assessments")}
//         >
//           Cancel
//         </Button>

//         <Button type="submit" disabled={isPending} className="w-full sm:w-auto cursor-pointer rounded-xl">
//           <Save className="mr-2 size-4" />

//           {isPending ? "Creating..." : "Create Assessment"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default CreateAssessmentForm;
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Save,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateAssessment } from "@/hooks";
import { toast } from "@/components/ui/toast";
import {
  createAssessmentSchema,
  TCreateAssessmentPayload,
} from "@/validation/createAssessmentValidation";

const CreateAssessmentForm = () => {
  const validators = useForm({
    resolver: zodResolver(createAssessmentSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
      passingScore: 0,
      maxAttempts: 1,
      price: 0,
      startAt: "",
      endAt: "",
    },
  });

  const router = useRouter();

  const { mutate: createAssessment, isPending } = useCreateAssessment();

  const onSubmit = (data: TCreateAssessmentPayload) => {
    const payload = {
      ...data,
      startAt: new Date(data.startAt).toISOString(),
      endAt: new Date(data.endAt).toISOString(),
    };

    createAssessment(payload, {
      onSuccess: (res) => {
        toast.add({
          title: "Created assessment",
          description: res.message || "Created assessment successfully",
          type: "success",
        });
        router.push("/dashboard/company/assessments");
      },

      onError: (err) => {
        toast.add({
          title: "Create assessment failed",
          description: err.message || "Something is wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <form
      onSubmit={validators.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-6xl space-y-5 sm:space-y-6"
    >
      {/* Basic Information */}
      <Card className="overflow-hidden border-border/60 bg-card shadow-sm">
        <CardHeader className="border-b bg-muted/20 px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <FileText className="size-5" />
            </div>

            <div className="min-w-0">
              <CardTitle className="text-lg font-semibold sm:text-xl">
                Basic Information
              </CardTitle>

              <CardDescription className="mt-1 text-sm leading-5">
                Enter the basic information for this assessment.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-7">
          {/* Title */}
          <Field>
            <FieldLabel htmlFor="title" className="mb-2 text-sm font-medium">
              Assessment Title
            </FieldLabel>

            <Input
              id="title"
              placeholder="Full Stack Developer Assessment"
              className="h-11 rounded-xl border-border/70 bg-background px-4 shadow-none transition focus-visible:ring-2"
              {...validators.register("title")}
            />

            <FieldError>
              {validators.formState.errors.title?.message}
            </FieldError>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel
              htmlFor="description"
              className="mb-2 text-sm font-medium"
            >
              Description
            </FieldLabel>

            <Textarea
              id="description"
              placeholder="Describe this assessment..."
              className="min-h-32 w-full resize-y rounded-xl border-border/70 bg-background px-4 py-3 shadow-none transition focus-visible:ring-2"
              {...validators.register("description")}
            />

            <FieldError>
              {validators.formState.errors.description?.message}
            </FieldError>
          </Field>
        </CardContent>
      </Card>

      {/* Assessment Configuration */}
      <Card className="overflow-hidden border-border/60 bg-card shadow-sm">
        <CardHeader className="border-b bg-muted/20 px-4 py-5 sm:px-6 sm:py-6">
          <CardTitle className="text-lg font-semibold sm:text-xl">
            Assessment Configuration
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-5">
            Configure duration, score, attempts and pricing.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Duration */}
            <Field className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <FieldLabel
                htmlFor="duration"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Clock className="size-4 text-blue-500" />
                Duration
              </FieldLabel>

              <div className="relative">
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  className="h-11 rounded-lg bg-background pr-14"
                  {...validators.register("duration")}
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                  min
                </span>
              </div>

              <FieldError>
                {validators.formState.errors.duration?.message}
              </FieldError>
            </Field>

            {/* Passing Score */}
            <Field className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <FieldLabel
                htmlFor="passingScore"
                className="mb-2 text-sm font-medium"
              >
                Passing Score
              </FieldLabel>

              <div className="relative">
                <Input
                  id="passingScore"
                  type="number"
                  min={0}
                  max={100}
                  className="h-11 rounded-lg bg-background pr-10"
                  {...validators.register("passingScore")}
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  %
                </span>
              </div>

              <FieldError>
                {validators.formState.errors.passingScore?.message}
              </FieldError>
            </Field>

            {/* Max Attempts */}
            <Field className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <FieldLabel
                htmlFor="maxAttempts"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Users className="size-4 text-violet-500" />
                Maximum Attempts
              </FieldLabel>

              <Input
                id="maxAttempts"
                type="number"
                min={1}
                max={10}
                className="h-11 w-full rounded-lg bg-background"
                {...validators.register("maxAttempts")}
              />

              <FieldError>
                {validators.formState.errors.maxAttempts?.message}
              </FieldError>
            </Field>

            {/* Price */}
            <Field className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <FieldLabel
                htmlFor="price"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <DollarSign className="size-4 text-emerald-500" />
                Price
              </FieldLabel>

              <Input
                id="price"
                type="number"
                min={0}
                step="0.01"
                placeholder="30"
                className="h-11 w-full rounded-lg bg-background"
                {...validators.register("price")}
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Assessment price in USD.
              </p>

              <FieldError>
                {validators.formState.errors.price?.message}
              </FieldError>
            </Field>

            {/* Start At */}
            <Field className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <FieldLabel
                htmlFor="startAt"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Calendar className="size-4 text-orange-500" />
                Start Date & Time
              </FieldLabel>

              <Input
                id="startAt"
                type="datetime-local"
                className="h-11 w-full rounded-lg bg-background"
                {...validators.register("startAt")}
              />

              <FieldError>
                {validators.formState.errors.startAt?.message}
              </FieldError>
            </Field>

            {/* End At */}
            <Field className="rounded-xl border border-border/60 bg-muted/10 p-4">
              <FieldLabel
                htmlFor="endAt"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Calendar className="size-4 text-rose-500" />
                End Date & Time
              </FieldLabel>

              <Input
                id="endAt"
                type="datetime-local"
                className="h-11 w-full rounded-lg bg-background"
                {...validators.register("endAt")}
              />

              <FieldError>
                {validators.formState.errors.endAt?.message}
              </FieldError>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-5 sm:flex-row sm:justify-end sm:pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          className="h-11 w-full cursor-pointer rounded-xl px-6 sm:w-auto"
          onClick={() => router.push("/dashboard/company/assessments")}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full cursor-pointer rounded-xl px-6 sm:w-auto"
        >
          <Save className="mr-2 size-4" />

          {isPending ? "Creating..." : "Create Assessment"}
        </Button>
      </div>
    </form>
  );
};

export default CreateAssessmentForm;
