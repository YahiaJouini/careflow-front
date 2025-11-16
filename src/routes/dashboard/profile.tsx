import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/profile")({
    component: Profile,
})

export default function Profile() {
    return <div>User Profile Page</div>
}
