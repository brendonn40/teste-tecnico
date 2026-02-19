import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { LoginForm } from "../types";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginForm) => {
      return api.post(`/auth/sign-in`, data);
    },
  });
}
