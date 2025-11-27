import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { verifyDoctor } from "@/api/auth"

export const Route = createFileRoute('/dashboard/doctor')({
  component: DoctorLayout,
  beforeLoad: async () => {
      try {
          await verifyDoctor()
      } catch (error) {
          throw redirect({
              to: "/dashboard",
          })
      }
  },
})

function DoctorLayout() {
  return <Outlet />
}


