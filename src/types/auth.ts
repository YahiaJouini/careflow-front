import { User } from "./user"

export type AuthState = {
    accessToken: string | null
    setAccessToken: (token: string | null) => void
    user: User | null
    isFetchingUser: boolean
    logout: () => void
    isFetchingToken: boolean
}
