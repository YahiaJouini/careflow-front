import { apiClient } from "@/lib/axios"
import { ApiResponse } from "@/types/global"

export interface UpdateProfileBody {
  firstName?: string
  lastName?: string
  image?: string
  // Doctor specific
  bio?: string
  consultationFee?: number
  isAvailable?: boolean
}

/**
 * Update user profile
 */
export const updateProfile = async (data: UpdateProfileBody): Promise<any> => {
  const response = await apiClient.put<ApiResponse<any>>("/me", data)
  return response.data.data
}

/**
 * Delete user account
 */
export const deleteAccount = async (): Promise<void> => {
  await apiClient.delete<ApiResponse<void>>("/me")
}
