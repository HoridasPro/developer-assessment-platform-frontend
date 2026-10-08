"use client";

import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Trophy,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

import {
  useGetAssessments,
  useGetCandidates,
  useGetCompanyAttempts,
} from "@/hooks";

export default function CompanyDashboardPage() {
  /* ================================= */
  /* Assessments */
  /* ================================= */

  const {
    data: assessmentsData,
    isLoading: assessmentsLoading,
    isError: assessmentsError,
  } = useGetAssessments();

  /* ================================= */
  /* Candidates */
  /* ================================= */

  const {
    data: candidatesData,
    isLoading: candidatesLoading,
    isError: candidatesError,
  } = useGetCandidates();

  /* ================================= */
  /* Attempts */
  /* ================================= */

  const {
    data: attemptsData,
    isLoading: attemptsLoading,
    isError: attemptsError,
  } = useGetCompanyAttempts();

  /* ================================= */
  /* Normalize API Data */
  /* ================================= */

  const assessments = getArrayData(assessmentsData);
  const candidates = getArrayData(candidatesData);
  const attempts = getArrayData(attemptsData);

  /* ================================= */
  /* Debug */
  /* ================================= */

  console.log("Company Dashboard Attempts:", attempts);

  /* ================================= */
  /* Assessment Statistics */
  /* ================================= */

  const totalAssessments = assessments.length;

  const publishedAssessments = assessments.filter(
    (assessment: any) => assessment.status === "PUBLISHED",
  ).length;

  const draftAssessments = assessments.filter(
    (assessment: any) => assessment.status === "DRAFT",
  ).length;

  /* ================================= */
  /* Candidate Statistics */
  /* ================================= */

  const totalCandidates = candidates.length;

  /* ================================= */
  /* Attempt Statistics */
  /* ================================= */

  const totalAttempts = attempts.length;

  /*
   * Company Attempts API currently returns
   * SUBMITTED attempts.
   *
   * So we count both SUBMITTED and COMPLETED
   * as completed/submitted attempts.
   */

  const completedAttempts = attempts.filter(
    (attempt: any) =>
      attempt.status === "SUBMITTED" || attempt.status === "COMPLETED",
  );

  const completedCount = completedAttempts.length;

  /* ================================= */
  /* Passed Attempts */
  /* ================================= */

  const passedAttempts = attempts.filter((attempt: any) => {
    return (
      attempt.passed === true ||
      attempt.isPassed === true ||
      attempt.result?.passed === true
    );
  });

  const passedCount = passedAttempts.length;

  console.log("Passed Attempts:", passedAttempts);
  console.log("Passed Count:", passedCount);

  /* ================================= */
  /* Average Score */
  /* ================================= */

  const scores = completedAttempts
    .map((attempt: any) => {
      return Number(attempt.score ?? attempt.obtainedMarks ?? 0);
    })
    .filter((score: number) => !Number.isNaN(score));

  const averageScore =
    scores.length > 0
      ? Number(
          (
            scores.reduce((sum: number, score: number) => sum + score, 0) /
            scores.length
          ).toFixed(2),
        )
      : 0;

  /* ================================= */
  /* Loading */
  /* ================================= */

  const isLoading = assessmentsLoading || candidatesLoading || attemptsLoading;

  /* ================================= */
  /* Error */
  /* ================================= */

  const isError = assessmentsError || candidatesError || attemptsError;

  /* ================================= */
  /* Loading UI */
  /* ================================= */

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-3 text-sm text-muted-foreground">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* ================================= */
  /* Error UI */
  /* ================================= */

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600 dark:border-red-900 dark:bg-red-950/30">
          <p className="font-medium">Failed to load dashboard data.</p>

          <p className="mt-1 text-sm">Please try again later.</p>
        </div>
      </div>
    );
  }

  /* ================================= */
  /* Dashboard */
  /* ================================= */

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company Overview</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your assessments, candidates and hiring activities.
        </p>
      </div>

      {/* ================================= */}
      {/* Assessment Statistics */}
      {/* ================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Assessments"
          value={totalAssessments}
          icon={<FileText className="h-5 w-5" />}
          iconBg="bg-blue-100 dark:bg-blue-950/50"
          iconColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Published"
          value={publishedAssessments}
          icon={<ClipboardCheck className="h-5 w-5" />}
          iconBg="bg-emerald-100 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Draft Assessments"
          value={draftAssessments}
          icon={<Clock className="h-5 w-5" />}
          iconBg="bg-amber-100 dark:bg-amber-950/50"
          iconColor="text-amber-600 dark:text-amber-400"
        />

        <StatCard
          title="Candidates"
          value={totalCandidates}
          icon={<Users className="h-5 w-5" />}
          iconBg="bg-violet-100 dark:bg-violet-950/50"
          iconColor="text-violet-600 dark:text-violet-400"
        />
      </div>

      {/* ================================= */}
      {/* Attempt Statistics */}
      {/* ================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Attempts"
          value={totalAttempts}
          icon={<BarChart3 className="h-5 w-5" />}
          iconBg="bg-cyan-100 dark:bg-cyan-950/50"
          iconColor="text-cyan-600 dark:text-cyan-400"
        />

        <StatCard
          title="Completed"
          value={completedCount}
          icon={<GraduationCap className="h-5 w-5" />}
          iconBg="bg-indigo-100 dark:bg-indigo-950/50"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Passed"
          value={passedCount}
          icon={<Trophy className="h-5 w-5" />}
          iconBg="bg-emerald-100 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Average Score"
          value={averageScore}
          icon={<Trophy className="h-5 w-5" />}
          iconBg="bg-rose-100 dark:bg-rose-950/50"
          iconColor="text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* ================================= */}
      {/* Chart + Quick Actions */}
      {/* ================================= */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ================================= */}
        {/* Pie Chart */}
        {/* ================================= */}

        <div className="rounded-xl border bg-card p-5 lg:col-span-2">
          <div className="mb-6">
            <h2 className="font-semibold">Assessment Activity</h2>

            <p className="text-sm text-muted-foreground">
              Candidate and attempt overview
            </p>
          </div>

          <AssessmentPieChart
            candidates={totalCandidates}
            attempts={totalAttempts}
            completed={completedCount}
            passed={passedCount}
          />

          {/* ================================= */}
          {/* Average Score */}
          {/* ================================= */}

          <div className="mt-6 flex items-center justify-between rounded-xl border bg-muted/30 p-4">
            <div>
              <p className="text-sm text-muted-foreground">Average Score</p>

              <p className="mt-1 text-2xl font-bold">{averageScore}</p>
            </div>

            <div className="rounded-xl bg-rose-100 p-3 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Quick Actions */}
        {/* ================================= */}

        <div className="rounded-xl border bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold">Quick Actions</h2>

            <p className="text-sm text-muted-foreground">
              Frequently used actions
            </p>
          </div>

          <div className="space-y-3 p-5">
            <QuickAction
              href="/dashboard/company/createAssessment"
              icon={<FileText className="h-5 w-5" />}
              title="Create Assessment"
              description="Create a new candidate assessment"
              iconBg="bg-blue-100 dark:bg-blue-950/50"
              iconColor="text-blue-600 dark:text-blue-400"
            />

            <QuickAction
              href="/dashboard/company/allQuestions"
              icon={<ClipboardCheck className="h-5 w-5" />}
              title="Questions"
              description="Manage assessment questions"
              iconBg="bg-emerald-100 dark:bg-emerald-950/50"
              iconColor="text-emerald-600 dark:text-emerald-400"
            />

            <QuickAction
              href="/dashboard/company/candidates"
              icon={<Users className="h-5 w-5" />}
              title="Candidates"
              description="View and manage candidates"
              iconBg="bg-violet-100 dark:bg-violet-950/50"
              iconColor="text-violet-600 dark:text-violet-400"
            />

            <QuickAction
              href="/dashboard/company/attempts"
              icon={<BarChart3 className="h-5 w-5" />}
              title="Attempts"
              description="Review candidate attempts"
              iconBg="bg-cyan-100 dark:bg-cyan-950/50"
              iconColor="text-cyan-600 dark:text-cyan-400"
            />

            <QuickAction
              href="/dashboard/company/reports"
              icon={<Trophy className="h-5 w-5" />}
              title="Reports"
              description="View assessment reports"
              iconBg="bg-rose-100 dark:bg-rose950/50"
              iconColor="text-rose-600 dark:text-rose-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================= */
/* Normalize API Array */
/* ================================= */

function getArrayData(data: any): any[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

/* ================================= */
/* Stat Card */
/* ================================= */

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="group rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <div
          className={`rounded-xl p-3 ${iconBg} ${iconColor} transition-transform duration-200 group-hover:scale-105`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

/* ================================= */
/* Pie Chart */
/* ================================= */

function AssessmentPieChart({
  candidates,
  attempts,
  completed,
  passed,
}: {
  candidates: number;
  attempts: number;
  completed: number;
  passed: number;
}) {
  const data = [
    {
      name: "Candidates",
      value: candidates,
      color: "#6366f1",
    },
    {
      name: "Attempts",
      value: attempts,
      color: "#06b6d4",
    },
    {
      name: "Completed",
      value: completed,
      color: "#8b5cf6",
    },
    {
      name: "Passed",
      value: passed,
      color: "#10b981",
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-900">
            <BarChart3 className="h-7 w-7" />
          </div>

          <p className="mt-4 font-medium">No activity yet</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Data will appear here when candidates start assessments.
          </p>
        </div>
      </div>
    );
  }

  let current = 0;

  const gradientParts = data.map((item) => {
    const start = (current / total) * 100;

    current += item.value;

    const end = (current / total) * 100;

    return `${item.color} ${start}% ${end}%`;
  });

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
      {/* Pie */}

      <div
        className="relative h-56 w-56 shrink-0 rounded-full shadow-sm"
        style={{
          background: `conic-gradient(${gradientParts.join(", ")})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-card shadow-sm">
            <span className="text-xs text-muted-foreground">Total</span>

            <span className="text-2xl font-bold">{total}</span>
          </div>
        </div>
      </div>

      {/* Legend */}

      <div className="w-full max-w-[260px] space-y-3">
        {data.map((item) => {
          const percentage =
            total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";

          return (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-sm font-medium">{item.name}</span>
              </div>

              <div className="text-right">
                <span className="font-semibold">{item.value}</span>

                <span className="ml-1 text-xs text-muted-foreground">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================= */
/* Quick Action */
/* ================================= */

function QuickAction({
  href,
  icon,
  title,
  description,
  iconBg,
  iconColor,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
    >
      <div
        className={`shrink-0 rounded-xl p-2.5 ${iconBg} ${iconColor} transition-transform duration-200 group-hover:scale-105`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-medium">{title}</p>

        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>

      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
