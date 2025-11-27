import { useAuth } from "@/context/authContext"
import { DASHBOARD_LINKS, UserRole } from "@/config/navigation"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function Sidebar() {
   const { user, logout, isLoading } = useAuth()
   const [isOpen, setIsOpen] = useState(true)

   if (isLoading) {
      return (
         <aside
            className={cn(
               "text-muted-foreground border-mainText/30 fixed top-0 left-0 flex h-screen flex-col border-r transition-all",
               isOpen ? "w-64" : "w-20",
            )}
         >
            <div className="border-lightBg flex items-center justify-between border-b px-4 py-6">
               <Skeleton className="h-8 w-32" />
            </div>
            <div className="flex flex-1 flex-col gap-2 px-3 py-6">
               {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
               ))}
            </div>
            <div className="border-lightBg border-t p-4">
               <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-3 w-32" />
                  </div>
               </div>
            </div>
         </aside>
      )
   }

   if (!user) return null

   const items = DASHBOARD_LINKS[user.role as UserRole] || []


   return (
      <>
         <aside
            className={cn(
               "text-muted-foreground border-mainText/30 fixed top-0 left-0 flex h-screen flex-col border-r transition-all",
               isOpen ? "w-64" : "w-20",
            )}
         >
            {/* HEADER */}
            <div className="border-lightBg flex items-center justify-between border-b px-4 py-6">
               {isOpen && (
                  <h1 className="text-mainText text-lg font-bold">CareFlow</h1>
               )}
               <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-mainText hover:bg-lightBg rounded-lg p-1.5"
               >
                  {isOpen ? <ChevronLeft /> : <ChevronRight />}
               </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 px-3 py-6">
               {items.map((item) => {
                  const Icon = item.icon

                  return (
                     <Link
                        to={item.href as any}
                        key={item.href}
                        className="text-mainText flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold hover:bg-lightBg"
                        activeProps={{
                           className: "bg-theme pointer-events-none text-white"
                        }}
                        activeOptions={{
                           exact: true
                        }}
                        title={!isOpen ? item.label : undefined}
                     >
                        <Icon className="h-5 w-5" />
                        {isOpen && <span>{item.label}</span>}
                     </Link>
                  )
               })}
            </nav>

            {/* FOOTER */}
            <div className="border-lightBg border-t p-4">
               <div className="flex items-center gap-3 px-2">
            <Avatar>
              <AvatarImage src={user?.image} alt={user?.firstName} />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            {isOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {user?.role}
              </span>
            </div>
            )}
          </div>

               {isOpen && (
                  <button
                     onClick={logout}
                     className="flex w-full items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
                  >
                     <LogOut className="h-4 w-4" />
                     Logout
                  </button>
               )}
            </div>
         </aside>

         <div
            className="transition-all"
            style={{ width: isOpen ? "16rem" : "5rem" }}
         />
      </>
   )
}
