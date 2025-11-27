import {
   createRootRouteWithContext,
   Link,
   Outlet,
} from "@tanstack/react-router"
import { AuthState } from "../types/auth"

type RouterContext = {
   auth: AuthState
}
export const Route = createRootRouteWithContext<RouterContext>()({
   component: () => <Outlet />,
   notFoundComponent: () => {
      return (
         <div>
            <p>This is the notFoundComponent configured on root route</p>
            <Link to="/">Start Over</Link>
         </div>
      )
   },
})
