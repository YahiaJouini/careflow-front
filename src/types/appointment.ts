export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentDate: string; // ISO String from backend
  reason: string;
  status: AppointmentStatus;
  doctorNotes?: string;
  doctor?: {
    id: number;
    user: {
      firstName: string;
      lastName: string;
      image?: string;
    };
    specialty: {
      name: string;
      icon: string;
    };
  }; // Preloaded for Patient View
  patient?: { 
    firstName: string; 
    lastName: string; 
    image?: string 
  }; // Preloaded for Doctor View
}
