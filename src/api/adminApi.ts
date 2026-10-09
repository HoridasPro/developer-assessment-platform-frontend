import apiClient from "@/lib/apiClient";

export const getAdminUsers = () => {
  return apiClient("/admin/users", {
    method: "GET",
  });
};

 
export type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";

export const updateUserRole = (
  userId: string,
  role: UserRole,
) => {
  return apiClient(`/admin/users/role/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
};
