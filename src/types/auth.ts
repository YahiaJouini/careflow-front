import { User } from "./user"

export type AuthState = {
    user: User | null
    isLoading: boolean
    logout: () => Promise<void>
    setAccessToken: (token: string | null) => void
    accessToken: string | null
}

export type AuthResponse = {
    accessToken: string
}
