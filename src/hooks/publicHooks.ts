import { getPublicAssessmentById, getPublicAssessments } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetPublicAssessmentById = (
  assessmentId: string,
) => {
  return useQuery({
    queryKey: ["public-assessment", assessmentId],
    queryFn: () => getPublicAssessmentById(assessmentId),
    enabled: Boolean(assessmentId),
  });
};

 
export const useGetPublicAssessments = (
  page = 1,
  limit = 8,
  search = "",
) => {
  return useQuery({
    queryKey: ["public-assessments", page, limit, search],
    queryFn: () => getPublicAssessments(page, limit, search),
  });
};