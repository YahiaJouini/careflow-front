import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { verifyAdmin } from "@/api/auth"

export const Route = createFileRoute("/dashboard/admin")({
   component: AdminLayout,
   beforeLoad: async () => {
       try {
           await verifyAdmin()
       } catch (error) {
           throw redirect({
               to: "/dashboard",
           })
       }
   },
})

function AdminLayout() {
   return <Outlet />
}
