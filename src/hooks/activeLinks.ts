import { useLocation } from "@tanstack/react-router"

const useActiveLink = () => {
   const pathname = useLocation({ select: (loc) => loc.pathname })

   const getActiveLink = (href: string) => {
      const fullPath = href === "/" ? "/dashboard" : `/dashboard${href}`

      if (pathname === fullPath) return true // exact match
      if (fullPath !== "/dashboard" && pathname.startsWith(fullPath + "/"))
         // nested routes only
         return true
      return false
   }

   return getActiveLink
}

export default useActiveLink
