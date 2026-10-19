"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock3,
  FileText,
  Sparkles,
  Target,
  Trophy,
  Loader2,
  Code2,
  ImageIcon,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetMe, useGetPublicAssessments } from "@/hooks";
import { toast } from "@/components/ui/toast";

type Assessment = {
  id?: string;
  _id?: string;
  assessmentId?: string;
  title?: string;
  description?: string | null;
  imageUrl?: string | null;
  duration?: number | null;
  passingScore?: number | null;
  maxAttempts?: number | null;
  price?: number | string | null;
  status?: string | null;
  startAt?: string | null;
  endAt?: string | null;
  instructions?: string | null;
  settings?: {
    duration?: number | null;
    passingScore?: number | null;
    maxAttempts?: number | null;
  };
};

function unwrapResponse(response: any): any {
  let result = response;

  for (let i = 0; i < 6; i++) {
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      "data" in result
    ) {
      result = result.data;
    } else {
      break;
    }
  }

  return result;
}

function getList(response: any): any[] {
  const result = unwrapResponse(response);

  if (Array.isArray(result)) return result;

  if (!result || typeof result !== "object") {
    return [];
  }

  const keys = [
    "assessments",
    "invitations",
    "items",
    "results",
    "records",
    "content",
    "docs",
  ];

  for (const key of keys) {
    if (Array.isArray(result[key])) {
      return result[key];
    }
  }

  return [];
}

function getAssessmentId(assessment: Assessment): string {
  return String(
    assessment.id ?? assessment._id ?? assessment.assessmentId ?? "",
  );
}

function formatPrice(price?: number | string | null): string {
  if (price === null || price === undefined || price === "") {
    return "Free";
  }

  const amount = Number(price);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "Free";
  }

  return `$${amount.toFixed(2)}`;
}

function formatDate(date?: string | null): string {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not specified";
  }

  return parsedDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getCoverImage(assessment: Assessment): string | null {
  const imageUrl = assessment.imageUrl?.trim();

  return imageUrl || null;
}

export default function AssessmentDetailsPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const { assessmentId } = use(params);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading, isError, refetch } = useGetPublicAssessments(
    1,
    100,
    "",
  );

  const assessments = useMemo(() => getList(data) as Assessment[], [data]);

  const assessment = useMemo(() => {
    const unwrapped = unwrapResponse(data);

    if (
      unwrapped &&
      !Array.isArray(unwrapped) &&
      getAssessmentId(unwrapped) === String(assessmentId)
    ) {
      return unwrapped as Assessment;
    }

    return assessments.find(
      (item) => getAssessmentId(item) === String(assessmentId),
    );
  }, [data, assessments, assessmentId]);
  const { data: userData } = useGetMe();

  const handleProceedToAssessment = () => {
    const attemptPath = "/dashboard/candidate/assessments";

    const tokenKeys = ["accessToken", "access_token", "token"];

    // 2. Token check
    const token = tokenKeys
      .map((key) => localStorage.getItem(key))
      .find((value) => value && value !== "null" && value !== "undefined");

    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(attemptPath)}`);
      return;
    }

    const userRole =
      userData?.data?.role?.toUpperCase() ||
      userData?.role?.toUpperCase() ||
      "";

    if (userRole === "ADMIN" || userRole === "COMPANY") {
      toast.add({
        title: "Only candidates can participate in assessments.",
        description: "",
        type: "error",
      });
      return;
    }

    router.push(attemptPath);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/15">
            <Loader2 className="h-7 w-7 animate-spin text-violet-600 dark:text-violet-400" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Loading assessment details...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <FileText size={34} className="mb-4 text-violet-600" />

        <h2 className="text-2xl font-bold">Failed to load assessment</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The assessment data could not be retrieved.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => refetch()}
            className="bg-violet-600 text-white hover:bg-violet-700"
          >
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/publishedAssessmentCards")}
          >
            Back to Assessments
          </Button>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <FileText size={34} className="mb-4 text-violet-600" />

        <h2 className="text-2xl font-bold">Assessment Not Found</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          This assessment was not found in the data returned by the current
          assessments API.
        </p>

        <Button
          variant="outline"
          onClick={() => router.push("/publishedAssessmentCards")}
          className="mt-5 border-violet-300 hover:bg-violet-50 dark:border-violet-500/40 dark:hover:bg-violet-500/10"
        >
          Back to Assessments
        </Button>
      </div>
    );
  }

  const duration = assessment.duration ?? assessment.settings?.duration;
  const passingScore =
    assessment.passingScore ?? assessment.settings?.passingScore;
  const maxAttempts =
    assessment.maxAttempts ?? assessment.settings?.maxAttempts;

  const coverImage = getCoverImage(assessment);

  const galleryImages = [
    {
      label: "Assessment Cover",
      image: coverImage,
      icon: BookOpen,
    },
    {
      label: "Coding Challenge",
      image: coverImage,
      icon: Code2,
    },
    {
      label: "Skill Evaluation",
      image: coverImage,
      icon: Target,
    },
  ];

  const selectedGalleryImage = galleryImages[selectedImage];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-violet-50/70 via-background to-background text-foreground dark:from-violet-950/20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-violet-100/80 bg-background/85 backdrop-blur-xl dark:border-violet-500/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            href="/publishedAssessmentCards"
            className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-violet-100 hover:text-violet-700 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
          >
            <ArrowLeft size={17} />
            <span>Back to Library</span>
          </Link>

          <div className="flex items-center gap-2 text-sm font-bold text-violet-700 dark:text-violet-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/15">
              <BookOpen size={17} />
            </span>
            <span className="hidden sm:inline">Assessment Platform</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
        {/* Image gallery */}
        <section className="overflow-hidden rounded-3xl border border-violet-200/70 bg-card p-3 shadow-xl shadow-violet-950/5 sm:p-5 dark:border-violet-500/20">
          {/* Large image */}
          <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-700 sm:h-80 lg:h-[410px]">
            {selectedGalleryImage?.image ? (
              <Image
                src={selectedGalleryImage.image}
                alt={`${assessment.title || "Assessment"} cover`}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
                className="object-cover transition-opacity duration-300"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-700" />

                <div className="absolute -top-16 -right-10 h-64 w-64 rounded-full border border-white/15 sm:h-80 sm:w-80" />
                <div className="absolute -right-4 -bottom-36 h-80 w-80 rounded-full border border-white/15" />
                <div className="absolute top-8 left-8 h-20 w-20 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm sm:top-12 sm:left-12 sm:h-28 sm:w-28" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-md sm:h-20 sm:w-20">
                    <Code2 className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>

                  <p className="text-xs font-semibold tracking-[0.25em] text-violet-100 uppercase">
                    Developer Assessment
                  </p>

                  <h2 className="mt-3 max-w-2xl text-2xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
                    {assessment.title || "Assessment Challenge"}
                  </h2>

                  <p className="mt-3 max-w-lg text-sm text-violet-100 sm:text-base">
                    Challenge yourself. Demonstrate your skills. Grow further.
                  </p>
                </div>
              </>
            )}

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

            <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 sm:right-6 sm:bottom-6 sm:left-6">
              <div className="min-w-0 text-white">
                <p className="text-xs font-medium text-white/80">
                  Assessment overview
                </p>
                <p className="mt-1 truncate text-lg font-bold sm:text-xl">
                  {assessment.title || "Untitled Assessment"}
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <ImageIcon size={14} />
                Gallery
              </span>
            </div>
          </div>

          {/* Three small thumbnails */}
          <div className="mt-3 grid grid-cols-3 gap-3 sm:mt-4 sm:gap-4">
            {galleryImages.map((item, index) => {
              const ThumbnailIcon = item.icon;
              const isSelected = selectedImage === index;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Show ${item.label}`}
                  aria-pressed={isSelected}
                  className={`group relative h-20 overflow-hidden rounded-xl border-2 transition-all sm:h-28 sm:rounded-2xl ${
                    isSelected
                      ? "border-violet-600 ring-2 ring-violet-500/20"
                      : "border-transparent hover:border-violet-300 dark:hover:border-violet-500/50"
                  }`}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(max-width: 640px) 33vw, 350px"
                      className={`object-cover transition duration-300 ${
                        isSelected
                          ? "scale-100"
                          : "scale-105 opacity-75 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 dark:from-violet-950 dark:via-violet-900/70 dark:to-fuchsia-950">
                      <div className="flex flex-col items-center gap-1.5 text-violet-700 dark:text-violet-300">
                        <ThumbnailIcon size={23} />
                        <span className="text-[10px] font-semibold sm:text-xs">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  )}

                  {item.image && (
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-2 sm:p-3">
                      <span className="text-left text-[10px] font-semibold text-white sm:text-xs">
                        {item.label}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main details layout */}
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          {/* Left column */}
          <div className="min-w-0 space-y-6">
            {/* Title and description */}
            <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <CheckCircle2 size={14} />
                  {assessment.status || "Published"}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                  <Sparkles size={14} />
                  Assessment
                </span>
              </div>

              <h1 className="mt-5 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                {assessment.title || "Untitled Assessment"}
              </h1>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {assessment.description ||
                  "No description provided for this assessment."}
              </p>
            </section>

            {/* Assessment statistics */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-bold sm:text-xl">
                  Assessment Information
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review the key details before you begin.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-violet-200/70 bg-card p-4 shadow-sm dark:border-violet-500/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Clock3 size={19} />
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">Duration</p>
                  <p className="mt-1 break-words text-lg font-extrabold">
                    {duration != null ? `${duration} min` : "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-200/70 bg-card p-4 shadow-sm dark:border-violet-500/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Target size={19} />
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Passing Score
                  </p>
                  <p className="mt-1 break-words text-lg font-extrabold">
                    {passingScore != null ? `${passingScore}%` : "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-200/70 bg-card p-4 shadow-sm dark:border-violet-500/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Trophy size={19} />
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Max Attempts
                  </p>
                  <p className="mt-1 break-words text-lg font-extrabold">
                    {maxAttempts ?? "Unlimited"}
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-200/70 bg-card p-4 shadow-sm dark:border-violet-500/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <BookOpen size={19} />
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Assessment Type
                  </p>
                  <p className="mt-1 break-words text-lg font-extrabold">
                    Timed Test
                  </p>
                </div>
              </div>
            </section>

            {/* Start and end dates */}
            <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold">Schedule</h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 p-4 dark:border-violet-500/20 dark:bg-violet-500/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Calendar size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Start Date
                    </p>
                    <p className="mt-1 break-words text-sm leading-6 font-bold">
                      {formatDate(assessment.startAt)}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 p-4 dark:border-violet-500/20 dark:bg-violet-500/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Calendar size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">
                      End Date
                    </p>
                    <p className="mt-1 break-words text-sm leading-6 font-bold">
                      {formatDate(assessment.endAt)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Instructions */}
            {assessment.instructions && (
              <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Instructions</h2>
                    <p className="text-xs text-muted-foreground">
                      Please read before starting
                    </p>
                  </div>
                </div>

                <div className="mt-4 whitespace-pre-line rounded-2xl border border-border/60 bg-muted/20 p-4 text-sm leading-7 text-muted-foreground sm:p-5">
                  {assessment.instructions}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-violet-200/70 bg-card shadow-lg shadow-violet-950/5 dark:border-violet-500/20">
              <div className="bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-700 p-6 text-white">
                <p className="text-sm font-medium text-violet-100">
                  Assessment Fee
                </p>

                <p className="mt-2 text-3xl font-extrabold tracking-tight">
                  {formatPrice(assessment.price)}
                </p>

                <p className="mt-2 text-sm leading-6 text-violet-100">
                  Review the details and get ready to test your skills.
                </p>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">Invitation Required</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      A valid candidate invitation is required to start.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Clock3 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">Timed Assessment</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Duration:{" "}
                      {duration != null
                        ? `${duration} minutes`
                        : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Button
                    onClick={handleProceedToAssessment}
                    className="h-12 w-full rounded-xl bg-violet-600 font-bold text-white shadow-md shadow-violet-600/20 transition hover:bg-violet-700"
                  >
                    <Sparkles size={17} className="mr-2" />
                    Start Assessment Now
                    <ArrowRight size={17} className="ml-auto" />
                  </Button>

                  <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                    You must be logged in as a candidate and have a valid
                    invitation to start an assessment.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/publishedAssessmentCards"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-card px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 dark:border-violet-500/20 dark:text-violet-300 dark:hover:bg-violet-500/10"
            >
              <ArrowLeft size={15} />
              Browse Other Assessments
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
