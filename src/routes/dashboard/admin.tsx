import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/admin")({
   component: AdminLayout,
   beforeLoad: ({ context }) => {
      const { user, isLoading } = context.auth
      
      // Wait for auth to load before making decisions
      if (isLoading || !user) {
         return
      }
      
      if (user.role !== 'admin') {
         throw redirect({ to: '/dashboard' })
      }
   },
})

function AdminLayout() {
   return <Outlet />
}
