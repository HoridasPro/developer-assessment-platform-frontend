"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  PlayCircle,
  Target,
  Trophy,
  XCircle,
  Ban,
} from "lucide-react";

import { useGetInvitationAssessments } from "@/hooks";
import AssessmentPieChart from "../_components/assessmentsPieChart/assessmentsPieChart";

type Assessment = {
  id?: string;
  assessmentId?: string;
  attemptId?: string;

  title?: string;
  assessmentTitle?: string;

  status?: string;
  attemptStatus?: string;

  duration?: number;
  passingScore?: number;

  score?: number;
  obtainedMarks?: number;
  totalMarks?: number;
  percentage?: number;
  passed?: boolean;

  startAt?: string;
  endAt?: string;
  submittedAt?: string;

  assessment?: {
    id?: string;
    title?: string;
    duration?: number;
    passingScore?: number;
    totalMarks?: number;
  };
};

export default function CandidateDashboard() {
  const { data, isLoading, isError } = useGetInvitationAssessments();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Loading dashboard...
        </div>
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

  /*
   * API:
   *
   * {
   *   success: true,
   *   message: "Invitations fetched successfully",
   *   data: [
   *     {
   *       status: "ACCEPTED",
   *       attemptStatus: "COMPLETED",
   *       attemptId: "..."
   *     }
   *   ]
   * }
   */

  const rawData = data?.data ?? [];

  const assessments: Assessment[] = Array.isArray(rawData) ? rawData : [];

  /*
   * attemptStatus has priority over invitation status.
   *
   * Example:
   *
   * status        = ACCEPTED
   * attemptStatus = COMPLETED
   *
   * Final status = COMPLETED
   */

  const normalizedAssessments = assessments.map((item) => {
    const attemptStatus = String(item.attemptStatus ?? "").toUpperCase();

    const invitationStatus = String(item.status ?? "").toUpperCase();

    let normalizedStatus = attemptStatus;

    if (!normalizedStatus) {
      normalizedStatus = invitationStatus;
    }

    if (attemptStatus === "COMPLETED") {
      normalizedStatus = "COMPLETED";
    } else if (attemptStatus === "IN_PROGRESS") {
      normalizedStatus = "IN_PROGRESS";
    } else if (attemptStatus === "CANCELLED") {
      normalizedStatus = "CANCELLED";
    } else if (attemptStatus === "EXPIRED") {
      normalizedStatus = "EXPIRED";
    } else if (
      !attemptStatus &&
      (invitationStatus === "ACCEPTED" ||
        invitationStatus === "PENDING" ||
        invitationStatus === "NOT_STARTED")
    ) {
      normalizedStatus = "PENDING";
    }

    return {
      ...item,
      status: normalizedStatus,
    };
  });

  // =========================================
  // Statistics
  // =========================================

  const totalAssessments = normalizedAssessments.length;

  const inProgressCount = normalizedAssessments.filter(
    (item) => item.status === "IN_PROGRESS",
  ).length;

  const completedCount = normalizedAssessments.filter(
    (item) => item.status === "COMPLETED",
  ).length;

  const pendingCount = normalizedAssessments.filter(
    (item) => item.status === "PENDING",
  ).length;

  const cancelledCount = normalizedAssessments.filter(
    (item) => item.status === "CANCELLED",
  ).length;

  const expiredCount = normalizedAssessments.filter(
    (item) => item.status === "EXPIRED",
  ).length;

  // =========================================
  // Performance
  // =========================================

  const completedAssessments = normalizedAssessments.filter(
    (item) => item.status === "COMPLETED",
  );

  /*
   * Score data may not exist in the invitation API.
   *
   * If percentage exists -> use percentage.
   *
   * Else if obtainedMarks + totalMarks exist
   * -> calculate percentage.
   *
   * Else if score + totalMarks exist
   * -> calculate percentage.
   *
   * Otherwise score is unavailable.
   */

  const scores = completedAssessments
    .map((item) => {
      // Direct percentage
      if (
        typeof item.percentage === "number" &&
        Number.isFinite(item.percentage)
      ) {
        return item.percentage;
      }

      // obtainedMarks / totalMarks
      const obtainedMarks =
        typeof item.obtainedMarks === "number" ? item.obtainedMarks : null;

      const totalMarks =
        typeof item.totalMarks === "number"
          ? item.totalMarks
          : typeof item.assessment?.totalMarks === "number"
            ? item.assessment.totalMarks
            : null;

      if (obtainedMarks !== null && totalMarks !== null && totalMarks > 0) {
        return (obtainedMarks / totalMarks) * 100;
      }

      // score / totalMarks
      const score = typeof item.score === "number" ? item.score : null;

      if (score !== null && totalMarks !== null && totalMarks > 0) {
        return (score / totalMarks) * 100;
      }

      return null;
    })
    .filter(
      (score): score is number => score !== null && Number.isFinite(score),
    );

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length,
        )
      : null;

  /*
   * Passed / Failed
   *
   * Only count when passed information actually exists.
   */

  const passedCount = completedAssessments.filter(
    (item) => item.passed === true,
  ).length;

  const failedCount = completedAssessments.filter(
    (item) => item.passed === false,
  ).length;

  // =========================================
  // Quick Actions
  // =========================================

  const inProgressAssessment = normalizedAssessments.find(
    (item) => item.status === "IN_PROGRESS",
  );

  const completedAssessment = normalizedAssessments.find(
    (item) => item.status === "COMPLETED" && item.attemptId,
  );

  return (
    <div className="space-y-6">
      {/* =========================================
          Header
      ========================================= */}

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

      {/* =========================================
          Statistics
          3 + 3
      ========================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}

        <StatCard
          title="Total Assessments"
          value={totalAssessments}
          description="All assessments"
          icon={<FileText className="h-5 w-5" />}
          iconClassName="bg-blue-500/10 text-blue-500"
        />

        {/* In Progress */}

        <StatCard
          title="In Progress"
          value={inProgressCount}
          description="Currently active"
          icon={<PlayCircle className="h-5 w-5" />}
          iconClassName="bg-orange-500/10 text-orange-500"
        />

        {/* Completed */}

        <StatCard
          title="Completed"
          value={completedCount}
          description="Successfully completed"
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconClassName="bg-green-500/10 text-green-500"
        />

        {/* Pending */}

        <StatCard
          title="Pending"
          value={pendingCount}
          description="Waiting to start"
          icon={<Clock className="h-5 w-5" />}
          iconClassName="bg-yellow-500/10 text-yellow-500"
        />

        {/* Cancelled */}

        <StatCard
          title="Cancelled"
          value={cancelledCount}
          description="Cancelled attempts"
          icon={<Ban className="h-5 w-5" />}
          iconClassName="bg-red-500/10 text-red-500"
        />

        {/* Expired */}

        <StatCard
          title="Expired"
          value={expiredCount}
          description="Expired assessments"
          icon={<XCircle className="h-5 w-5" />}
          iconClassName="bg-purple-500/10 text-purple-500"
        />
      </div>

      {/* =========================================
          Analytics
      ========================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Pie Chart */}

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
            {/* Average Score */}

            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full border-8 border-primary/10">
              <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-muted/30">
                <span className="text-4xl font-bold text-foreground">
                  {averageScore !== null ? `${averageScore}%` : "N/A"}
                </span>

                <span className="mt-1 text-xs text-muted-foreground">
                  Average Score
                </span>
              </div>
            </div>

            {/* Passed / Failed */}

            <div className="w-full max-w-xs space-y-4">
              {/* Passed */}

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

              {/* Failed */}

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

          {/* Score information */}

          {averageScore === null && (
            <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center">
              <p className="text-sm font-medium text-foreground">
                Score data is not available yet
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Your completed assessment score will appear here after result
                data is loaded.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* =========================================
          Quick Actions
      ========================================= */}

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
          {/* Continue */}

          <Link
            href={
              inProgressAssessment?.attemptId
                ? `/dashboard/candidate/assessments/${inProgressAssessment.attemptId}`
                : "/dashboard/candidate/assessments"
            }
            className="group rounded-2xl border border-border p-5 transition hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                <PlayCircle className="h-6 w-6" />
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1" />
            </div>

            <h3 className="mt-4 font-semibold text-foreground">
              Continue Assessment
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Continue your active assessment.
            </p>
          </Link>

          {/* Results */}

          <Link
            href={
              completedAssessment?.attemptId
                ? `/dashboard/candidate/assessments/${completedAssessment.attemptId}/result`
                : "/dashboard/candidate/assessments"
            }
            className="group rounded-2xl border border-border p-5 transition hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
                <Award className="h-6 w-6" />
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1" />
            </div>

            <h3 className="mt-4 font-semibold text-foreground">View Results</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Check your completed assessment results.
            </p>
          </Link>

          {/* Available */}

          <Link
            href="/dashboard/candidate/assessments"
            className="group rounded-2xl border border-border p-5 transition hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
                <Target className="h-6 w-6" />
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1" />
            </div>

            <h3 className="mt-4 font-semibold text-foreground">
              Available Assessments
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              View all your assigned assessments.
            </p>
          </Link>
        </div>
      </section>

      {/* =========================================
          Empty State
      ========================================= */}

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

/* =========================================
   Stat Card
========================================= */

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
