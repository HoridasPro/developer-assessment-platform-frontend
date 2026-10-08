"use client";

import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  Loader2,
  Search,
  TrendingUp,
  Trophy,
  Users,
  XCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useGetAssessmentReport, useGetAssessments } from "@/hooks";
import Image from "next/image";

type Assessment = {
  id: string;
  title: string;
};

type CandidateReport = {
  attemptId: string;
  candidateId: string;
  candidateName: string;
  email: string;
  profilePhoto: string | null;
  attemptNumber: number;
  status: string;
  score: number;
  passed: boolean | null;
  startedAt: string | null;
  submittedAt: string | null;
  expiresAt: string | null;
};

type ReportData = {
  assessment: {
    id: string;
    title: string;
    description: string;
    duration: number;
    passingScore: number;
    price: number;
    status: string;
  };

  summary: {
    totalCandidates: number;
    totalAttempts: number;
    completed: number;
    submitted: number;
    passed: number;
    failed: number;
    inProgress: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    passRate: number;
  };

  candidates: CandidateReport[];
};

export default function CompanyReportsPage() {
  const [assessmentId, setAssessmentId] = useState("");

  // ==========================================
  // Get company assessments
  // ==========================================

  const { data: assessmentsData, isLoading: assessmentsLoading } =
    useGetAssessments();

  const assessments: Assessment[] = Array.isArray(assessmentsData)
    ? assessmentsData
    : [];

  // ==========================================
  // Get report
  // ==========================================

  const {
    data,
    isLoading: reportLoading,
    isError,
    refetch,
  } = useGetAssessmentReport(assessmentId);

  const report: ReportData | null = data?.data ?? null;

  // ==========================================
  // Loading
  // ==========================================

  const isLoading = assessmentsLoading || reportLoading;

  // ==========================================
  // Handle assessment change
  // ==========================================

  const handleAssessmentChange = (value: string) => {
    setAssessmentId(value);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Assessment Reports
          </h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Analyze candidate performance, completion metrics, and test
            statistics.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/80 bg-card shadow-sm transition-transform hover:scale-105">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
      </div>

      {/* ==========================================
          Assessment Selector
      ========================================== */}

      <div className="rounded-2xl border border-border/80 bg-card/60 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Select Assessment</h2>
            <p className="text-xs text-muted-foreground">
              Choose an assessment to generate its detailed analytics report
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <select
              value={assessmentId}
              onChange={(event) => handleAssessmentChange(event.target.value)}
              disabled={assessmentsLoading}
              className="h-11 w-full appearance-none rounded-xl border border-input bg-background/80 pl-4 pr-10 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {assessmentsLoading
                  ? "Loading assessments..."
                  : "Select an assessment"}
              </option>

              {assessments.map((assessment) => (
                <option key={assessment.id} value={assessment.id}>
                  {assessment.title}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={!assessmentId || reportLoading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {reportLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* ==========================================
          No Assessments
      ========================================== */}

      {!assessmentsLoading && assessments.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/30 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FileText className="h-7 w-7 text-muted-foreground" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-foreground">
            No Assessments Found
          </h2>

          <p className="mt-1.5 max-w-sm mx-auto text-sm text-muted-foreground">
            Create an assessment first to view candidate attempts and detailed
            performance analytics.
          </p>
        </div>
      )}

      {/* ==========================================
          Error State
      ========================================== */}

      {isError && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-destructive backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold">Unable to fetch report</h3>
              <p className="mt-1 text-sm text-destructive/90">
                An error occurred while communicating with the assessment
                service.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center rounded-lg bg-destructive px-4 py-2 text-xs font-semibold text-destructive-foreground shadow-sm hover:bg-destructive/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          No Report Selected Empty State
      ========================================== */}

      {!assessmentId && !isLoading && !isError && (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/20 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-8 w-8" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-foreground">
            No Assessment Selected
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Select an assessment from the dropdown menu above to view
            performance analytics and candidate results.
          </p>
        </div>
      )}

      {/* ==========================================
          Loading Report State
      ========================================== */}

      {assessmentId && reportLoading && (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-border/80 bg-card/40 p-12 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading assessment report...
          </p>
        </div>
      )}

      {/* ==========================================
          Report Content
      ========================================== */}

      {report && !reportLoading && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* ======================================
                Assessment Overview Information
            ====================================== */}

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {report.assessment.title}
                  </h2>
                  <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {report.assessment.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {report.assessment.description}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border/50 bg-muted/40 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Duration
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {report.assessment.duration}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    minutes
                  </span>
                </p>
              </div>

              <div className="rounded-xl border border-border/50 bg-muted/40 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Passing Score
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {report.assessment.passingScore}
                </p>
              </div>

              <div className="rounded-xl border border-border/50 bg-muted/40 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Price
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  ${report.assessment.price}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    USD
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ======================================
                Summary Cards
            ====================================== */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Candidates */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Candidates
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {report.summary.totalCandidates}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Total Attempts */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Attempts
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {report.summary.totalAttempts}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <ClipboardList className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Total Passed */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Passed
                  </p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {report.summary.passed}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Total Failed */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Failed
                  </p>
                  <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">
                    {report.summary.failed}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <XCircle className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* ======================================
                Performance Breakdown Cards
            ====================================== */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">
                Completed
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {report.summary.completed}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">
                Submitted
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {report.summary.submitted}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">
                  In Progress
                </p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {report.summary.inProgress}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">
                Average Score
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {report.summary.averageScore}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-amber-500" />
                <p className="text-xs font-medium text-muted-foreground">
                  Highest Score
                </p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {report.summary.highestScore}
              </p>
            </div>
          </div>

          {/* ======================================
                Pass Rate Indicator
            ====================================== */}

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    Overall Pass Rate
                  </p>
                </div>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
                  {report.summary.passRate}%
                </p>
              </div>
              <p className="text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border/40">
                Calculated from finished attempts
              </p>
            </div>

            {/* Progress Bar Visual Representation */}
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{
                  width: `${Math.min(Math.max(report.summary.passRate, 0), 100)}%`,
                }}
              />
            </div>
          </div>

          {/* ======================================
                Candidate Performance Table
            ====================================== */}

          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
            <div className="border-b border-border/80 p-6">
              <h2 className="text-lg font-bold text-foreground">
                Candidate Results
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Detailed assessment records for individual candidates.
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead className="border-b border-border/60 bg-muted/40 text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">Candidate</th>
                    <th className="px-6 py-4 text-left">Attempt</th>
                    <th className="px-6 py-4 text-left">Score</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Result</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/60">
                  {report.candidates.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-sm text-muted-foreground"
                      >
                        No candidate attempts recorded for this assessment.
                      </td>
                    </tr>
                  ) : (
                    report.candidates.map((candidate) => (
                      <tr
                        key={candidate.attemptId}
                        className="transition-colors hover:bg-muted/30"
                      >
                        {/* Candidate Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            {candidate.profilePhoto ? (
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/60">
                                <Image
                                  src={candidate.profilePhoto}
                                  alt={candidate.candidateName}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                                {candidate.candidateName
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="font-semibold text-foreground">
                                {candidate.candidateName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {candidate.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Attempt */}
                        <td className="px-6 py-4 font-medium text-foreground">
                          #{candidate.attemptNumber}
                        </td>

                        {/* Score */}
                        <td className="px-6 py-4 font-semibold text-foreground">
                          {candidate.score}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                            {candidate.status}
                          </span>
                        </td>

                        {/* Result */}
                        <td className="px-6 py-4">
                          {candidate.passed === true ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Passed
                            </span>
                          ) : candidate.passed === false ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20">
                              <XCircle className="h-3.5 w-3.5" />
                              Failed
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="space-y-4 p-4 md:hidden">
              {report.candidates.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No candidate attempts recorded for this assessment.
                </div>
              ) : (
                report.candidates.map((candidate) => (
                  <div
                    key={candidate.attemptId}
                    className="rounded-xl border border-border/80 bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      {candidate.profilePhoto ? (
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border/60">
                          <Image
                            src={candidate.profilePhoto}
                            alt={candidate.candidateName}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-sm">
                          {candidate.candidateName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">
                          {candidate.candidateName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {candidate.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="rounded-lg bg-muted/40 p-3 border border-border/40">
                        <p className="text-xs font-medium text-muted-foreground">
                          Attempt
                        </p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          #{candidate.attemptNumber}
                        </p>
                      </div>

                      <div className="rounded-lg bg-muted/40 p-3 border border-border/40">
                        <p className="text-xs font-medium text-muted-foreground">
                          Score
                        </p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {candidate.score}
                        </p>
                      </div>

                      <div className="rounded-lg bg-muted/40 p-3 border border-border/40">
                        <p className="text-xs font-medium text-muted-foreground">
                          Status
                        </p>
                        <p className="mt-1 text-xs font-semibold text-foreground">
                          {candidate.status}
                        </p>
                      </div>

                      <div className="rounded-lg bg-muted/40 p-3 border border-border/40">
                        <p className="text-xs font-medium text-muted-foreground">
                          Result
                        </p>
                        <div className="mt-1">
                          {candidate.passed === true ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Passed
                            </span>
                          ) : candidate.passed === false ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                              <XCircle className="h-3.5 w-3.5" />
                              Failed
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
