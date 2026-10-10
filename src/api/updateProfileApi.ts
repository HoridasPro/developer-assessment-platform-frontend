import apiClient from "@/lib/apiClient";

export const updateMyProfile = (formData: FormData) => {
  return apiClient("/users/me", {
    method: "PATCH",
    body: formData,
  });
};
