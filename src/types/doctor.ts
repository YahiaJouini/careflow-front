
export type Doctor = {
   id: number
   userId: number
   specialtyId: number
   bio: string
   licenseNumber: string
   consultationFee: number
   isAvailable: boolean
   isVerified: boolean
   user: { 
      firstName: string
      lastName: string
      image?: string
      email: string 
   }
   specialty: { 
      name: string
      icon: string 
   }
}

export interface DoctorStats {
  totalRevenue: number;
  pendingRequests: number;
  upcomingAppointments: number;
  totalPatients: number;
  completedVisits: number;
}

export type PromoteToDoctorInput = {
   role: "doctor"
   specialtyId: number
   licenseNumber: string
}

export type DemoteToPatientInput = {
   role: "patient"
}

export interface AppointmentRequest {
   doctorId: number
   appointmentDate: string // ISO Date String
   reason: string
}


export interface PublicDoctor {
  id: number;
  userId: number;
  specialtyId: number;
  bio: string;
  licenseNumber: string;
  consultationFee: number;
  isAvailable: boolean;
  isVerified: boolean;
  // Preloaded Relations
  user: {
    firstName: string;
    lastName: string;
    email: string;
    image: string; // URL
  };
  specialty: {
    id: number;
    name: string;
    icon: string; // URL or Icon Name
  };
}

export interface DoctorsResponse {
  success: boolean;
  message: string;
  data: PublicDoctor[];
}
