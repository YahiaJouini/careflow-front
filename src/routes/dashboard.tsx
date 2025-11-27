import { Sidebar } from "@/components/dashboard/SideBar"
import { Outlet, redirect } from "@tanstack/react-router"

import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
   component: Layout,
   beforeLoad: async ({ location, context }) => {
       const { isLoading, accessToken } = context.auth
       if (!accessToken && !isLoading) {
           throw redirect({
               to: "/sign-in",
               search: { redirect: location.href },
           })
       }
   },
})

function Layout() {
   return (
      <div className="relative flex min-h-screen w-full">
         <Sidebar />
         <main className="container mx-auto bg-background flex-1 overflow-auto py-12">
            <Outlet />
         </main>
      </div>
   )
}
