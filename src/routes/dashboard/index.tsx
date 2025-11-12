import { createFileRoute, redirect } from "@tanstack/react-router"
import { useState } from "react"
import { useAuth } from "../../context/authContext"
import { User } from "../../types/user"

export const Route = createFileRoute("/dashboard/")({
    component: DashboardRoute,
    beforeLoad: async ({ location, context }) => {
        const { isLoading, accessToken } = context.auth
        if (!accessToken && !isLoading) {
            throw redirect({
                to: "/sign-in",
                search: { redirect: location.href },
            })
        }
    },
})

function DashboardRoute() {
    const { logout } = useAuth()
    const [active, setActive] = useState("appointments")

    const user: User = {
        fullName: "John Doe",
        email: "joh",
        id: 12,
        image: "qdgog",
        createdAt: "2024-06-01T12:00:00Z",
    }

    return (
        <div className="flex min-h-screen bg-[var(--color-mainBg)] text-[var(--color-mainText)]">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 flex h-screen w-[260px] flex-col border-r border-[var(--color-input)] bg-[var(--color-lightBg)] backdrop-blur-md">
                {/* Logo */}
                <div className="border-b border-[var(--color-input)] px-5 py-6">
                    <h1 className="text-[18px] font-semibold text-[var(--color-theme)]">
                        CareFlow
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col gap-2 px-3 py-6">
                    {[
                        { id: "appointments", label: "Appointments" },
                        { id: "treatments", label: "Treatments" },
                        { id: "history", label: "History" },
                        { id: "profile", label: "Profile" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`rounded-lg px-4 py-3 text-left text-[14px] font-medium transition-colors ${active === item.id
                                    ? "bg-[var(--color-theme)] text-[var(--color-mainText)]"
                                    : "text-gray-300 hover:bg-[var(--color-input)]"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* User Section */}
                <div className="border-t border-[var(--color-input)] p-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-theme)] text-[18px] font-semibold text-[var(--color-mainText)]">
                            {user.fullName.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold">
                                {user.fullName}
                            </p>
                            <p className="truncate text-[12px] text-gray-400">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full rounded-md bg-red-600/20 px-3 py-2 text-[13px] font-medium text-red-400 transition-colors hover:bg-red-600/30"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="ml-[260px] flex-1 p-10">
                <div>
                    <h2 className="mb-2 text-[28px] font-bold">
                        Welcome, {user.fullName.split(" ")[0]}
                    </h2>
                    <p className="text-[14px] text-gray-400">
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {/* Active section placeholder */}
                <div className="mt-10 rounded-lg border border-[var(--color-input)] bg-[var(--color-lightBg)] p-8 shadow-sm">
                    <h3 className="text-lg font-semibold text-[var(--color-theme)] capitalize">
                        {active}
                    </h3>
                    <p className="mt-2 text-[14px] text-gray-400">
                        {`Content for the "${active}" section would go here.`}
                    </p>
                </div>
            </main>
        </div>
    )
}
