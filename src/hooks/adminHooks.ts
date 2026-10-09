import { getAdminUsers, updateUserRole, UserRole } from "@/api";
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
