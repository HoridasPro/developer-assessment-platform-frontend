"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Ban,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Clock,
  Mail,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

import {
  useGetAdminUsers,
  useUpdateUserRole,
  useSuspendAdminUser,
  useActivateAdminUser,
} from "@/hooks";
import { toast } from "@/components/ui/toast";

type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";

type AdminUser = {
  id: string;
  name?: string | null;
  email: string;
  role: UserRole;
  status?: string | null;
  profilePhoto?: string | null;
  emailVerified?: boolean;
  createdAt: string;
};

const getRoleStyle = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
    case "COMPANY":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    default:
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }
};

const getStatus = (user: AdminUser) => {
  if (user.status?.toUpperCase() === "SUSPENDED") {
    return "SUSPENDED";
  }

  if (user.status?.toUpperCase() === "ACTIVE") {
    return "ACTIVE";
  }

  return "ACTIVE";
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "SUSPENDED":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    default:
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }
};

const formatDate = (date: string) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function UserAvatar({ user }: { user: AdminUser }) {
  if (user.profilePhoto) {
    return (
      <Image
        src={user.profilePhoto}
        alt={user.name || "User"}
        width={44}
        height={44}
        className="h-11 w-11 rounded-full border border-border object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <CircleUserRound className="h-6 w-6" />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  );
}

function RoleSelect({
  user,
  onChange,
  disabled,
}: {
  user: AdminUser;
  onChange: (userId: string, role: UserRole) => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative inline-flex items-center">
      <select
        aria-label={`Change role for ${user.name || user.email}`}
        value={user.role}
        disabled={disabled}
        onChange={(event) => onChange(user.id, event.target.value as UserRole)}
        className={`appearance-none rounded-lg border border-border bg-background py-2 pl-3 pr-8 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 ${getRoleStyle(user.role)}`}
      >
        <option value="CANDIDATE">Candidate</option>
        <option value="COMPANY">Company</option>
        <option value="ADMIN">Admin</option>
      </select>

      <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5" />
    </div>
  );
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const { data, isLoading, isError, refetch } = useGetAdminUsers();

  const {
    mutate: updateRole,
    isPending: isUpdatingRole,
    variables: updatingRoleVariables,
  } = useUpdateUserRole();

  const {
    mutate: suspendUser,
    isPending: isSuspending,
    variables: suspendingUserId,
  } = useSuspendAdminUser();

  const {
    mutate: activateUser,
    isPending: isActivating,
    variables: activatingUserId,
  } = useActivateAdminUser();

  // Support common API response shapes.
  const response = data as
    | {
        data?: AdminUser[] | { users?: AdminUser[]; data?: AdminUser[] };
        users?: AdminUser[];
      }
    | AdminUser[]
    | undefined;

  let users: AdminUser[] = [];

  if (Array.isArray(response)) {
    users = response;
  } else if (response && Array.isArray(response.data)) {
    users = response.data;
  } else if (response?.data && !Array.isArray(response.data)) {
    users = response.data.users || response.data.data || [];
  } else if (response?.users) {
    users = response.users;
  }

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      (user.name || "").toLowerCase().includes(searchText) ||
      (user.email || "").toLowerCase().includes(searchText);

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const companyCount = users.filter((user) => user.role === "COMPANY").length;

  const candidateCount = users.filter(
    (user) => user.role === "CANDIDATE",
  ).length;

  const suspendedCount = users.filter(
    (user) => getStatus(user) === "SUSPENDED",
  ).length;

  const handleRoleChange = (userId: string, role: UserRole) => {
    updateRole({ userId, role } as never, {
      onSuccess: () => {
        toast.add({
          title: "User role updated successfully",
          description: "The user's role has been changed successfully.",
          type: "success",
        });
        void refetch();
      },
      onError: () => {
        toast.add({
          title: "Failed to update user role",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleSuspendUser = (user: AdminUser) => {
    if (getStatus(user) === "SUSPENDED") return;

    const confirmed = window.confirm(
      `Are you sure you want to suspend ${user.name || user.email}?`,
    );

    if (!confirmed) return;

    suspendUser(user.id, {
      onSuccess: () => {
        toast.add({
          title: "User suspended successfully",
          description:
            "The user can no longer access their account until reactivated.",
          type: "success",
        });
        void refetch();
      },
      onError: () => {
        toast.add({
          title: "Failed to suspend user",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleActivateUser = (user: AdminUser) => {
    if (getStatus(user) !== "SUSPENDED") return;

    const confirmed = window.confirm(
      `Are you sure you want to activate ${user.name || user.email}?`,
    );

    if (!confirmed) return;

    activateUser(user.id, {
      onSuccess: () => {
        toast.add({
          title: "User activated successfully",
          description: "The user can now access their account again.",
          type: "success",
        });
        void refetch();
      },
      onError: () => {
        toast.add({
          title: "Failed to activate user",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-background p-6 text-center">
        <XCircle className="h-12 w-12 text-destructive" />

        <h2 className="text-lg font-semibold text-foreground">
          Failed to load users
        </h2>

        <p className="text-sm text-muted-foreground">
          Please check your connection and try again.
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 p-4 text-foreground md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Admin Dashboard / Users
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            All Users
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage user accounts, roles, and account status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <Users className="h-5 w-5 text-primary" />
          </div>

          <p className="mt-3 text-3xl font-bold">{users.length}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            All registered accounts
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Companies</p>
            <Building2 className="h-5 w-5 text-blue-500" />
          </div>

          <p className="mt-3 text-3xl font-bold">{companyCount}</p>

          <p className="mt-1 text-xs text-muted-foreground">Company accounts</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Candidates</p>
            <CircleUserRound className="h-5 w-5 text-emerald-500" />
          </div>

          <p className="mt-3 text-3xl font-bold">{candidateCount}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Candidate accounts
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Suspended</p>
            <Ban className="h-5 w-5 text-red-500" />
          </div>

          <p className="mt-3 text-3xl font-bold">{suspendedCount}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Suspended accounts
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-border bg-background py-3 pr-4 pl-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        >
          <option value="ALL">All roles</option>
          <option value="ADMIN">Admin</option>
          <option value="COMPANY">Company</option>
          <option value="CANDIDATE">Candidate</option>
        </select>
      </div>

      {/* Users table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-col justify-between gap-2 border-b border-border p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold">User Directory</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredUsers.length} users found
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Role and account management
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Email Verification</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined Date</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => {
                const status = getStatus(user);
                const isSuspended = status === "SUSPENDED";
                const isThisUserSuspending =
                  isSuspending && suspendingUserId === user.id;
                const isThisUserActivating =
                  isActivating && activatingUserId === user.id;

                return (
                  <tr key={user.id} className="transition hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <div className="flex min-w-[220px] items-center gap-3">
                        <UserAvatar user={user} />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {user.name || "Unnamed User"}
                          </p>

                          <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground">
                            <Mail className="h-3 w-3 shrink-0" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <RoleSelect
                        user={user}
                        onChange={handleRoleChange}
                        disabled={
                          isUpdatingRole &&
                          (updatingRoleVariables as { userId?: string })
                            ?.userId === user.id
                        }
                      />
                    </td>

                    <td className="px-5 py-4">
                      {user.emailVerified ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                          <Clock className="h-3.5 w-3.5" />
                          Unverified
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(status)}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      {isSuspended ? (
                        <button
                          type="button"
                          onClick={() => handleActivateUser(user)}
                          disabled={
                            isThisUserActivating || isThisUserSuspending
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold whitespace-nowrap text-emerald-700 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400"
                        >
                          {isThisUserActivating ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}

                          {isThisUserActivating ? "Activating..." : "Activate"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSuspendUser(user)}
                          disabled={
                            isThisUserSuspending || isThisUserActivating
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold whitespace-nowrap text-amber-700 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-amber-400"
                        >
                          {isThisUserSuspending ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )}

                          {isThisUserSuspending ? "Suspending..." : "Suspend"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-16 text-center text-sm text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 p-4 md:hidden">
          {filteredUsers.map((user) => {
            const status = getStatus(user);
            const isSuspended = status === "SUSPENDED";
            const isThisUserSuspending =
              isSuspending && suspendingUserId === user.id;
            const isThisUserActivating =
              isActivating && activatingUserId === user.id;

            return (
              <div
                key={user.id}
                className="space-y-4 rounded-xl border border-border p-4"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {user.name || "Unnamed User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleStyle(user.role)}`}
                  >
                    {user.role}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(status)}`}
                  >
                    {status}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.emailVerified
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </span>
                </div>

                <div className="flex flex-col gap-2 border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground">
                    Joined: {formatDate(user.createdAt)}
                  </p>

                  <RoleSelect
                    user={user}
                    onChange={handleRoleChange}
                    disabled={
                      isUpdatingRole &&
                      (updatingRoleVariables as { userId?: string })?.userId ===
                        user.id
                    }
                  />

                  {isSuspended ? (
                    <button
                      type="button"
                      onClick={() => handleActivateUser(user)}
                      disabled={isThisUserActivating || isThisUserSuspending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400"
                    >
                      {isThisUserActivating ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}

                      {isThisUserActivating ? "Activating..." : "Activate User"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSuspendUser(user)}
                      disabled={isThisUserSuspending || isThisUserActivating}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-amber-400"
                    >
                      {isThisUserSuspending ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Ban className="h-4 w-4" />
                      )}

                      {isThisUserSuspending ? "Suspending..." : "Suspend User"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
