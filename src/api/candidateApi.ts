import apiClient from "@/lib/apiClient";
import { SubmitAnswerPayload } from "@/types/submitAnswerPayload";

export const getInvitationAssessment = () => {
  return apiClient("invitations/my-assigned", {
    method: "GET",
  });
};

export const acceptInvitation = (invitationId: string) => {
  return apiClient(`/invitations/status/${invitationId}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: "ACCEPTED",
    }),
  });
};

export const startAssessment = (invitationId: string) => {
  return apiClient(`/invitations/start/${invitationId}`, {
    method: "POST",
  });
};

export const getAttemptQuestions = (attemptId: string) => {
  return apiClient(`/attempts/questions/${attemptId}`, {
    method: "GET",
  });
};

export const submitAnswer = (
  attemptId: string,
  payload: SubmitAnswerPayload,
) => {
  return apiClient(`/attempts/questions/answer/${attemptId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const submitAssessment = (attemptId: string) => {
  return apiClient(`/attempts/submit/${attemptId}`, {
    method: "POST",
  });
};

export const getAttemptResult = (attemptId: string) => {
  return apiClient(`/attempts/result/${attemptId}`, {
    method: "GET",
  });
};

export const cancelAttempt = (attemptId: string) => {
  return apiClient(`/attempts/cancel/${attemptId}`, {
    method: "PATCH",
  });
};

export const getMyAllResults = () => {
  return apiClient("/attempts/my-results", {
    method: "GET",
  });
};

export const updateCandidateProfile = (payload: {
  name: string;
  profilePhoto: string;
  candidateProfile: {
    bio: string;
    phone: string;
    location: string;
    skills: string[];
    experience: number;
    education: string;
    resumeUrl: string;
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
  };
}) => {
  return apiClient("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
