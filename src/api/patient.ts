import { apiClient } from "@/lib/axios"
import { AppointmentRequest } from "@/types/doctor"
import { ApiResponse } from "@/types/global"

/**
 * Create a new appointment (Patient only)
 */
export const createAppointment = async (data: AppointmentRequest): Promise<any> => {
   const response = await apiClient.post<ApiResponse<any>>(
      "/patient/appointments",
      data
   )
   return response.data.data
}

/**
 * Get my appointments
 */
export const getMyAppointments = async (): Promise<any[]> => {
   const response = await apiClient.get<ApiResponse<any[]>>(
      "/patient/appointments"
   )
   return response.data.data
}

/**
 * Update an appointment
 */
export const updateAppointment = async (id: number, data: { appointmentDate: string; reason: string }): Promise<any> => {
   const response = await apiClient.put<ApiResponse<any>>(
      `/patient/appointments/${id}`,
      data
   )
   return response.data.data
}

/**
 * Cancel an appointment
 */
export const cancelAppointment = async (id: number): Promise<void> => {
   await apiClient.delete<ApiResponse<void>>(`/patient/appointments/${id}`)
}

