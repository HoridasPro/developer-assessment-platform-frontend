import { getAdminUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
  });
};
