import { RouterProvider } from "@tanstack/react-router"

import Loader from "@/components/global/Loader"
import { Toaster } from "@/components/ui/sonner"
import AuthProvider, { useAuth } from "@/context/authContext"
import QueryProvider from "@/lib/queryClient"
import { createAppRouter } from "./router"
import { useTheme } from "@/context/themeContext"
import { cn } from "./lib/utils"

function InnerApp() {
    const auth = useAuth()
    if (!auth.accessToken && auth.isLoading) {
        return (
            <div className="flex-center h-screen w-full">
                <Loader />
            </div>
        )
    }

    const router = createAppRouter({ auth })
    return <RouterProvider router={router} />
}

function App() {
    const { theme } = useTheme()
    return (
        <div
            className={cn(
                "text-mainText bg-mainBg relative flex min-h-screen flex-col overflow-x-hidden antialiased",
                {
                    dark: theme === "dark",
                },
            )}
        >
            <QueryProvider>
                <AuthProvider>
                    <InnerApp />
                    <Toaster duration={3000} richColors position="top-center" />
                </AuthProvider>
            </QueryProvider>
        </div>
    )
}
export default App
