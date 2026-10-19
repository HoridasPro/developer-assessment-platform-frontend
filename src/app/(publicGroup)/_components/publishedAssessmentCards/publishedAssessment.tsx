"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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

  // নেস্টেড প্রপার্টি হ্যান্ডেল করার জন্য অতিরিক্ত ফিল্ড
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
    <div className="animate-pulse rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 h-11 w-11 rounded-xl bg-muted" />
      <div className="mb-3 h-6 w-3/4 rounded bg-muted" />
      <div className="mb-2 h-4 w-full rounded bg-muted" />
      <div className="mb-6 h-4 w-2/3 rounded bg-muted" />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="h-16 rounded-xl bg-muted" />
        <div className="h-16 rounded-xl bg-muted" />
      </div>

      <div className="h-11 rounded-xl bg-muted" />
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

      return (
        assessment.title?.toLowerCase().includes(query) ||
        assessment.description?.toLowerCase().includes(query)
      );
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
    <main className="min-h-screen text-foreground">
      <section
        id="published-assessments"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        {/* Header and search */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
              <FileText size={15} />
              ASSESSMENT LIBRARY
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Published Assessments
            </h2>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Explore challenges designed to improve your skills.
            </p>
          </div>

          <div className="relative w-full md:w-80 lg:w-96">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search assessments..."
              className="w-full rounded-xl border border-border bg-card py-2.5 pr-4 pl-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKELETON_KEYS.map((key) => (
              <AssessmentSkeleton key={key} />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="rounded-2xl border border-destructive/30 bg-card p-8 text-center">
            <h3 className="text-xl font-bold">Failed to load assessments</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please try loading the assessments again.
            </p>

            <Button onClick={() => refetch()} className="mt-5 rounded-xl">
              Try Again
            </Button>
          </div>
        )}

        {/* Assessment cards */}
        {!isLoading && !isError && filteredAssessments.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <BookOpen size={22} />
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 size={13} />
                          {assessment.status || "Published"}
                        </span>
                      </div>

                      <h3 className="mt-5 line-clamp-2 text-lg font-bold group-hover:text-primary">
                        {assessment.title || "Untitled Assessment"}
                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
                        {assessment.description ||
                          "Test your skills with this assessment."}
                      </p>

                      {/* Assessment information */}
                      <div className="mt-5 grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock3 size={14} />
                            <span className="text-xs">Duration</span>
                          </div>

                          <p className="mt-1 text-sm font-bold">
                            {assessmentDuration != null
                              ? `${assessmentDuration} min`
                              : "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Target size={14} />
                            <span className="text-xs">Passing</span>
                          </div>

                          <p className="mt-1 text-sm font-bold">
                            {passingScore != null ? `${passingScore}%` : "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                          <span className="text-xs text-muted-foreground">
                            Max Attempts
                          </span>

                          <p className="mt-1 text-sm font-bold">
                            {maxAttempts}
                          </p>
                        </div>

                        <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                          <span className="text-xs text-muted-foreground">
                            Price
                          </span>

                          <p className="mt-1 text-sm font-bold text-primary">
                            {formatPrice(assessment)}
                          </p>
                        </div>
                      </div>

                      {/* Start and end dates */}
                      <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
                        <div className="flex items-start gap-2.5">
                          <CalendarDays
                            size={16}
                            className="mt-0.5 shrink-0 text-primary"
                          />

                          <div className="min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">
                              Starts
                            </p>

                            <p className="mt-1 break-words text-sm font-semibold text-foreground">
                              {formatDate(startDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <CalendarDays
                            size={16}
                            className="mt-0.5 shrink-0 text-primary"
                          />

                          <div className="min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">
                              Ends
                            </p>

                            <p className="mt-1 break-words text-sm font-semibold text-foreground">
                              {formatDate(endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details only */}
                    <div className="mt-6">
                      <Button
                        type="button"
                        onClick={() => handleSeeDetails(assessmentId)}
                        className="w-full rounded-xl font-semibold"
                      >
                        See Details
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
              <Button
                variant="outline"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((previous) => Math.max(previous - 1, 1))}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              <Button
                disabled={page >= totalPages || isLoading}
                onClick={() =>
                  setPage((previous) => Math.min(previous + 1, totalPages))
                }
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredAssessments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Search size={28} className="mx-auto mb-4 text-primary" />

            <h3 className="text-xl font-bold">
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
                className="mt-5"
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
