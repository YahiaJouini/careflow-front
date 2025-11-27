import { Doctor } from "@/types/doctor"

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 1,
    userId: 101,
    specialtyId: 1,
    user: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      image: ""
    },
    specialty: { 
      name: "Cardiology", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Experienced cardiologist with over 15 years specializing in interventional cardiology and heart disease prevention.",
    licenseNumber: "MED-CARD-2024-001",
    consultationFee: 150,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 2,
    userId: 102,
    specialtyId: 2,
    user: {
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@example.com",
      image: ""
    },
    specialty: { 
      name: "Dermatology", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Board-certified dermatologist focusing on medical and cosmetic dermatology with expertise in skin cancer detection.",
    licenseNumber: "MED-DERM-2024-002",
    consultationFee: 120,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 3,
    userId: 103,
    specialtyId: 3,
    user: {
      firstName: "Emily",
      lastName: "Williams",
      email: "emily.williams@example.com",
      image: ""
    },
    specialty: { 
      name: "Pediatrics", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Compassionate pediatrician dedicated to providing comprehensive care for infants, children, and adolescents.",
    licenseNumber: "MED-PED-2024-003",
    consultationFee: 100,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 4,
    userId: 104,
    specialtyId: 1,
    user: {
      firstName: "David",
      lastName: "Martinez",
      email: "david.martinez@example.com",
      image: ""
    },
    specialty: { 
      name: "Cardiology", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Interventional cardiologist specializing in minimally invasive procedures and cardiac catheterization.",
    licenseNumber: "MED-CARD-2024-004",
    consultationFee: 180,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 5,
    userId: 105,
    specialtyId: 4,
    user: {
      firstName: "James",
      lastName: "Anderson",
      email: "james.anderson@example.com",
      image: ""
    },
    specialty: { 
      name: "Orthopedics", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Orthopedic surgeon with expertise in sports medicine, joint replacement, and minimally invasive procedures.",
    licenseNumber: "MED-ORTH-2024-005",
    consultationFee: 160,
    isAvailable: false,
    isVerified: true,
  },
  {
    id: 6,
    userId: 106,
    specialtyId: 5,
    user: {
      firstName: "Jennifer",
      lastName: "Lee",
      email: "jennifer.lee@example.com",
      image: ""
    },
    specialty: { 
      name: "Neurology", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Neurologist specializing in movement disorders, epilepsy, and neurodegenerative diseases.",
    licenseNumber: "MED-NEUR-2024-006",
    consultationFee: 170,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 7,
    userId: 107,
    specialtyId: 2,
    user: {
      firstName: "Robert",
      lastName: "Thompson",
      email: "robert.thompson@example.com",
      image: ""
    },
    specialty: { 
      name: "Dermatology", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Dermatologist with special interest in pediatric dermatology and treatment of chronic skin conditions.",
    licenseNumber: "MED-DERM-2024-007",
    consultationFee: 130,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 8,
    userId: 108,
    specialtyId: 3,
    user: {
      firstName: "Amanda",
      lastName: "Davis",
      email: "amanda.davis@example.com",
      image: ""
    },
    specialty: { 
      name: "Pediatrics", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
    },
    bio: "Pediatric specialist with focus on developmental pediatrics and behavioral health in children.",
    licenseNumber: "MED-PED-2024-008",
    consultationFee: 110,
    isAvailable: true,
    isVerified: true,
  },
]

