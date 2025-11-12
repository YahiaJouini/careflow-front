import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { apiClient } from "../lib/axios"
import { errorToasts } from "../lib/error-toasts"
import { User } from "../types/user"
import { AuthState } from "../types/auth"

const AuthContext = createContext<AuthState | null>(null)

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    // access token and user only stored in memory
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isFetchingToken, setIsFetchingToken] = useState(false)

    const refreshPromise = useRef<Promise<string | null> | null>(null)
    const queryClient = useQueryClient()

    const { data: user = null, isLoading: isFetchingUser } =
        useQuery<User | null>({
            queryKey: ["user", accessToken],
            queryFn: async () => {
                const { data } = await apiClient.get("/user")
                return data.data
            },
            enabled: !!accessToken,
            retry: 2,
        })

    const logout = useCallback(async () => {
        try {
            await apiClient.post("/auth/logout")
            setAccessToken(null)
            queryClient.clear()
        } catch (err) {
            console.log(err)
        }
    }, [queryClient])

    useEffect(() => {
        // set access token if user refreshes the page and is already logged in
        const initializeAuth = async () => {
            try {
                setIsFetchingToken(true)
                const { data } = await apiClient.get("/auth/refresh-token", {
                    timeout: 5000,
                })
                setAccessToken(data.data ?? null)
            } catch (err) {
                console.error("Token refresh failed:", err)
                setAccessToken(null)
            } finally {
                setIsFetchingToken(false)
            }
        }

        initializeAuth()
        const requestInterceptor = apiClient.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
                return config
            },
            (error) => Promise.reject(error),
        )

        const responseInterceptor = apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config
                const status = error.response?.status
                const message = error.response?.data?.error || "An error occurred"

                if (status === 401 && !originalRequest._retry && !isFetchingToken) {
                    originalRequest._retry = true
                    if (!refreshPromise.current) {
                        refreshPromise.current = apiClient
                            .get("/auth/refresh-token")
                            .then(({ data }) => {
                                refreshPromise.current = null
                                if (!data.data) {
                                    throw new Error("No access token received")
                                }
                                setAccessToken(data.data)
                                return data.data
                            })
                            .catch((err) => {
                                refreshPromise.current = null
                                logout()
                                return Promise.reject(err)
                            })
                    }
                    try {
                        const newToken = await refreshPromise.current
                        originalRequest.headers.Authorization = `Bearer ${newToken}`
                        return apiClient(originalRequest)
                    } catch (err) {
                        return Promise.reject(err)
                    }
                } else {
                    errorToasts(status, message)
                    return Promise.reject(error)
                }
            },
        )

        return () => {
            apiClient.interceptors.request.eject(requestInterceptor)
            apiClient.interceptors.response.eject(responseInterceptor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const contextValue = useMemo(
        (): AuthState => ({
            accessToken,
            user,
            setAccessToken,
            isFetchingUser,
            logout,
            isFetchingToken,
        }),
        [accessToken, isFetchingUser, user, logout, isFetchingToken],
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
