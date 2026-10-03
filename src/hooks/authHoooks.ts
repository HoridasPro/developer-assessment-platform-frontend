import {
  addQuestionsToAssessment,
  createAssessmentPayload,
  createQuestion,
  getAssessments,
  getMe,
  getQuestions,
  userGoogleAuthLogin,
  userLogin,
  userLogout,
  userRegister,
  verifyEmailOtp,
  verifyLoginOtp,
} from "@/api";
import { Assessment } from "@/types/assessmentPayload";

import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useVerifyLoginOtp = () => {
  return useMutation({
    mutationFn: verifyLoginOtp,
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

export const useGoogleAuthLogin = () => {
  return useMutation({
    mutationFn: userGoogleAuthLogin,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: verifyEmailOtp,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
};

export const useCreateAssessment = () => {
  return useMutation({
    mutationFn: createAssessmentPayload,
  });
};

export const useGetQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    // queryFn: async () => {
    // const data = await getQuestions();
    // TanStack Query তে undefined দেয়া নিষিদ্ধ, তাই null/array সেফগার্ড দেওয়া আবশ্যক
    // return data ?? [];
  });
};

export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: createQuestion,
  });
};

export const useAddQuestionsToAssessment = () => {
  return useMutation({
    mutationFn: addQuestionsToAssessment,
  });
};

// export const useGetAssessments = () => {
//   return useQuery({
//     queryKey: ["assessments"],
//     queryFn: getAssessments,
//   });
// };

export const useGetAssessments = () => {
  return useQuery<Assessment[]>({
    queryKey: ["assessments"],
    queryFn: getAssessments,
    select: (data: any) => (Array.isArray(data) ? data : data?.data || []),
  });
};


 
// export const useGetAssessmentQuestions = (assessmentId: string) => {
//   return useQuery({
//     queryKey: ["assessment-questions", assessmentId],
//     queryFn: () => getAssessmentQuestions(assessmentId),
//     enabled: !!assessmentId,
//   });
// };
