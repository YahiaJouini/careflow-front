import { createRouter } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"
import { AuthState } from "./types/auth"

declare module "@tanstack/react-router" {
   interface Register {
      router: ReturnType<typeof createAppRouter>
   }
}

export function createAppRouter(context: { auth: AuthState }) {
   return createRouter({
      routeTree,
      defaultPreload: "intent",
      scrollRestoration: true,
      context, // type-safe and real at runtime
   })
}
