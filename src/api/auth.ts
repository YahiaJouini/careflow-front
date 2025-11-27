import { apiClient } from "@/lib/axios"
import { User } from "@/types/user"

interface VerifyResponse {
   user: User
}

export const verifySession = async () => {
   const { data } = await apiClient.get<VerifyResponse>("/auth/verify")
   return data
}

export const verifyAdmin = async () => {
   const { data } = await apiClient.get<VerifyResponse>("/auth/verify-admin")
   return data
}

export const verifyDoctor = async () => {
   const { data } = await apiClient.get<VerifyResponse>("/auth/verify-doctor")
   return data
}

export const googleLogin = async (code: string) => {
   const { data } = await apiClient.post("/auth/google-login", { code })
   return data
}
