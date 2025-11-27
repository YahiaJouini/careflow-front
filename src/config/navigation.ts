import {
  Home, Search, Calendar, FileText, Bot, Settings,
  CalendarClock, UserPlus, Users,
  LayoutDashboard, Stethoscope, Tag, Scroll
} from "lucide-react";

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface SidebarLink {
  label: string;
  href: string;
  icon: any;
}

export const DASHBOARD_LINKS: Record<UserRole, SidebarLink[]> = {
  patient: [
    { label: 'Overview', href: '/dashboard/patient', icon: Home },
    { label: 'Find a Doctor', href: '/dashboard/patient/doctors', icon: Search },
    { label: 'My Appointments', href: '/dashboard/patient/appointments', icon: Calendar },
    { label: 'Medical History', href: '/dashboard/patient/history', icon: FileText },
    { label: 'AI Assistant', href: '/dashboard/patient/chat', icon: Bot },
    { label: 'Profile', href: '/dashboard/settings/profile', icon: Settings },
  ],
  doctor: [
    { label: 'Overview', href: '/dashboard/doctor', icon: Home },
    { label: 'Schedule', href: '/dashboard/doctor/schedule', icon: CalendarClock },
    { label: 'Patient Requests', href: '/dashboard/doctor/requests', icon: UserPlus },
    { label: 'My Patients', href: '/dashboard/doctor/patients', icon: Users },
    { label: 'Profile', href: '/dashboard/settings/profile', icon: Settings },
  ],
  admin: [
    { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Users', href: '/dashboard/admin/users', icon: Users },
    { label: 'Doctors', href: '/dashboard/admin/doctors', icon: Stethoscope },
    { label: 'Specialties', href: '/dashboard/admin/specialties', icon: Tag },
    { label: 'Logs', href: '/dashboard/admin/logs', icon: Scroll },
    { label: 'Profile', href: '/dashboard/settings/profile', icon: Settings },
  ]
};
