import { createFileRoute, redirect } from "@tanstack/react-router"
import { useAuth } from "../context/authContext"

export const Route = createFileRoute("/")({
    component: RouteComponent,
    beforeLoad: async ({ location, context }) => {
        const { isLoading, accessToken } = context.auth
        if (!accessToken && !isLoading) {
            throw redirect({
                to: "/sign-in",
                search: {
                    redirect: location.href,
                },
            })
        }
    },
})

function RouteComponent() {
    const { user } = useAuth()
    return <div>Hello {user?.fullName}</div>
}
