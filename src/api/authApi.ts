import apiClient from "@/lib/apiClient";
import { AddQuestionsPayload } from "@/types/addQuestionPayload";
import { Assessment } from "@/types/assessmentPayload";
import { TCreateAssessmentPayload } from "@/types/createAssessmentPayload";
import { loginPayload } from "@/types/loginPayload";
import { CreateQuestionPayload, Question } from "@/types/question";
import { registerPayload } from "@/types/registerPayload";
import { verifyEmailOtpPayload } from "@/types/verifyEmailOtpPayload";

export const userLogin = (payload: loginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const verifyLoginOtp = (payload: verifyEmailOtpPayload) => {
  return apiClient("/auth/verify-login-otp", {
    method: "POST",
    body: payload,
  });
};

export const userLogout = () => {
  return apiClient("/auth/logout", { method: "POST" });
};

export const userGoogleAuthLogin = (payload: { idToken: string }) => {
  return apiClient("auth/google-login", { method: "POST", body: payload });
};

export const userRegister = (payload: registerPayload) => {
  return apiClient("/auth/register", { method: "POST", body: payload });
};

export const verifyEmailOtp = (payload: verifyEmailOtpPayload) => {
  return apiClient("/auth/verify-email-otp", {
    method: "POST",
    body: payload,
  });
};

export const getMe = () => {
  return apiClient("/users/me");
};

export const createAssessmentPayload = (payload: TCreateAssessmentPayload) => {
  return apiClient("/assessments", {
    method: "POST",
    body: payload,
  });
};

export const getAssessments = async (): Promise<Assessment[]> => {
  const response = await apiClient("/assessments");
  // API Response-এর structure অনুযায়ী res.data বা res রিটার্ন করুন
  return response?.data || response || [];
};

export const addQuestionsToAssessment = ({
  assessmentId,
  options,
}: AddQuestionsPayload) => {
  return apiClient(`/questions/${assessmentId}`, {
    method: "POST",
    body: {
      options,
    },
  });
};

export const createQuestion = (payload: CreateQuestionPayload) => {
  return apiClient("/questions", {
    method: "POST",
    body: payload,
  });
};

export const getQuestions = async () => {
  return apiClient("/questions");
};

export const getAssessmentQuestions = (
  assessmentId: string,
): Promise<Question[]> => {
  return apiClient(`/questions/${assessmentId}`);
};

export const publishAssessment = (assessmentId: string) => {
  return apiClient(`/publish/${assessmentId}`, {
    method: "PATCH",
  });
};

export const getAssessmentById = (assessmentId: string) => {
  return apiClient(`/assessments/${assessmentId}`, {
    method: "GET",
  });
};

export const initiatePayment = (assessmentId: string) => {
  return apiClient("/payments/initiate", {
    method: "POST",
    body: JSON.stringify({
      assessmentId,
    }),
  });
};
 
export const confirmPayment = (sessionId: string) => {
  return apiClient("/payments/webhook", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
    }),
  });
};


export const getPaymentByAssessment = (assessmentId: string) => {
  return apiClient(`/payments/${assessmentId}`, {
    method: "GET",
  });
};

 
export const assignCandidate = (
  assessmentId: string,
  candidateId: string,
) => {
  return apiClient(
    `/${assessmentId}/assign`,
    {
      method: "POST",
      body: JSON.stringify({
        candidateId,
      }),
    },
  );
};
