"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock3,
  FileText,
  Sparkles,
  Target,
  Trophy,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetPublicAssessments } from "@/hooks";

type Assessment = {
  id?: string;
  _id?: string;
  assessmentId?: string;
  title?: string;
  description?: string | null;
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
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AssessmentDetailsPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const { assessmentId } = use(params);
  const router = useRouter();

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

  // Attempt page-এ সরাসরি যাবে।
  // কোনো assessmentId বা attemptId URL-এ পাঠানো হচ্ছে না।
  // এখানে startAssessment API-ও কল করা হচ্ছে না।
  const handleProceedToAssessment = () => {
    const attemptPath = "/dashboard/candidate/assessments";

    const tokenKeys = ["accessToken", "access_token", "token"];

    const token = tokenKeys
      .map((key) => localStorage.getItem(key))
      .find((value) => value && value !== "null" && value !== "undefined");

    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(attemptPath)}`);
      return;
    }

    router.push(attemptPath);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading assessment details...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <FileText size={32} className="mb-4 text-destructive" />

        <h2 className="text-2xl font-bold">Failed to load assessment</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The assessment data could not be retrieved.
        </p>

        <div className="mt-5 flex gap-3">
          <Button onClick={() => refetch()}>Try Again</Button>

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
        <FileText size={32} className="mb-4 text-destructive" />

        <h2 className="text-2xl font-bold">Assessment Not Found</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          This assessment was not found in the data returned by the current
          assessments API.
        </p>

        <Button
          variant="outline"
          onClick={() => router.push("/publishedAssessmentCards")}
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

  return (
    <main className="min-h-screen pb-20 text-foreground">
      <header className="border-b border-border/80 bg-card">
        <div className="mx-auto flex max-w-4xl items-center px-5 py-4 sm:px-8">
          <Link
            href="/publishedAssessmentCards"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80"
          >
            <ArrowLeft size={16} />
            Back to Library
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="border-b border-border/60 bg-gradient-to-r from-primary/10 via-transparent to-blue-500/10 p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={14} />
                {assessment.status || "Published"}
              </span>

              <span className="text-lg font-extrabold text-primary">
                {formatPrice(assessment.price)}
              </span>
            </div>

            <h1 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-4xl">
              {assessment.title || "Untitled Assessment"}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {assessment.description ||
                "No description provided for this assessment."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-b border-border/60 p-6 sm:grid-cols-4 sm:p-8">
            <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock3 size={17} />
                <span className="text-xs font-medium">Duration</span>
              </div>

              <p className="mt-2 text-base font-bold">
                {duration != null ? `${duration} mins` : "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target size={17} />
                <span className="text-xs font-medium">Passing Score</span>
              </div>

              <p className="mt-2 text-base font-bold">
                {passingScore != null ? `${passingScore}%` : "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy size={17} />
                <span className="text-xs font-medium">Max Attempts</span>
              </div>

              <p className="mt-2 text-base font-bold">
                {maxAttempts ?? "Unlimited"}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/30 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen size={17} />
                <span className="text-xs font-medium">Type</span>
              </div>

              <p className="mt-2 text-base font-bold">Timed Test</p>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4">
                <Calendar className="mt-0.5 shrink-0 text-primary" size={19} />

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Start Date
                  </h4>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(assessment.startAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4">
                <Calendar className="mt-0.5 shrink-0 text-primary" size={19} />

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    End Date
                  </h4>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(assessment.endAt)}
                  </p>
                </div>
              </div>
            </div>

            {assessment.instructions && (
              <div>
                <h3 className="text-lg font-bold">Instructions</h3>

                <div className="mt-2.5 rounded-2xl border border-border/50 bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
                  {assessment.instructions}
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button
                onClick={handleProceedToAssessment}
                className="w-full rounded-xl py-6 text-base font-bold shadow-lg"
              >
                <Sparkles size={18} className="mr-2" />
                Start Assessment Now
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                You must be logged in as a candidate and have a valid invitation
                to start an assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
