import { updateMyProfile } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCandidateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateMyProfile(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-profile"],
      });
    },
  });
};

export const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateMyProfile(formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["my-profile"],
      });
    },
  });
};
