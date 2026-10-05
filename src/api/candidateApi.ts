import apiClient from "@/lib/apiClient";

export const getInvitationAssessment = () => {
  return apiClient("invitations/my-assigned", {
    method: "GET",
  });
};

export const acceptInvitation = (invitationId: string) => {
  return apiClient(`/invitations/status/${invitationId}`, {
    method: "PATCH",
  });
};
