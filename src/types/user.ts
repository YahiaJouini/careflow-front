import { Doctor } from "./doctor"

export type Role = "patient" | "doctor" | "admin"

export type User = {
   id: number
   firstName: string
   lastName: string
   email: string
   role: Role
   image: string
   verified: boolean
   doctor?: Doctor
}

export type CreateUserInput = {
   firstName: string
   lastName: string
   email: string
   password: string
   role: "admin" | "patient"
}
