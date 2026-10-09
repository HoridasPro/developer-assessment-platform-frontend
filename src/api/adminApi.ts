import apiClient from "@/lib/apiClient";

export const getAdminUsers = () => {
  return apiClient("/admin/users", {
    method: "GET",
  });
};
