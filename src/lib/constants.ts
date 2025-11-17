import { User } from "@/types/user"

export const api = import.meta.env.VITE_BACKEND_API_URL as string
export const USER_QUERY_KEY = "user"

// TODO: remove this mock user
export const USER: User = {
    id: 1,
    fullName: "John Doe",
    role: "admin",
    email: "JohnDoe@gmail.com",
    createdAt: "2023-01-01T00:00:00.000Z",
    image: "https://placehold.co/600x400/png",
    bio: "This is a sample bio",
}
