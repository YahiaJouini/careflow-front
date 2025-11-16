import { createFileRoute } from "@tanstack/react-router"

import { User } from "../../types/user"
export const Route = createFileRoute("/dashboard/")({
    component: Home,
})

function Home() {
    const user: User = {
        id: 1,
        fullName: "John Doe",
        email: "idk@gmail.com",
        image: "https://i.pravatar.cc/150?img=3",
        createdAt: "2023-01-01T00:00:00.000Z",
    }

    return (
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
            </div>
        </main>
    )
}
