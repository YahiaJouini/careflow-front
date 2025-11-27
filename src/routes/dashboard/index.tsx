import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
   beforeLoad: ({ context }) => {
      const { user, isLoading, accessToken } = context.auth
      
      // If still loading, don't make any redirect decisions yet
      if (isLoading) {
         return
      }

      // If no access token and not loading, redirect to sign-in
      if (!accessToken) {
         throw redirect({ to: "/sign-in" })
      }

      // If we have a token but no user yet, wait (this shouldn't happen but prevents loops)
      if (!user) {
         return
      }

      // Redirect based on user role
      switch (user.role) {
         case "admin":
            throw redirect({ to: "/dashboard/admin" })
         case "doctor":
            throw redirect({ to: "/dashboard/doctor" })
         case "patient":
            throw redirect({ to: "/dashboard/patient" })
         default:
            throw redirect({ to: "/sign-in" })
      }
   },
})
