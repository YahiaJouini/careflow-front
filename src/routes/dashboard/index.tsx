import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useAuth } from "../../context/authContext"
import { DashboardSidebar } from "../../components/dashboard/SideBar"
import { User } from "../../types/user"

export const Route = createFileRoute("/dashboard/")({
    component: DashboardRoute,
    // beforeLoad: async ({ location, context }) => {
    //     const { isLoading, accessToken } = context.auth
    //     if (!accessToken && !isLoading) {
    //         throw redirect({
    //             to: "/sign-in",
    //             search: { redirect: location.href },
    //         })
    //     }
    // },
})

function DashboardRoute() {
    const { logout } = useAuth()
    const user: User = {
        id: 1,
        fullName: "John Doe",
        email: "idk@gmail.com",
        image: "https://i.pravatar.cc/150?img=3",
        createdAt: "2023-01-01T00:00:00.000Z",
    }
    const [active, setActive] = useState("appointments")

    if (!user) {
        return <div>Loading...</div>
    }
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar
                user={user}
                active={active}
                onActive={setActive}
                onLogout={logout}
            />

            <main className="flex-1 overflow-auto">
                <div className="space-y-8 p-8 md:p-10">
                    <div className="space-y-2">
                        <h2
                            className="text-3xl font-bold text-balance"
                            style={{ color: "var(--color-mainText)" }}
                        >
                            Welcome back, {user.fullName.split(" ")[0]}
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div
                        className="rounded-xl p-6 shadow-sm md:p-8"
                        style={{
                            backgroundColor: "var(--color-lightBg)",
                            borderColor: "var(--color-lightBg)",
                            borderWidth: "1px",
                        }}
                    >
                        <div className="space-y-3">
                            <h3
                                className="text-lg font-semibold capitalize"
                                style={{ color: "var(--color-mainText)" }}
                            >
                                {active}
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}
                            >{`Content for the "${active}" section would go here.`}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
