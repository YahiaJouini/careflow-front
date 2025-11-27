import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import {
  Users,
  Calendar,
  DollarSign,
  UserPlus,
} from "lucide-react"
import { getDoctorStats } from "@/api/doctor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/doctor/")({
  component: DoctorOverview,
})

function DoctorOverview() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["doctor", "stats"],
    queryFn: getDoctorStats,
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your practice and performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-20" /> : `$${stats?.totalRevenue}`}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className={stats?.pendingRequests ? "border-orange-500/50 bg-orange-500/5" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <UserPlus className={`h-4 w-4 ${stats?.pendingRequests ? "text-orange-500" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats?.pendingRequests ? "text-orange-600" : ""}`}>
              {isLoading ? <Skeleton className="h-8 w-8" /> : stats?.pendingRequests}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.pendingRequests ? "Action required" : "All caught up"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-8" /> : stats?.upcomingAppointments}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-8" /> : stats?.totalPatients}
            </div>
            <p className="text-xs text-muted-foreground">
              +4 new patients this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
               <Calendar className="h-12 w-12 mb-4 opacity-20" />
               <p className="text-lg font-medium">No appointments today</p>
               <p className="text-sm">Enjoy your free time!</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
             <Button className="w-full justify-start" variant="outline" asChild>
                <Link to="/dashboard/doctor/requests">
                   <UserPlus className="mr-2 h-4 w-4" />
                   View Requests
                </Link>
             </Button>
             <Button className="w-full justify-start" variant="outline" asChild>
                <Link to="/dashboard/doctor/schedule">
                   <Calendar className="mr-2 h-4 w-4" />
                   Manage Schedule
                </Link>
             </Button>
             <Button className="w-full justify-start" variant="outline" asChild>
                <Link to="/dashboard/settings/profile">
                   <Users className="mr-2 h-4 w-4" />
                   Update Profile
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
