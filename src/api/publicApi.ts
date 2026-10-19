import apiClient from "@/lib/apiClient";

export const getPublicAssessmentById = async (
  assessmentId: string,
) => {
  const response = await apiClient(
    `/public/assessments/${assessmentId}`,
  );

  return response.data;
};


 

export interface PublicAssessment {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  passingScore: number;
  status: "PUBLISHED";
}

export interface PublicAssessmentsResponse {
  success: boolean;
  message: string;
  data: {
    assessments: PublicAssessment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export const getPublicAssessments = async (
  page = 1,
  limit = 8,
  search = "",
): Promise<PublicAssessmentsResponse> => {
  const response = await apiClient(
    "/public/assessments",
    {
      params: { page, limit, search },
    },
  );

  return response.data;
};