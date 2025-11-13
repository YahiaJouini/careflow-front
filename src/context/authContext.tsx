import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import { apiClient } from "../lib/axios"
import { User } from "../types/user"
import { AuthState } from "../types/auth"
import { ServerResponse } from "../types/global"
import { toast } from "sonner"
import axios from "axios"
import { USER_QUERY_KEY } from "../lib/constants"

const AuthContext = createContext<AuthState | null>(null)

// document cookie helpers
const cookies = {
    get: (): string | null =>
        document.cookie.match(/access_token=([^;]+)/)?.[1] || null,
    set: (token: string): void => {
        document.cookie = `access_token=${token}; path=/; max-age=${15 * 60}; SameSite=Strict`
    },
    clear: (): void => {
        document.cookie = "access_token=; path=/; max-age=0"
    },
}

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [accessToken, setAccessToken] = useState<string | null>(cookies.get())
    const [interceptorReady, setInterceptorsReady] = useState(false)
    const queryClient = useQueryClient()

    const { data: user = null, isLoading } = useQuery<User | null>({
        queryKey: [USER_QUERY_KEY],
        queryFn: async () => {
            const { data } = await apiClient.get<ServerResponse>("/users")
            return data.data
        },
        enabled: !!accessToken && interceptorReady,
        retry: false,
    })

    const updateToken = useCallback(
        (newToken: string | null) => {
            if (newToken) {
                cookies.set(newToken)
                setAccessToken(newToken)
            } else {
                cookies.clear()
                setAccessToken(null)
            }
            queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
        },
        [queryClient],
    )

    const logout = useCallback(async () => {
        try {
            await apiClient.post("/auth/logout")
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error("Logout failed", {
                    description:
                        err.response?.data.message ||
                        "An error occurred during logout",
                })
                return
            }
            toast.error("Logout failed", {
                description: "An unexpected error occurred during logout",
            })
            return
        } finally {
            updateToken(null)
            queryClient.clear()
        }
    }, [queryClient, updateToken])

    useEffect(() => {
        console.log("setting up interceptors")
        const requestInterceptor = apiClient.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
                return config
            },
        )

        const responseInterceptor = apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config
                const status = error.response?.status

                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true

                    try {
                        const { data } = await apiClient.post<ServerResponse>(
                            "/auth/refresh",
                            {
                                token: accessToken,
                            },
                        )
                        updateToken(data.data.accessToken)
                        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`
                        return apiClient(originalRequest)
                    } catch (refreshError) {
                        console.log("refresh error ", refreshError)
                        return Promise.reject(refreshError)
                    }
                }

                return Promise.reject(error)
            },
        )

        setInterceptorsReady(true)

        return () => {
            apiClient.interceptors.request.eject(requestInterceptor)
            apiClient.interceptors.response.eject(responseInterceptor)
        }
    }, [accessToken, logout, updateToken])

    const value = useMemo(
        (): AuthState => ({
            user,
            isLoading,
            logout,
            setAccessToken: updateToken,
            accessToken,
        }),
        [user, isLoading, logout, updateToken, accessToken],
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
