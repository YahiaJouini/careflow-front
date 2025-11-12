import { Link } from "@tanstack/react-router"
import { useAuth } from "../../context/authContext"

export default function GetStarted() {
    const { user } = useAuth()
    return (
        <Link
            to="/sign-in"
            className="bg-primary text-primary-foreground hover:bg-opacity-90 hover:shadow-primary/20 rounded-md px-5 py-2.5 text-[14px] font-semibold transition-all hover:shadow-lg"
        >
            {user ? "Dashboard" : "Get Started"}
        </Link>
    )
}
