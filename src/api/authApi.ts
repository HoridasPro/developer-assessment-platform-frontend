import apiClient from "@/lib/apiClient";
import { loginPayload } from "@/types/loginPayload";
import { registerPayload } from "@/types/registerPayload";

export const userLogin = (payload: loginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
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

export const verifyEmail = (token: string) => {
  return apiClient(`/auth/verify-email?token=${encodeURIComponent(token)}`, {
    method: "GET",
  });
};

export const getMe = () => {
  return apiClient("/users/me");
};
