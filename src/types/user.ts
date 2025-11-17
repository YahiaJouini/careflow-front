export type Role = "patient" | "doctor" | "admin"
export type User = {
    id: number
    fullName: string
    email: string
    role: Role
    image: string | null
    createdAt: string
    bio?: string | null
}
