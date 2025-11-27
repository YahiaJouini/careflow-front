import { apiClient } from "@/lib/axios"
import { User, CreateUserInput } from "@/types/user"
import {
   Specialty,
   CreateSpecialtyInput,
   UpdateSpecialtyInput,
} from "@/types/specialty"
import { PromoteToDoctorInput, DemoteToPatientInput } from "@/types/doctor"
import { ApiResponse } from "@/types/global"

// ============================================
// SPECIALTIES API
// ============================================

/**
 * Get all specialties (admin route)
 */
export const getAdminSpecialties = async (): Promise<Specialty[]> => {
   const response =
      await apiClient.get<ApiResponse<Specialty[]>>("/admin/specialties")
   return response.data.data
}

/**
 * Create a new specialty
 */
export const createSpecialty = async (
   data: CreateSpecialtyInput,
): Promise<Specialty> => {
   const response = await apiClient.post<ApiResponse<Specialty>>(
      "/admin/specialties",
      data,
   )
   return response.data.data
}

/**
 * Update an existing specialty
 */
export const updateSpecialty = async (
   id: number,
   data: UpdateSpecialtyInput,
): Promise<Specialty> => {
   const response = await apiClient.put<ApiResponse<Specialty>>(
      `/admin/specialties/${id}`,
      data,
   )
   return response.data.data
}

/**
 * Delete a specialty
 */
export const deleteSpecialty = async (id: number): Promise<void> => {
   await apiClient.delete<ApiResponse<void>>(`/admin/specialties/${id}`)
}

// ============================================
// USER MANAGEMENT API
// ============================================

/**
 * Get all users with optional role filter
 */
export const getUsers = async (
   role?: "doctor" | "patient",
): Promise<User[]> => {
   const params = role ? { role } : {}
   const response = await apiClient.get<ApiResponse<User[]>>("/admin/users", {
      params,
   })
   return response.data.data
}

/**
 * Create a new user (admin or patient only)
 */
export const createUser = async (data: CreateUserInput): Promise<User> => {
   const response = await apiClient.post<ApiResponse<User>>(
      "/admin/users",
      data,
   )
   return response.data.data
}

/**
 * Delete a user
 */
export const deleteUser = async (id: number): Promise<void> => {
   await apiClient.delete<ApiResponse<void>>(`/admin/users/${id}`)
}

// ============================================
// DOCTOR MANAGEMENT & ROLE CHANGES
// ============================================

/**
 * Promote user to doctor or demote to patient
 */
export const updateUserRole = async (
   userId: number,
   data: PromoteToDoctorInput | DemoteToPatientInput,
): Promise<User> => {
   const response = await apiClient.patch<ApiResponse<User>>(
      `/admin/users/${userId}/role`,
      data,
   )
   return response.data.data
}

/**
 * Verify a doctor
 */
export const verifyDoctor = async (doctorId: number): Promise<void> => {
   await apiClient.patch<ApiResponse<void>>(`/admin/doctors/${doctorId}/verify`)
}

// ============================================
// DASHBOARD STATS
// ============================================

/**
 * Get admin dashboard stats
 */
export const getAdminStats = async (): Promise<any> => {
   const response = await apiClient.get<ApiResponse<any>>("/admin/stats")
   return response.data.data
}
