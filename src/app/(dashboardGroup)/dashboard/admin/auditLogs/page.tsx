"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Calendar,
  Clock,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useGetAdminAuditLogs } from "@/hooks";

type AuditLog = {
  id?: string;
  action?: string;
  event?: string;
  entity?: string;
  entityType?: string;
  resource?: string;
  description?: string;
  message?: string;
  details?: unknown;
  ipAddress?: string;
  createdAt?: string;
  timestamp?: string;
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
  admin?: {
    name?: string;
    email?: string;
    role?: string;
  };
  performedBy?: {
    name?: string;
    email?: string;
    role?: string;
  };
  [key: string]: unknown;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

function getAuditLogs(response: unknown): AuditLog[] {
  if (Array.isArray(response)) {
    return response as AuditLog[];
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const result = response as ApiResponse;
  const data = result.data;

  if (Array.isArray(data)) {
    return data as AuditLog[];
  }

  if (data && typeof data === "object") {
    const nested = data as Record<string, unknown>;

    if (Array.isArray(nested.auditLogs)) {
      return nested.auditLogs as AuditLog[];
    }

    if (Array.isArray(nested.logs)) {
      return nested.logs as AuditLog[];
    }

    if (Array.isArray(nested.items)) {
      return nested.items as AuditLog[];
    }

    if (Array.isArray(nested.results)) {
      return nested.results as AuditLog[];
    }
  }

  return [];
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getActor(log: AuditLog) {
  return log.user ?? log.admin ?? log.performedBy;
}

function getAction(log: AuditLog) {
  return String(log.action ?? log.event ?? "UNKNOWN").replaceAll("_", " ");
}

function getTarget(log: AuditLog) {
  return log.entityType ?? log.entity ?? log.resource ?? "—";
}

function getDescription(log: AuditLog) {
  const description =
    log.description ??
    log.message ??
    (typeof log.details === "string" ? log.details : undefined);

  return typeof description === "string" ? description : "—";
}

function getActionStyle(action: string) {
  const value = action.toLowerCase();

  if (
    value.includes("delete") ||
    value.includes("fail") ||
    value.includes("reject")
  ) {
    return "bg-red-500/10 text-red-600 dark:text-red-400";
  }

  if (
    value.includes("create") ||
    value.includes("add") ||
    value.includes("register")
  ) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }

  if (
    value.includes("update") ||
    value.includes("edit") ||
    value.includes("change")
  ) {
    return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
  }

  if (
    value.includes("login") ||
    value.includes("logout") ||
    value.includes("auth")
  ) {
    return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
  }

  return "bg-muted text-muted-foreground";
}

export default function AdminAuditLogsPage() {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetAdminAuditLogs();

  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");

  const logs = useMemo(() => getAuditLogs(data), [data]);

  const actions = useMemo(() => {
    return [...new Set(logs.map((log) => getAction(log)))].sort();
  }, [logs]);

  const filteredLogs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return logs.filter((log) => {
      const actor = getActor(log);
      const action = getAction(log);
      const target = getTarget(log);
      const description = getDescription(log);

      const matchesSearch = [
        actor?.name,
        actor?.email,
        actor?.role,
        action,
        target,
        description,
        log.ipAddress,
        log.id,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search),
      );

      const matchesAction = actionFilter === "ALL" || action === actionFilter;

      return matchesSearch && matchesAction;
    });
  }, [logs, searchTerm, actionFilter]);

  return (
    <main className="min-h-full space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Audit Logs
            </h1>
          </div>

          <p className="text-sm text-muted-foreground sm:text-base">
            Monitor and review activities across the DevAssessment platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh Logs
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Activities</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                {logs.length}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Activity className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Filtered Activities
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                {filteredLogs.length}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search user, email, action, target..."
              className="w-full rounded-xl border border-border bg-background py-3 pr-4 pl-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={actionFilter}
            onChange={(event) => setActionFilter(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary sm:w-56"
          >
            <option value="ALL">All Actions</option>

            {actions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs table */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-5">
          <h2 className="text-lg font-semibold text-foreground">
            Activity History
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            A record of activities returned by the audit logs API.
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
            <RefreshCw className="h-7 w-7 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Loading audit logs...
            </p>
          </div>
        ) : isError ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="rounded-full bg-red-500/10 p-3 text-red-500">
              <Activity className="h-6 w-6" />
            </div>

            <h3 className="font-semibold text-foreground">
              Failed to load audit logs
            </h3>

            <p className="max-w-md text-sm text-muted-foreground">
              Check your admin login, API permissions, and backend response.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Try Again
            </button>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="rounded-full bg-muted p-4 text-muted-foreground">
              <Clock className="h-7 w-7" />
            </div>

            <h3 className="font-semibold text-foreground">
              No audit logs found
            </h3>

            <p className="text-sm text-muted-foreground">
              {logs.length === 0
                ? "There are no audit logs to display yet."
                : "Try changing your search or action filter."}
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr className="text-muted-foreground">
                  <th className="px-5 py-4 font-medium">User</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                  <th className="px-5 py-4 font-medium">Target</th>
                  <th className="px-5 py-4 font-medium">Description</th>
                  <th className="px-5 py-4 font-medium">IP Address</th>
                  <th className="px-5 py-4 font-medium">Date & Time</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredLogs.map((log, index) => {
                  const actor = getActor(log);
                  const action = getAction(log);
                  const key = String(log.id ?? `${action}-${index}`);

                  return (
                    <tr key={key} className="transition hover:bg-muted/30">
                      <td className="px-5 py-4">
                        <div className="font-medium text-foreground">
                          {actor?.name ?? "Unknown user"}
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground">
                          {actor?.email ?? "No email"}
                        </div>

                        {actor?.role && (
                          <span className="mt-2 inline-flex rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {actor.role}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold ${getActionStyle(action)}`}
                        >
                          {action}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-foreground">
                        {getTarget(log)}
                      </td>

                      <td className="max-w-xs px-5 py-4 text-muted-foreground">
                        <p className="line-clamp-2">{getDescription(log)}</p>
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                        {typeof log.ipAddress === "string"
                          ? log.ipAddress
                          : "—"}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                        {formatDate(
                          typeof log.createdAt === "string"
                            ? log.createdAt
                            : typeof log.timestamp === "string"
                              ? log.timestamp
                              : undefined,
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && filteredLogs.length > 0 && (
          <div className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
            Showing {filteredLogs.length} of {logs.length} activities
          </div>
        )}
      </section>
    </main>
  );
}
