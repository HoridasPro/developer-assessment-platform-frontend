import {
  getMe,
  userGoogleAuthLogin,
  userLogin,
  userLogout,
  userRegister,
  verifyEmailOtp,
  verifyLoginOtp,
} from "@/api";
import { verifyEmailOtpPayload } from "@/types/verifyEmailOtpPayload";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useVerifyLoginOtp = () => {
  return useMutation({
    mutationFn: (payload: verifyEmailOtpPayload) => verifyLoginOtp(payload),
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
    mutationFn: (payload: verifyEmailOtpPayload) => verifyEmailOtp(payload),
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
};
