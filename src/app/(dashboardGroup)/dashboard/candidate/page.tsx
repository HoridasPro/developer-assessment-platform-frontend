 

"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Ban,
  CheckCircle2,
  Clock,
  FileText,
  PlayCircle,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";

import { useGetInvitationAssessments } from "@/hooks";
import AssessmentPieChart from "../_components/assessmentsPieChart/assessmentsPieChart";

type AttemptResult = {
  id?: string;
  status?: string;
  score?: number | null;
  obtainedMarks?: number | null;
  totalMarks?: number | null;
  percentage?: number | null;
  passed?: boolean | null;
};

type Assessment = {
  id?: string;
  assessmentId?: string;
  attemptId?: string | null;

  title?: string;
  assessmentTitle?: string;

  status?: string;
  attemptStatus?: string;

  duration?: number;
  passingScore?: number;

  score?: number | null;
  obtainedMarks?: number | null;
  totalMarks?: number | null;
  percentage?: number | null;
  passed?: boolean | null;
  attemptNumber?: number | null;

  attempt?: AttemptResult | null;
  result?: AttemptResult | null;

  assessment?: {
    id?: string;
    title?: string;
    duration?: number;
    passingScore?: number;
    totalMarks?: number;
  } | null;
};

function getNumber(
  ...values: (number | string | null | undefined)[]
): number | null {
  for (const value of values) {
    if (value !== null && value !== undefined && value !== "") {
      const num = Number(value);

      if (Number.isFinite(num)) {
        return num;
      }
    }
  }

  return null;
}

function getPercentage(item: Assessment): number | null {
  // 1. সরাসরি percentage পাওয়া গেলে সেটি ব্যবহার করো।
  const percentage = getNumber(
    item.percentage,
    item.result?.percentage,
    item.attempt?.percentage,
  );

  if (percentage !== null && percentage >= 0 && percentage <= 100) {
    return percentage;
  }

  // 2. প্রাপ্ত নম্বর বের করো।
  const obtainedMarks = getNumber(
    item.obtainedMarks,
    item.result?.obtainedMarks,
    item.attempt?.obtainedMarks,
    item.result?.score,
    item.attempt?.score,
    item.score,
  );

  // 3. মোট নম্বর বের করো।
  const totalMarks = getNumber(
    item.totalMarks,
    item.result?.totalMarks,
    item.attempt?.totalMarks,
    item.assessment?.totalMarks,
  );

  // 4. প্রাপ্ত নম্বর ও মোট নম্বর থাকলে percentage হিসাব করো।
  if (
    obtainedMarks !== null &&
    totalMarks !== null &&
    totalMarks > 0 &&
    obtainedMarks >= 0
  ) {
    return Math.min(100, (obtainedMarks / totalMarks) * 100);
  }

  // 5. score যদি নিজেই percentage হয়, তখন সেটি ব্যবহার করো।
  // এই নিয়ম কেবল score 0–100 percentage হলে সঠিক।
  const score = getNumber(item.score);

  if (score !== null && score >= 0 && score <= 100) {
    return score;
  }

  return null;
}

function getPassed(item: Assessment): boolean | null {
  const passed = item.passed ?? item.result?.passed ?? item.attempt?.passed;

  if (typeof passed === "boolean") {
    return passed;
  }

  const percentage = getPercentage(item);
  const passingScore = getNumber(
    item.passingScore,
    item.assessment?.passingScore,
  );

  if (percentage !== null && passingScore !== null) {
    return percentage >= passingScore;
  }

  return null;
}

export default function CandidateDashboard() {
  const { data, isLoading, isError } = useGetInvitationAssessments();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="font-medium text-destructive">
          Failed to load dashboard data.
        </p>
      </div>
    );
  }

  const rawData = data?.data;
  const assessments: Assessment[] = Array.isArray(rawData) ? rawData : [];

  const normalizedAssessments = assessments.map((item) => {
    const attemptStatus = String(
      item.attemptStatus ?? item.attempt?.status ?? "",
    ).toUpperCase();

    const invitationStatus = String(item.status ?? "").toUpperCase();

    let status = attemptStatus || invitationStatus;

    if (
      ["COMPLETED", "IN_PROGRESS", "CANCELLED", "EXPIRED"].includes(
        attemptStatus,
      )
    ) {
      status = attemptStatus;
    } else if (
      !attemptStatus &&
      ["ACCEPTED", "PENDING", "NOT_STARTED"].includes(invitationStatus)
    ) {
      status = "PENDING";
    }

    return { ...item, status };
  });

  // Statistics
  const totalAssessments = normalizedAssessments.length;

  const inProgressCount = normalizedAssessments.filter(
    (item) => item.status === "IN_PROGRESS",
  ).length;

  const completedAssessments = normalizedAssessments.filter(
    (item) => item.status === "COMPLETED",
  );

  const completedCount = completedAssessments.length;

  const pendingCount = normalizedAssessments.filter(
    (item) => item.status === "PENDING",
  ).length;

  const cancelledCount = normalizedAssessments.filter(
    (item) => item.status === "CANCELLED",
  ).length;

  const expiredCount = normalizedAssessments.filter(
    (item) => item.status === "EXPIRED",
  ).length;

  // Performance: completed attempts থেকে score বের করো।
  const scores = completedAssessments
    .map(getPercentage)
    .filter((score): score is number => score !== null);

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length,
        )
      : null;

  const passedCount = completedAssessments.filter(
    (item) => getPassed(item) === true,
  ).length;

  const failedCount = completedAssessments.filter(
    (item) => getPassed(item) === false,
  ).length;

  const evaluatedCount = completedAssessments.filter(
    (item) => getPassed(item) !== null,
  ).length;

  const inProgressAssessment = normalizedAssessments.find(
    (item) => item.status === "IN_PROGRESS" && item.attemptId,
  );

  const completedAssessment = normalizedAssessments.find(
    (item) => item.status === "COMPLETED" && item.attemptId,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Candidate Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Track your assessments, results and performance.
          </p>
        </div>

        <Link
          href="/dashboard/candidate/assessments"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          My Assessments
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Assessments"
          value={totalAssessments}
          description="All assigned assessments"
          icon={<FileText className="h-5 w-5" />}
          iconClassName="bg-blue-500/10 text-blue-500"
        />

        <StatCard
          title="In Progress"
          value={inProgressCount}
          description="Currently active"
          icon={<PlayCircle className="h-5 w-5" />}
          iconClassName="bg-orange-500/10 text-orange-500"
        />

        <StatCard
          title="Completed"
          value={completedCount}
          description="Completed attempts"
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconClassName="bg-green-500/10 text-green-500"
        />

        <StatCard
          title="Pending"
          value={pendingCount}
          description="Waiting to start"
          icon={<Clock className="h-5 w-5" />}
          iconClassName="bg-yellow-500/10 text-yellow-500"
        />

        <StatCard
          title="Cancelled"
          value={cancelledCount}
          description="Cancelled attempts"
          icon={<Ban className="h-5 w-5" />}
          iconClassName="bg-red-500/10 text-red-500"
        />

        <StatCard
          title="Expired"
          value={expiredCount}
          description="Expired assessments"
          icon={<XCircle className="h-5 w-5" />}
          iconClassName="bg-purple-500/10 text-purple-500"
        />
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AssessmentPieChart
          totalAssessments={totalAssessments}
          inProgressCount={inProgressCount}
          completedCount={completedCount}
          pendingCount={pendingCount}
          cancelledCount={cancelledCount}
          expiredCount={expiredCount}
        />

        {/* Performance */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Performance
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your overall assessment performance
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full border-8 border-primary/10">
              <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-muted/30">
                <span className="text-4xl font-bold text-foreground">
                  {averageScore !== null ? `${averageScore}%` : "N/A"}
                </span>

                <span className="mt-1 text-xs text-muted-foreground">
                  Average Score
                </span>

                <span className="mt-1 text-xs text-muted-foreground">
                  {scores.length} of {completedCount} scored
                </span>
              </div>
            </div>

            <div className="w-full max-w-xs space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/10 p-2 text-green-500">
                    <Trophy className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Passed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Successful assessments
                    </p>
                  </div>
                </div>

                <span className="text-xl font-bold text-foreground">
                  {passedCount}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
                    <XCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Failed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Needs improvement
                    </p>
                  </div>
                </div>

                <span className="text-xl font-bold text-foreground">
                  {failedCount}
                </span>
              </div>
            </div>
          </div>

          {averageScore === null && (
            <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center">
              <p className="text-sm font-medium text-foreground">
                Score data is not available yet
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {completedCount === 0
                  ? "Complete an assessment to see your performance."
                  : "The API must return a saved score or obtained marks and total marks."}
              </p>
            </div>
          )}

          {completedCount > evaluatedCount && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Results evaluated: {evaluatedCount} of {completedCount}
            </p>
          )}
        </section>
      </div>

      {/* Quick Actions */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-foreground">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Quickly access your important assessment actions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ActionCard
            href={
              inProgressAssessment?.attemptId
                ? `/dashboard/candidate/assessments/${inProgressAssessment.attemptId}`
                : "/dashboard/candidate/assessments"
            }
            icon={<PlayCircle className="h-6 w-6" />}
            iconClassName="bg-blue-500/10 text-blue-500"
            title="Continue Assessment"
            description="Continue your active assessment."
          />

          <ActionCard
            href={
              completedAssessment?.attemptId
                ? `/dashboard/candidate/assessments/${completedAssessment.attemptId}/result`
                : "/dashboard/candidate/assessments"
            }
            icon={<Award className="h-6 w-6" />}
            iconClassName="bg-green-500/10 text-green-500"
            title="View Results"
            description="Check your completed assessment results."
          />

          <ActionCard
            href="/dashboard/candidate/assessments"
            icon={<Target className="h-6 w-6" />}
            iconClassName="bg-purple-500/10 text-purple-500"
            title="Available Assessments"
            description="View your assigned assessments."
          />
        </div>
      </section>

      {/* Empty state */}
      {totalAssessments === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />

          <h3 className="mt-4 text-lg font-semibold text-foreground">
            No assessments yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Your assigned assessments will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
  iconClassName,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  iconClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-3 ${iconClassName}`}>{icon}</div>

        <span className="text-2xl font-bold text-foreground">{value}</span>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function ActionCard({
  href,
  icon,
  iconClassName,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  iconClassName: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border p-5 transition hover:bg-muted/50"
    >
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-3 ${iconClassName}`}>{icon}</div>

        <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1" />
      </div>

      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>

      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}