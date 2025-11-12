import { RouterProvider } from "@tanstack/react-router"

import Loader from "./components/global/Loader"
import { Toaster } from "./components/ui/sonner"
import AuthProvider, { useAuth } from "./context/authContext"
import QueryProvider from "./lib/queryClient"
import { createAppRouter } from "./router"

function InnerApp() {
    const auth = useAuth()
    if (!auth.accessToken && auth.isFetchingUser) {
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
    return (
        <div className="text-mainText bg-mainBg relative flex min-h-screen flex-col overflow-x-hidden antialiased">
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
