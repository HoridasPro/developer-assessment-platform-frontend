import apiClient from "@/lib/apiClient";
import { TCreateAssessmentPayload } from "@/types/createAssessmentPayload";
import { loginPayload } from "@/types/loginPayload";
import { CreateQuestionPayload } from "@/types/question";
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

// export const getQuestions = () => {
//   return apiClient("/questions");
// };

export const createQuestion = (
  payload: CreateQuestionPayload,
) => {
  return apiClient("/questions", {
    method: "POST",
    body: payload,
  });
};

// export const deleteQuestion = (questionId: string) => {
//   return apiClient(`/questions/${questionId}`, {
//     method: "DELETE",
//   });
// };