import { getInvitationAssessment } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetInvitationAssessments = () => {
  return useQuery({
    queryKey: ["candidates-assessemnts"],
    queryFn: getInvitationAssessment,
  });
};
