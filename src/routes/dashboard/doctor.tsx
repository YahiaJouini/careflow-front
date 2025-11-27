import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/doctor')({
  component: DoctorLayout,
  beforeLoad: ({ context }) => {
    const { user, isLoading } = context.auth
    
    // Wait for auth to load before making decisions
    if (isLoading || !user) {
      return
    }
    
    if (user.role !== 'doctor') {
      throw redirect({ to: '/dashboard' })
    }
  },
})

function DoctorLayout() {
  return <Outlet />
}


