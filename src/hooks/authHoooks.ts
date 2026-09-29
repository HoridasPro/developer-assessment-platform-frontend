import {
  getMe,
  userGoogleAuthLogin,
  userLogin,
  userLogout,
  userRegister,
  verifyEmail,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
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

export const useVerifyEmail = (token: string | null) => {
  return useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmail(token as string),
    enabled: !!token,
    retry: false,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
};
