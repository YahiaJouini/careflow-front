import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Calendar, Search } from "lucide-react"
import { getMyAppointments } from "@/api/patient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export const Route = createFileRoute("/dashboard/patient/")({
  component: PatientOverview,
})

function PatientOverview() {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["patient", "appointments"],
    queryFn: getMyAppointments,
  })

  const upcomingAppointments = appointments?.filter(
    (apt) => apt.status === "confirmed" && new Date(apt.appointmentDate) > new Date()
  ) || []

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Manage your health and appointments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-8" /> : upcomingAppointments.length}
            </div>
          </CardContent>
        </Card>
        {/* Add more stats if needed */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild className="flex-1 h-24 flex-col gap-2" variant="outline">
              <Link to="/dashboard/patient/doctors">
                <Search className="h-6 w-6" />
                Find a Doctor
              </Link>
            </Button>
            <Button asChild className="flex-1 h-24 flex-col gap-2" variant="outline">
              <Link to="/dashboard/patient/appointments">
                <Calendar className="h-6 w-6" />
                My Appointments
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
