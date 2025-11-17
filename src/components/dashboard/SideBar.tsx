import { useAuth } from "@/context/authContext"
import useActiveLink from "@/hooks/activeLinks"
import { getSidebarItems } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { useState } from "react"

export function Sidebar() {
    const { user, logout, isLoading } = useAuth()
    const [isOpen, setIsOpen] = useState(true)
    const activeFn = useActiveLink()

    // TODO: show loader
    if (!user || isLoading) return
    const items = getSidebarItems(user.role)

    const AvatarInitial = () => (
        <div className="bg-theme flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-white shadow-md">
            {user.fullName.charAt(0).toUpperCase()}
        </div>
    )

    return (
        <>
            <aside
                className={cn(
                    "text-muted-foreground border-mainText/30 fixed top-0 left-0 flex h-screen flex-col border-r transition-all",
                    isOpen ? "w-64" : "w-20",
                )}
            >
                {/* HEADER */}
                <div className="border-lightBg flex items-center justify-between border-b px-4 py-6">
                    {isOpen && (
                        <h1 className="text-mainText text-lg font-bold">CareFlow</h1>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-mainText hover:bg-lightBg rounded-lg p-1.5"
                    >
                        {isOpen ? <ChevronLeft /> : <ChevronRight />}
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-2 px-3 py-6">
                    {items.map((item) => {
                        const Icon = item.icon

                        const isActive = activeFn(item.path)

                        return (
                            <Link
                                // TODO: remove 'as any' when routes are created
                                to={`/dashboard/${item.path}` as any}
                                key={item.path}
                                className={cn(
                                    "text-mainText flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold",
                                    isActive
                                        ? "bg-theme text-white"
                                        : "hover:bg-lightBg",
                                )}
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon className="h-5 w-5" />
                                {isOpen && <span>{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* FOOTER */}
                <div className="border-lightBg border-t p-4">
                    <div className="mb-4 flex items-center gap-3">
                        <AvatarInitial />
                        {isOpen && (
                            <div className="min-w-0 flex-1">
                                <p className="text-mainText truncate text-sm font-semibold">
                                    {user.fullName}
                                </p>
                                <p className="text-mainText/50 truncate text-xs">
                                    {user.email}
                                </p>
                            </div>
                        )}
                    </div>

                    {isOpen && (
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    )}
                </div>
            </aside>

            <div
                className="transition-all"
                style={{ width: isOpen ? "16rem" : "5rem" }}
            />
        </>
    )
}
