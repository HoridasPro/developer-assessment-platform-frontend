import {
  acceptInvitation,
  cancelAttempt,
  getAttemptQuestions,
  getAttemptResult,
  getInvitationAssessment,
  getMyAllResults,
  startAssessment,
  submitAnswer,
  submitAssessment,
  updateCandidateProfile,
} from "@/api";
import { SubmitAnswerPayload } from "@/types/submitAnswerPayload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetInvitationAssessments = () => {
  return useQuery({
    queryKey: ["candidates-assessemnts"],
    queryFn: getInvitationAssessment,
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => acceptInvitation(invitationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidates-assessemnts"],
      });
    },
  });
};

export const useStartAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => startAssessment(invitationId),

    onSuccess: (data) => {
      console.log("START RESPONSE:", data);

      queryClient.invalidateQueries({
        queryKey: ["candidates-assessemnts"],
      });
    },
  });
};

export const useGetAttemptQuestions = (attemptId: string) => {
  return useQuery({
    queryKey: ["attempt-questions", attemptId],
    queryFn: () => getAttemptQuestions(attemptId),
    enabled: !!attemptId,
  });
};

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: ({
      attemptId,
      payload,
    }: {
      attemptId: string;
      payload: SubmitAnswerPayload;
    }) => submitAnswer(attemptId, payload),
  });
};

export const useSubmitAssessment = () => {
  return useMutation({
    mutationFn: (attemptId: string) => submitAssessment(attemptId),
  });
};

export const useGetAttemptResult = (attemptId: string) => {
  return useQuery({
    queryKey: ["attempt-result", attemptId],
    queryFn: () => getAttemptResult(attemptId),
    enabled: !!attemptId,
  });
};

export const useCancelAttempt = () => {
  return useMutation({
    mutationFn: (attemptId: string) => cancelAttempt(attemptId),
  });
};

export const useGetMyAllResults = () => {
  return useQuery({
    queryKey: ["my-results"],
    queryFn: getMyAllResults,
  });
};

export const useUpdateCandidateProfiles = () => {
  return useMutation({
    mutationFn: updateCandidateProfile,
  });
};
