import { createFileRoute, redirect } from "@tanstack/react-router"
import { useAuth } from "../context/authContext"

export const Route = createFileRoute("/")({
    component: RouteComponent,
    beforeLoad: async ({ location, context }) => {
        const { accessToken, isFetchingToken } = context.auth
        console.log(
            "accessToken : ",
            accessToken,
            " isFetchingToken : ",
            isFetchingToken,
        )
        if (!accessToken && !isFetchingToken) {
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
