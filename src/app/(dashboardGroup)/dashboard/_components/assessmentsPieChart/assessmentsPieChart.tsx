"use client";

type AssessmentPieChartProps = {
  totalAssessments: number;
  inProgressCount: number;
  completedCount: number;
  pendingCount: number;
  cancelledCount: number;
  expiredCount: number;
};

export default function AssessmentPieChart({
  totalAssessments,
  inProgressCount,
  completedCount,
  pendingCount,
  cancelledCount,
  expiredCount,
}: AssessmentPieChartProps) {

  const total =
    inProgressCount +
    completedCount +
    pendingCount +
    cancelledCount +
    expiredCount;

  const safeTotal = total > 0 ? total : 1;

  const inProgressDegree =
    (inProgressCount / safeTotal) * 360;

  const completedDegree =
    (completedCount / safeTotal) * 360;

  const pendingDegree =
    (pendingCount / safeTotal) * 360;

  const cancelledDegree =
    (cancelledCount / safeTotal) * 360;

  const inProgressEnd =
    inProgressDegree;

  const completedEnd =
    inProgressEnd + completedDegree;

  const pendingEnd =
    completedEnd + pendingDegree;

  const cancelledEnd =
    pendingEnd + cancelledDegree;

  const background =
    total === 0
      ? "conic-gradient(#e5e7eb 0deg 360deg)"
      : `conic-gradient(
          #3b82f6 0deg ${inProgressEnd}deg,
          #22c55e ${inProgressEnd}deg ${completedEnd}deg,
          #f59e0b ${completedEnd}deg ${pendingEnd}deg,
          #ef4444 ${pendingEnd}deg ${cancelledEnd}deg,
          #8b5cf6 ${cancelledEnd}deg 360deg
        )`;

  const items = [
    {
      label: "In Progress",
      value: inProgressCount,
      color: "bg-blue-500",
    },
    {
      label: "Completed",
      value: completedCount,
      color: "bg-green-500",
    },
    {
      label: "Pending",
      value: pendingCount,
      color: "bg-yellow-500",
    },
    {
      label: "Cancelled",
      value: cancelledCount,
      color: "bg-red-500",
    },
    {
      label: "Expired",
      value: expiredCount,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Assessment Overview
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Your assessment activity at a glance
        </p>
      </div>

      {/* Chart + Legend */}

      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Pie Chart */}

        <div className="flex justify-center">
          <div className="relative">
            <div
              className="h-52 w-52 rounded-full transition-all duration-500 sm:h-60 sm:w-60"
              style={{
                background,
              }}
            />

            {/* Center */}

            <div className="absolute inset-0 m-auto flex h-32 w-32 flex-col items-center justify-center rounded-full bg-card shadow-inner sm:h-36 sm:w-36">
              <span className="text-3xl font-bold text-foreground">
                {totalAssessments}
              </span>

              <span className="text-xs text-muted-foreground">
                Assessments
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}

        <div className="space-y-4">
          {items.map((item) => {
            const percentage =
              total > 0
                ? Math.round(
                    (item.value / total) * 100,
                  )
                : 0;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full ${item.color}`}
                  />

                  <span className="truncate text-sm text-muted-foreground">
                    {item.label}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {item.value}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}