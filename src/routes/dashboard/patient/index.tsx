import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Calendar, Search, Clock, Bot, User } from "lucide-react"
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
  ).sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()) || []

  const nextAppointment = upcomingAppointments[0]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Manage your health and appointments
        </p>
      </div>

      {/* Hero Card - Next Appointment */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />
           
           <CardHeader>
              <CardTitle className="text-lg font-medium opacity-90">Next Appointment</CardTitle>
           </CardHeader>
           <CardContent>
              {isLoading ? (
                 <div className="space-y-4">
                    <Skeleton className="h-8 w-48 bg-white/20" />
                    <Skeleton className="h-4 w-32 bg-white/20" />
                 </div>
              ) : nextAppointment ? (
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                       <h3 className="text-3xl font-bold">
                          Dr. {nextAppointment.doctor?.user.firstName} {nextAppointment.doctor?.user.lastName}
                       </h3>
                       <p className="text-xl opacity-90">
                          {nextAppointment.doctor?.specialty.name}
                       </p>
                       <div className="flex items-center gap-4 mt-4 text-sm font-medium">
                          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                             <Calendar className="h-4 w-4" />
                             {new Date(nextAppointment.appointmentDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                             <Clock className="h-4 w-4" />
                             {new Date(nextAppointment.appointmentDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                          </div>
                       </div>
                    </div>
                    <Button variant="secondary" size="lg" asChild className="shrink-0 font-bold">
                       <Link to="/dashboard/patient/appointments">
                          View Details
                       </Link>
                    </Button>
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
                    <Calendar className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-xl font-bold">No upcoming appointments</p>
                    <p className="opacity-80 mb-6">Book a consultation with a specialist today.</p>
                    <Button variant="secondary" asChild>
                       <Link to="/dashboard/patient/doctors">
                          Find a Doctor
                       </Link>
                    </Button>
                 </div>
              )}
           </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         <Link to="/dashboard/patient/doctors" className="group">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
               <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">Find a Doctor</CardTitle>
               </CardHeader>
               <CardContent>
                  <Search className="h-8 w-8 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                  <p className="text-sm text-muted-foreground">Browse specialists and book appointments</p>
               </CardContent>
            </Card>
         </Link>
         <Link to="/dashboard/patient/appointments" className="group">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
               <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">My Appointments</CardTitle>
               </CardHeader>
               <CardContent>
                  <Calendar className="h-8 w-8 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                  <p className="text-sm text-muted-foreground">View history and upcoming visits</p>
               </CardContent>
            </Card>
         </Link>
         <Link to="/dashboard/patient/chat" className="group">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
               <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">AI Assistant</CardTitle>
               </CardHeader>
               <CardContent>
                  <Bot className="h-8 w-8 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                  <p className="text-sm text-muted-foreground">Get instant health answers</p>
               </CardContent>
            </Card>
         </Link>
         <Link to="/dashboard/settings/profile" className="group">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
               <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">My Profile</CardTitle>
               </CardHeader>
               <CardContent>
                  <User className="h-8 w-8 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                  <p className="text-sm text-muted-foreground">Update personal info and settings</p>
               </CardContent>
            </Card>
         </Link>
      </div>
    </div>
  )
}
