import { Link } from "@tanstack/react-router"
import { useAuth } from "../../context/authContext"
import { cn } from "@/lib/utils"

export default function GetStarted({ text }: { text?: string }) {
   const { user } = useAuth()
   return (
      <Link
         to="/sign-in"
         className={cn("bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/30 rounded-sm px-6 py-2 font-semibold",{
            "text-sm": text,
         })}
      >
         {user ? "Dashboard" : (text ?? "Get Started")}
      </Link>
   )
}