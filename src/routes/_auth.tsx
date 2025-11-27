import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import AuthImagePattern from "../components/auth/AuthImagePattern"

export const Route = createFileRoute("/_auth")({
   component: Layout,
   beforeLoad: async ({ location, context }) => {
      // if authenticated, redirect to dashboard
      const { accessToken } = context.auth
      if (accessToken) {
         throw redirect({
            to: "/dashboard",
            search: {
               redirect: location.href,
            },
         })
      }
   },
})

function Layout() {
   return (
      <div className="grid h-screen md:grid-cols-2">
         <div className="flex-center bg-lightBg h-full w-full">
            <div className="w-[90%] md:max-w-3/4 xl:max-w-md">
               <Outlet />
            </div>
         </div>
         <AuthImagePattern
            title="Join the community"
            subtitle="Create an account to start sharing your thoughts with the world"
         />
      </div>
   )
}
