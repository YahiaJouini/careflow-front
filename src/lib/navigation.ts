import { SidebarItem } from "@/types/global"
import { Role } from "@/types/user"
import {
    Home,
    User,
    CalendarPlus,
    CalendarCheck,
    BotMessageSquare,
    ClipboardList,
    Users,
    Settings,
    BarChart3,
} from "lucide-react"

const BaseBarItems: SidebarItem[] = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Profile", path: "/profile", icon: User },
]

const PatientSidebar: SidebarItem[] = [
    {
        label: "Appointments",
        path: "/patient/appointments",
        icon: CalendarPlus,
    },
    { label: "Chatbot", path: "/patient/chatbot", icon: BotMessageSquare },
]

const DoctorSidebar: SidebarItem[] = [
    {
        label: "Appointment Requests",
        path: "/doctor/requests",
        icon: ClipboardList,
    },
    { label: "My Schedule", path: "/doctor/schedule", icon: CalendarCheck },
    { label: "Patients", path: "/doctor/patients", icon: Users },
]

const AdminSidebar: SidebarItem[] = [
    { label: "Manage Users", path: "/admin/users", icon: Users },
    { label: "Manage Doctors", path: "/admin/doctors", icon: Users },
    {
        label: "Manage Appointments",
        path: "/admin/appointments",
        icon: ClipboardList,
    },
    { label: "System Settings", path: "/admin/settings", icon: Settings },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
]

export function getSidebarItems(role: Role): SidebarItem[] {
    switch (role) {
        case "patient":
            return [...BaseBarItems, ...PatientSidebar]
        case "doctor":
            return [...BaseBarItems, ...DoctorSidebar]
        case "admin":
            return [...BaseBarItems, ...AdminSidebar]
        default:
            return BaseBarItems
    }
}
