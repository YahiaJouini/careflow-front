import { apiClient } from "@/lib/axios"
import { ApiResponse } from "@/types/global"
import { DoctorStats } from "@/types/doctor"
import { Appointment } from "@/types/appointment"

/**
 * Get doctor dashboard stats
 */
export const getDoctorStats = async (): Promise<DoctorStats> => {
   const response = await apiClient.get<ApiResponse<DoctorStats>>("/doctor/stats")
   return response.data.data
}

/**
 * Get doctor appointments (schedule & requests)
 */
export const getDoctorAppointments = async (): Promise<Appointment[]> => {
   const response = await apiClient.get<ApiResponse<Appointment[]>>(
      "/doctor/appointments"
   )
   return response.data.data
}

/**
 * Validate an appointment (accept/complete)
 */
export const validateAppointment = async (
   id: number,
   data: { status: "confirmed" | "completed" }
): Promise<Appointment> => {
   const response = await apiClient.patch<ApiResponse<Appointment>>(
      `/doctor/appointments/${id}/validate`,
      data
   )
   return response.data.data
}

/**
 * Update an appointment (reschedule/notes)
 */
export const updateAppointment = async (
   id: number,
   data: { appointmentDate?: string; doctorNotes?: string }
): Promise<Appointment> => {
   const response = await apiClient.put<ApiResponse<Appointment>>(
      `/doctor/appointments/${id}`,
      data
   )
   return response.data.data
}

/**
 * Reject/Cancel an appointment
 */
export const rejectAppointment = async (id: number): Promise<void> => {
   await apiClient.delete<ApiResponse<void>>(`/doctor/appointments/${id}`)
}

/**
 * Get doctor's patients
 */
export const getDoctorPatients = async (): Promise<any[]> => {
   const response = await apiClient.get<ApiResponse<any[]>>("/doctor/patients")
   return response.data.data
}
