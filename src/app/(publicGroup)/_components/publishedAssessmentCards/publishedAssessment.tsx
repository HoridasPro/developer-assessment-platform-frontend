"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  Target,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetPublicAssessments } from "@/hooks";

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
  attempts?: number | null;
  price?: number | string | null;
  status?: string | null;

  startAt?: string | Date | null;
  endAt?: string | Date | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  startsAt?: string | Date | null;
  endsAt?: string | Date | null;

  settings?: {
    maxAttempts?: number | null;
    duration?: number | null;
    passingScore?: number | null;
  };
  pricing?: {
    price?: number | string | null;
  };
};

const SKELETON_KEYS = Array.from(
  { length: 6 },
  (_, index) => `assessment-skeleton-${index + 1}`,
);

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

function getAssessments(response: any): Assessment[] {
  const result = unwrapResponse(response);

  if (Array.isArray(result)) {
    return result;
  }

  if (!result || typeof result !== "object") {
    return [];
  }

  const keys = [
    "assessments",
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

function formatPrice(assessment: Assessment): string {
  const rawPrice = assessment.price ?? assessment.pricing?.price;

  if (rawPrice === null || rawPrice === undefined || rawPrice === "") {
    return "Free";
  }

  const amount = Number(rawPrice);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "Free";
  }

  return `$${amount.toFixed(2)}`;
}

function getMaxAttempts(assessment: Assessment): string | number {
  return (
    assessment.maxAttempts ??
    assessment.attempts ??
    assessment.settings?.maxAttempts ??
    "Unlimited"
  );
}

function getDuration(assessment: Assessment): number | null | undefined {
  return (
    assessment.duration ??
    assessment.settings?.duration ??
    (assessment as any)?.timeLimit ??
    (assessment as any)?.time
  );
}

function getPassingScore(assessment: Assessment): number | null | undefined {
  return (
    assessment.passingScore ??
    assessment.settings?.passingScore ??
    (assessment as any)?.passMark ??
    (assessment as any)?.passingPercentage
  );
}

function getAssessmentDate(
  assessment: Assessment,
  type: "start" | "end",
): string | Date | null | undefined {
  if (type === "start") {
    return (
      assessment.startAt ??
      assessment.startDate ??
      assessment.startsAt ??
      (assessment as any)?.schedule?.startAt ??
      (assessment as any)?.schedule?.startDate
    );
  }

  return (
    assessment.endAt ??
    assessment.endDate ??
    assessment.endsAt ??
    (assessment as any)?.schedule?.endAt ??
    (assessment as any)?.schedule?.endDate
  );
}

function formatDate(date?: string | Date | null): string {
  if (!date) {
    return "Not specified";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not specified";
  }

  return parsedDate.toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function AssessmentSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="h-36 w-full bg-muted" />

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-9 w-9 rounded-lg bg-muted" />
          <div className="h-5 w-20 rounded-full bg-muted" />
        </div>

        <div className="mb-4 h-5 w-3/4 rounded bg-muted" />

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="h-14 rounded-lg bg-muted" />
          <div className="h-14 rounded-lg bg-muted" />
          <div className="h-14 rounded-lg bg-muted" />
          <div className="h-14 rounded-lg bg-muted" />
        </div>

        <div className="mb-4 h-10 rounded-lg bg-muted" />
        <div className="h-10 rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function PublishedAssessments() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const limit = 9;

  const { data, isLoading, isError, refetch } = useGetPublicAssessments(
    page,
    limit,
    searchTerm.trim(),
  );

  const assessments = useMemo(() => getAssessments(data), [data]);

  const filteredAssessments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return assessments.filter((assessment) => {
      const status = assessment.status?.toUpperCase();

      const isPublished = !status || ["PUBLISHED", "ACTIVE"].includes(status);

      if (!isPublished) {
        return false;
      }

      if (!query) {
        return true;
      }

      return assessment.title?.toLowerCase().includes(query);
    });
  }, [assessments, searchTerm]);

  const unwrappedData = unwrapResponse(data);

  const totalPages = Math.max(
    1,
    Number(
      unwrappedData?.meta?.totalPages ??
        unwrappedData?.pagination?.totalPages ??
        unwrappedData?.totalPages ??
        1,
    ),
  );

  const handleSeeDetails = (assessmentId: string) => {
    if (!assessmentId || assessmentId === "undefined") {
      console.error("Assessment ID is missing.");
      return;
    }

    const detailsPath = `/publishedAssessmentCards/${encodeURIComponent(
      assessmentId,
    )}`;

    const tokenKeys = ["accessToken", "access_token", "token"];

    const token = tokenKeys
      .map((key) => localStorage.getItem(key))
      .find((value) => value && value !== "null" && value !== "undefined");

    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(detailsPath)}`);
      return;
    }

    router.push(detailsPath);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        id="published-assessments"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        {/* Header and search */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-violet-600 uppercase dark:text-violet-400">
              <FileText size={14} />
              ASSESSMENT LIBRARY
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Published Assessments
            </h2>

            <p className="mt-1.5 text-sm text-muted-foreground">
              Explore challenges and test your skills.
            </p>
          </div>

          <div className="relative w-full md:w-72 lg:w-80">
            <Search
              size={16}
              className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search assessments..."
              className="w-full rounded-xl border border-border bg-card py-2.5 pr-4 pl-10 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKELETON_KEYS.map((key) => (
              <AssessmentSkeleton key={key} />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="rounded-2xl border border-destructive/30 bg-card p-8 text-center">
            <h3 className="text-lg font-bold">Failed to load assessments</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please try loading the assessments again.
            </p>

            <Button
              onClick={() => refetch()}
              className="mt-4 rounded-xl bg-violet-600 text-white hover:bg-violet-700"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Assessment cards */}
        {!isLoading && !isError && filteredAssessments.length > 0 && (
          <>
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredAssessments.map((assessment) => {
                const assessmentId = getAssessmentId(assessment);

                if (!assessmentId) {
                  return null;
                }

                const startDate = getAssessmentDate(assessment, "start");
                const endDate = getAssessmentDate(assessment, "end");
                const maxAttempts = getMaxAttempts(assessment);
                const assessmentDuration = getDuration(assessment);
                const passingScore = getPassingScore(assessment);

                return (
                  <article
                    key={assessmentId}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/70 hover:shadow-lg hover:shadow-violet-500/5"
                  >
                    {/* Image */}
                    <div className="relative h-36 w-full shrink-0 overflow-hidden bg-violet-100 dark:bg-violet-950/40">
                      {assessment.imageUrl ? (
                        <Image
                          src={assessment.imageUrl}
                          alt={`${assessment.title || "Assessment"} cover image`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 via-violet-50 to-purple-100 dark:from-violet-950/70 dark:via-violet-900/30 dark:to-purple-950/70">
                          <BookOpen size={38} className="text-violet-500/70" />
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />

                      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/95 px-2.5 py-1 text-xs font-semibold text-violet-700 shadow-sm">
                        <CheckCircle2 size={12} />
                        {assessment.status || "Published"}
                      </span>
                    </div>

                    {/* Card content */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                          <BookOpen size={19} />
                        </div>

                        <h3 className="line-clamp-2 pt-1 text-base leading-6 font-bold transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
                          {assessment.title || "Untitled Assessment"}
                        </h3>
                      </div>

                      {/* Assessment information */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-border/70 bg-muted/30 p-2.5">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock3
                              size={13}
                              className="shrink-0 text-violet-600 dark:text-violet-400"
                            />
                            <span className="text-xs">Duration</span>
                          </div>

                          <p className="mt-1 text-sm font-bold">
                            {assessmentDuration != null
                              ? `${assessmentDuration} min`
                              : "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-border/70 bg-muted/30 p-2.5">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Target
                              size={13}
                              className="shrink-0 text-violet-600 dark:text-violet-400"
                            />
                            <span className="text-xs">Passing</span>
                          </div>

                          <p className="mt-1 text-sm font-bold">
                            {passingScore != null ? `${passingScore}%` : "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-border/70 bg-muted/30 p-2.5">
                          <p className="text-xs text-muted-foreground">
                            Max Attempts
                          </p>

                          <p className="mt-1 truncate text-sm font-bold">
                            {maxAttempts}
                          </p>
                        </div>

                        <div className="rounded-xl border border-violet-200/70 bg-violet-50/70 p-2.5 dark:border-violet-500/20 dark:bg-violet-500/10">
                          <p className="text-xs text-muted-foreground">Price</p>

                          <p className="mt-1 text-sm font-bold text-violet-700 dark:text-violet-300">
                            {formatPrice(assessment)}
                          </p>
                        </div>
                      </div>

                      {/* Start and end dates */}
                      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border/60 pt-3">
                        <div className="flex min-w-0 items-start gap-2">
                          <CalendarDays
                            size={14}
                            className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-400"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] text-muted-foreground">
                              Starts
                            </p>

                            <p className="mt-1 break-words text-xs leading-5 font-medium">
                              {formatDate(startDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex min-w-0 items-start gap-2">
                          <CalendarDays
                            size={14}
                            className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-400"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] text-muted-foreground">
                              Ends
                            </p>

                            <p className="mt-1 break-words text-xs leading-5 font-medium">
                              {formatDate(endDate)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Details button */}
                      <div className="mt-auto pt-4">
                        <Button
                          type="button"
                          onClick={() => handleSeeDetails(assessmentId)}
                          className="h-10 w-full rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                        >
                          See Details
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 sm:p-4">
              <Button
                variant="outline"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((previous) => Math.max(previous - 1, 1))}
                className="h-9 rounded-lg"
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </Button>

              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                Page {page} of {totalPages}
              </span>

              <Button
                disabled={page >= totalPages || isLoading}
                onClick={() =>
                  setPage((previous) => Math.min(previous + 1, totalPages))
                }
                className="h-9 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredAssessments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <Search size={22} />
            </div>

            <h3 className="text-lg font-bold">
              {searchTerm.trim()
                ? "No matching assessments found"
                : "No published assessments found"}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm.trim()
                ? "Try another search keyword."
                : "There are currently no published assessments."}
            </p>

            {searchTerm.trim() && (
              <Button
                variant="outline"
                onClick={() => handleSearchChange("")}
                className="mt-4 rounded-xl border-violet-300 text-violet-700 hover:bg-violet-50 dark:border-violet-500/40 dark:text-violet-300 dark:hover:bg-violet-500/10"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
