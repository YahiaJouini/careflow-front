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
import { User } from "../types/user"
import { AuthState } from "@/types/auth"
import axios from "axios"

const AuthContext = createContext<AuthState | null>(null)

// localStorage helpers for access_token
const storage = {
   get: (): string | null => {
      try {
         return localStorage.getItem("access_token")
      } catch {
         return null
      }
   },
   set: (token: string): void => {
      try {
         localStorage.setItem("access_token", token)
      } catch (error) {
         console.error("Failed to save token to localStorage:", error)
      }
   },
   clear: (): void => {
      try {
         localStorage.removeItem("access_token")
      } catch (error) {
         console.error("Failed to clear token from localStorage:", error)
      }
   },
}

export default function AuthProvider({
   children,
}: {
   children: React.ReactNode
}) {
   // Initialize access token from localStorage
   const [accessToken, setAccessTokenState] = useState<string | null>(() => storage.get())
   const [isInitialized, setIsInitialized] = useState(false)
   const [isFetchingToken, setIsFetchingToken] = useState(true) // Start as true
   const refreshPromise = useRef<Promise<string | null> | null>(null)
   const queryClient = useQueryClient()

   // Fetch user data when we have an access token AND initialization is complete
   const { data: user = null, isLoading } = useQuery<User | null>({
      queryKey: ["user", accessToken],
      queryFn: async () => {
         const { data } = await apiClient.get("/me")
         return data.data
      },
      enabled: !!accessToken && isInitialized && !isFetchingToken,
      retry: 2,
   })

   // Wrapper to update both state and localStorage
   const setAccessToken = useCallback((token: string | null) => {
      if (token) {
         storage.set(token)
         setAccessTokenState(token)
      } else {
         storage.clear()
         setAccessTokenState(null)
      }
   }, [])

   const logout = useCallback(async () => {
      try {
         await apiClient.post("/auth/logout")
      } catch (err) {
         console.error("Logout API error:", err)
      } finally {
         setAccessToken(null)
         queryClient.clear()
      }
   }, [queryClient, setAccessToken])

   useEffect(() => {
      let isMounted = true

      // Request interceptor - add access token to headers
      const requestInterceptor = apiClient.interceptors.request.use(
         (config) => {
            const token = storage.get()
            if (token) {
               config.headers.Authorization = `Bearer ${token}`
            }
            return config
         },
         (error) => Promise.reject(error)
      )

      // Response interceptor - handle 401 and refresh token
      const responseInterceptor = apiClient.interceptors.response.use(
         (response) => response,
         async (error) => {
            const originalRequest = error.config
            const status = error.response?.status

            // Don't retry if:
            // 1. Not a 401 error
            // 2. Already retried this request
            // 3. Currently fetching initial token
            // 4. This IS the refresh token endpoint
            if(axios.isAxiosError(error)){
               if(error.response?.data?.error==="Invalid or expired token"){
                  logout()
                  return Promise.reject(error)
               }
            }
            if (
               status !== 401 ||
               originalRequest._retry ||
               isFetchingToken ||
               originalRequest.url === "/auth/refresh-token"
            ) {
               return Promise.reject(error)
            }

            originalRequest._retry = true

            // Use a shared promise to prevent multiple simultaneous refresh calls
            if (!refreshPromise.current) {
               refreshPromise.current = apiClient
                  .post("/auth/refresh-token")
                  .then(({ data }) => {
                     const newToken = data.data
                     if (!newToken) {
                        throw new Error("No access token received from refresh")
                     }
                     setAccessToken(newToken)
                     refreshPromise.current = null
                     return newToken
                  })
                  .catch((err) => {
                     console.error("Token refresh failed:", err)
                     refreshPromise.current = null
                     logout()
                     throw err
                  })
            }

            try {
               const newToken = await refreshPromise.current
               originalRequest.headers.Authorization = `Bearer ${newToken}`
               return apiClient(originalRequest)
            } catch (err) {
               return Promise.reject(err)
            }
         }
      )

      // Initialize auth AFTER interceptors are set up
      const initializeAuth = async () => {
         const existingToken = storage.get()

         // If we already have a token in localStorage, we're good
         if (existingToken) {
            if (isMounted) {
               setAccessTokenState(existingToken)
               setIsFetchingToken(false)
               setIsInitialized(true)
            }
            return
         }

         // Otherwise, try to get a new one via refresh token
         try {
            const { data } = await apiClient.post("/auth/refresh-token")
            if (data.data && isMounted) {
               setAccessToken(data.data)
            }
         } catch (error) {
            console.log("No valid refresh token available")
            if (isMounted) {
               setAccessToken(null)
            }
         } finally {
            if (isMounted) {
               setIsFetchingToken(false)
               setIsInitialized(true)
            }
         }
      }

      // Run initialization
      initializeAuth()

      return () => {
         isMounted = false
         apiClient.interceptors.request.eject(requestInterceptor)
         apiClient.interceptors.response.eject(responseInterceptor)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []) // Empty deps - only run once on mount

   const contextValue = useMemo(
      (): AuthState => ({
         accessToken,
         user,
         setAccessToken,
         isLoading: isLoading || isFetchingToken || !isInitialized,
         logout,
      }),
      [accessToken, user, setAccessToken, isLoading, isFetchingToken, isInitialized, logout]
   )

   return (
      <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
   )
}

// Hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
   const context = useContext(AuthContext)
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
   }
   return context
}