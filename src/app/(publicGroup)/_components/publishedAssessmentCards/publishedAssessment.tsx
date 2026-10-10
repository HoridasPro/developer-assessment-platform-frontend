"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// আপনার সঠিক অ্যাসেসমেন্ট হুকটি এখানে ইম্পোর্ট করুন
import { useGetAssessments } from "@/hooks"; // অথবা আপনার প্রজেক্টের সঠিক হুক নাম

type Assessment = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string | null;
  duration?: number | null;
  passingScore?: number | null;
  maxAttempts?: number | null;
  price?: number | string | null;
  status?: string | null;
  startAt?: string | null;
  endAt?: string | null;
};

const SKELETON_KEYS = [
  "assessment-skeleton-1",
  "assessment-skeleton-2",
  "assessment-skeleton-3",
  "assessment-skeleton-4",
  "assessment-skeleton-5",
  "assessment-skeleton-6",
];

/**
 * API response থেকে নিরাপদে Assessments Array খুঁজে বের করার ফাংশন
 */
function getAssessments(response: any): Assessment[] {
  if (!response) return [];

  // ১. যদি সরাসরি ডাটাই একটি অ্যারে হয়
  if (Array.isArray(response)) return response;

  // ২. যদি রেসপন্সের ভেতরে data বা assessments প্রপার্টি থাকে
  if (response.data && Array.isArray(response.data)) return response.data;
  if (response.assessments && Array.isArray(response.assessments))
    return response.assessments;
  if (response.items && Array.isArray(response.items)) return response.items;
  if (response.results && Array.isArray(response.results))
    return response.results;

  // ৩. nested object চেক
  const keysToTest = [
    "data",
    "assessments",
    "items",
    "results",
    "records",
    "content",
    "docs",
  ];
  for (const key of keysToTest) {
    if (response[key] && typeof response[key] === "object") {
      const nestedObj = response[key];
      if (Array.isArray(nestedObj)) return nestedObj;
      for (const subKey of keysToTest) {
        if (Array.isArray(nestedObj[subKey])) return nestedObj[subKey];
      }
    }
  }

  return [];
}

function formatPrice(price?: number | string | null): string {
  if (price === null || price === undefined || price === "") {
    return "Free";
  }
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return "Free";
  }
  return `$${numericPrice.toFixed(2)}`;
}

function formatDate(date?: string | null): string {
  if (!date) return "Not specified";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Not specified";
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function AssessmentSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex items-center justify-between">
        <div className="h-11 w-11 rounded-xl bg-gray-200 dark:bg-gray-800" />
        <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mb-6 h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800" />
        <div className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800" />
      </div>
      <div className="h-11 rounded-xl bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}

export default function PublishedAssessments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // এখানে অ্যাসেসমেন্ট লিস্ট আনার সঠিক হুকটি কল করুন
  const { data, isLoading, isError, refetch, isFetching } = useGetAssessments();

  console.log("Assessments API Response:", data);

  // সেফলি অ্যারে বের করা
  const assessments = useMemo(() => {
    return getAssessments(data);
  }, [data]);

  // স্ট্যাটাস ফিল্টারিং
  const publishedAssessments = useMemo(() => {
    return assessments.filter((assessment) => {
      if (!assessment.status) return true;
      const status = assessment.status.toUpperCase();
      return status === "PUBLISHED" || status === "ACTIVE";
    });
  }, [assessments]);

  // সার্চ ফিল্টারিং
  const filteredAssessments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return publishedAssessments;

    return publishedAssessments.filter((assessment) => {
      const title = assessment.title?.toLowerCase() ?? "";
      const description = assessment.description?.toLowerCase() ?? "";
      return title.includes(query) || description.includes(query);
    });
  }, [publishedAssessments, searchTerm]);

  const totalPages =
    (data as any)?.meta?.totalPages || (data as any)?.totalPages || 1;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-900/20" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              <Sparkles size={16} />
              Build your skills with real challenges
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover Your Next{" "}
              <span className="text-violet-600 dark:text-violet-400">
                Challenge
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
              Explore published assessments, test your knowledge, and take the
              next step in your developer journey.
            </p>

            <a
              href="#published-assessments"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Explore Assessments
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                <BookOpen size={24} />
              </div>
              <p className="text-3xl font-bold">
                {isLoading ? "..." : publishedAssessments.length}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Published Assessments
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <Target size={24} />
              </div>
              <p className="text-3xl font-bold">Your</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Next Career Challenge
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Clock3 size={24} />
              </div>
              <p className="text-xl font-bold">Timed Tests</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Practice within a time limit
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <Trophy size={24} />
              </div>
              <p className="text-xl font-bold">Track Progress</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Challenge yourself and improve
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessments Section */}
      <section
        id="published-assessments"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
              <FileText size={17} />
              ASSESSMENT LIBRARY
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Published Assessments
            </h2>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              Find an assessment that matches your skills and start practicing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by assessment title or description..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-gray-700 dark:bg-gray-900"
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
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center dark:border-red-900 dark:bg-gray-900">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
              <RefreshCw size={25} />
            </div>
            <h3 className="text-xl font-bold">Failed to load assessments</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
              We could not retrieve the assessments. Please check your
              connection and try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Assessment Cards Grid */}
        {!isLoading && !isError && filteredAssessments.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAssessments.map((assessment, index) => {
                const assessmentId =
                  assessment.id || assessment._id || `item-${index}`;

                return (
                  <article
                    key={assessmentId}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-gray-100 p-6 dark:border-gray-800">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                        <BookOpen size={23} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 size={14} />
                        {assessment.status || "Published"}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="line-clamp-2 text-xl font-bold transition group-hover:text-violet-600 dark:group-hover:text-violet-400">
                        {assessment.title || "Untitled Assessment"}
                      </h3>

                      <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {assessment.description ||
                          "Test your skills and evaluate your knowledge with this assessment."}
                      </p>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Clock3 size={16} />
                            <span className="text-xs">Duration</span>
                          </div>
                          <p className="mt-2 text-base font-bold">
                            {assessment.duration != null
                              ? `${assessment.duration} min`
                              : "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Target size={16} />
                            <span className="text-xs">Passing Score</span>
                          </div>
                          <p className="mt-2 text-base font-bold">
                            {assessment.passingScore != null
                              ? `${assessment.passingScore}%`
                              : "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Max Attempts
                          </p>
                          <p className="mt-2 text-base font-bold">
                            {assessment.maxAttempts ?? "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Price
                          </p>
                          <p className="mt-2 text-base font-bold text-violet-600 dark:text-violet-400">
                            {formatPrice(assessment.price)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                        <p>
                          Starts:{" "}
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {formatDate(assessment.startAt)}
                          </span>
                        </p>
                        <p>
                          Ends:{" "}
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {formatDate(assessment.endAt)}
                          </span>
                        </p>
                      </div>

                      <div className="mt-auto pt-6">
                        <Link
                          href={`/assessments/${assessmentId}`}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                        >
                          See Details
                          <ArrowRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredAssessments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold">
              {searchTerm.trim()
                ? "No matching assessments found"
                : "No published assessments found"}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
              {searchTerm.trim()
                ? "Try another keyword to find an assessment."
                : "There are currently no published assessments available. Please check again later."}
            </p>
            {searchTerm.trim() && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-5 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
