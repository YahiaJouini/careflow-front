import { useState } from "react"
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    Home,
    Settings,
    FileText,
    BarChart3,
} from "lucide-react"
import { cn } from "../../lib/utils"
import { User } from "../../types/user"

type DashboardSidebarProps = {
    user: User
    active: string
    onActive: (id: string) => void
    onLogout: () => void
}

export function DashboardSidebar({
    user,
    active,
    onActive,
    onLogout,
}: DashboardSidebarProps) {
    const [isOpen, setIsOpen] = useState(true)

    const navItems = [
        { id: "appointments", label: "Appointments", icon: Home },
        { id: "treatments", label: "Treatments", icon: BarChart3 },
        { id: "history", label: "History", icon: FileText },
        { id: "profile", label: "Profile", icon: Settings },
    ]

    const AvatarInitial = () => (
        <div className="text-mainText bg-theme flex h-10 w-10 items-center justify-center rounded-lg font-semibold shadow-md">
            {user.fullName.charAt(0).toUpperCase()}
        </div>
    )

    return (
        <>
            <aside
                className={cn(
                    "text-muted-foreground border-mainText/30 fixed top-0 left-0 flex h-screen flex-col border-r transition-all duration-300 ease-out",
                    isOpen ? "w-64" : "w-20",
                )}
            >
                <div className="border-lightBg flex items-center justify-between border-b px-4 py-6">
                    {isOpen && (
                        <h1 className="text-mainText text-lg font-bold">CareFlow</h1>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-mainText hover:bg-lightBg rounded-lg p-1.5 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        {isOpen ? (
                            <ChevronLeft className="h-5 w-5" />
                        ) : (
                            <ChevronRight className="h-5 w-5" />
                        )}
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-2 px-3 py-6">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = active === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => onActive(item.id)}
                                className={cn(
                                    "text-mainText flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                                    isActive ? "bg-theme" : "hover:bg-lightBg",
                                )}
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {isOpen && (
                                    <span className="truncate">{item.label}</span>
                                )}
                            </button>
                        )
                    })}
                </nav>

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
                            onClick={onLogout}
                            className="flex w-full items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    )}
                </div>
            </aside>

            <div
                className="transition-all duration-300 ease-out"
                style={{ width: isOpen ? "16rem" : "5rem" }}
            />
        </>
    )
}
