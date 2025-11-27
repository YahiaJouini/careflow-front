import { apiClient } from "@/lib/axios"
import { Specialty } from "@/types/specialty"
import { ApiResponse } from "@/types/global"

/**
 * Get all specialties (public route)
 */
export const getPublicSpecialties = async (): Promise<Specialty[]> => {
   const response = await apiClient.get<ApiResponse<Specialty[]>>(
      "/public/specialties",
   )
   return response.data.data
}

import { PublicDoctor, DoctorsResponse } from "@/types/doctor"

/**
 * Get all doctors (public route)
 */
export const getDoctors = async (specialtyId?: number): Promise<PublicDoctor[]> => {
   const params = specialtyId ? { specialtyId } : {}
   const response = await apiClient.get<DoctorsResponse>("/public/doctors", {
      params,
   })
   return response.data.data
}
