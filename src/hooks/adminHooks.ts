import {
  activateAdminUser,
  getAdminAuditLogs,
  getAdminDashboardStats,
  getAdminUsers,
  suspendAdminUser,
  updateUserRole,
  UserRole,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
  });
};

type UpdateUserRoleVariables = {
  userId: string;
  role: UserRole;
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: UpdateUserRoleVariables) =>
      updateUserRole(userId, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};

export const useGetAdminDashboardStats = () => {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: getAdminDashboardStats,
  });
};

export const useGetAdminAuditLogs = () => {
  return useQuery({
    queryKey: ["admin-audit-logs"],
    queryFn: getAdminAuditLogs,
  });
};

export const useSuspendAdminUser = () => {
  return useMutation({
    mutationKey: ["suspend-admin-user"],
    mutationFn: (userId: string) => suspendAdminUser(userId),
  });
};

export const useActivateAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => activateAdminUser(userId),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};
