import apiClient from "@/lib/apiClient";

export const getAdminUsers = () => {
  return apiClient("/admin/users", {
    method: "GET",
  });
};

export type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";

export const updateUserRole = (userId: string, role: UserRole) => {
  return apiClient(`/admin/users/role/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
};

export const getAdminDashboardStats = () => {
  return apiClient("/admin/dashboard-stats", {
    method: "GET",
  });
};

export const getAdminAuditLogs = () => {
  return apiClient("/admin/audit-logs", {
    method: "GET",
  });
};

export const suspendAdminUser = (userId: string) => {
  return apiClient(`/admin/users/suspend/${userId}`, {
    method: "PATCH",
  });
};

export const activateAdminUser = (userId: string) => {
  return apiClient(`/admin/users/activate/${userId}`, {
    method: "PATCH",
  });
};
