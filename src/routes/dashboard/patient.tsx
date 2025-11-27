import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/patient')({
  component: PatientLayout,
  beforeLoad: ({ context }) => {
    const { user, isLoading } = context.auth
    
    // Wait for auth to load before making decisions
    if (isLoading || !user) {
      return
    }
    
    if (user.role !== 'patient') {
      throw redirect({ to: '/dashboard' })
    }
  },
})

function PatientLayout() {
  return <Outlet />
}


