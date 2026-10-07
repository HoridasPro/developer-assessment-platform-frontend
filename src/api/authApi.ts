import apiClient from "@/lib/apiClient";
import { AddQuestionsPayload } from "@/types/addQuestionPayload";
import { Assessment } from "@/types/assessmentPayload";
import { CompanyAttemptsResponse } from "@/types/companyAttemptRespons";
import { TCreateAssessmentPayload } from "@/types/createAssessmentPayload";
import { EvaluateAnswersPayload } from "@/types/evaluateAnsPayload";
import { AttemptDetailsResponse } from "@/types/getAttemptDetails";
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
  return apiClient("/users/me", {
    method: "GET",
  });
};

export const createAssessmentPayload = (payload: TCreateAssessmentPayload) => {
  return apiClient("/assessments", {
    method: "POST",
    body: payload,
  });
};

export const getAssessments = async (): Promise<Assessment[]> => {
  const response = await apiClient("/assessments", {
    method: "GET",
  });
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

export const getQuestions = () => {
  return apiClient("/questions", {
    method: "GET",
  });
};

export const getAssessmentQuestions = (
  assessmentId: string,
): Promise<Question[]> => {
  return apiClient(`/questions/${assessmentId}`, {
    method: "GET",
  });
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
  candidateUserId: string,
) => {
  return apiClient(`/asign/${assessmentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ candidateUserId }),
  });
};

export const getCandidates = () => {
  return apiClient("/users/candidates", {
    method: "GET",
  });
};

export const getAttemptDetails = (attemptId: string) => {
  return apiClient<AttemptDetailsResponse>(`/attempts/${attemptId}`, {
    method: "GET",
  });
};

export const evaluateAnswers = (
  attemptId: string,
  payload: EvaluateAnswersPayload,
) => {
  return apiClient(`/attempts/evaluate-answers/${attemptId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

export const getCompanyAttempts = () => {
  return apiClient<CompanyAttemptsResponse>("/attempts", {
    method: "GET",
  });
};

export const submitEvaluate = (
  attemptId: string,
  payload: {
    answers: {
      questionId: string;
      marks: number;
      type: "WRITTEN" | "CODING";
    }[];
  },
) => {
  return apiClient(`/attempts/evaluate/${attemptId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
