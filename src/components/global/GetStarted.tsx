import { Link } from "@tanstack/react-router"
import { useAuth } from "../../context/authContext"

export default function GetStarted({ text }: { text?: string }) {
   const { user } = useAuth()
   return (
      <Link
         to="/sign-in"
         className="bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/30 rounded-lg px-8 py-3 font-semibold transition-all hover:shadow-lg"
      >
         {user ? "Dashboard" : (text ?? "Get Started")}
      </Link>
   )
}
