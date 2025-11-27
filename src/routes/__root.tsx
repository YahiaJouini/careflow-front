import {
   createRootRouteWithContext,
   Link,
   Outlet,
} from "@tanstack/react-router"
import { AuthState } from "../types/auth"

type RouterContext = {
   auth: AuthState
}
import { ThemeProvider } from "@/components/theme-provider"

export const Route = createRootRouteWithContext<RouterContext>()({
   component: () => (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
         <Outlet />
      </ThemeProvider>
   ),
   notFoundComponent: () => {
      return (
         <div>
            <p>This is the notFoundComponent configured on root route</p>
            <Link to="/">Start Over</Link>
         </div>
      )
   },
})
