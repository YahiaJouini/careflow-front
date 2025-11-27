import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Calendar, Clock, User, CheckCircle } from "lucide-react"
import { getDoctorAppointments, validateAppointment } from "@/api/doctor"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Loader from "@/components/global/Loader"
import { Appointment } from "@/types/appointment"

export const Route = createFileRoute("/dashboard/doctor/schedule")({
  component: DoctorSchedule,
})

function DoctorSchedule() {
  const queryClient = useQueryClient()
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["doctor", "appointments"],
    queryFn: getDoctorAppointments,
  })

  const scheduledAppointments = appointments?.filter(
    (apt) => apt.status === "confirmed" || apt.status === "completed"
  ) || []

  const completeMutation = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      validateAppointment(id, { status: "completed" }),
    onSuccess: () => {
      toast.success("Appointment marked as completed")
      queryClient.invalidateQueries({ queryKey: ["doctor", "appointments"] })
      queryClient.invalidateQueries({ queryKey: ["doctor", "stats"] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to complete appointment")
    },
  })

  if (isLoading) return <Loader />

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "completed":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
        <p className="text-muted-foreground">
          Your upcoming and completed appointments
        </p>
      </div>

      <div className="grid gap-6">
        {scheduledAppointments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No scheduled appointments.
          </div>
        ) : (
          scheduledAppointments.map((appointment: Appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      {appointment.patient?.firstName} {appointment.patient?.lastName}
                    </CardTitle>
                    <CardDescription>
                      {appointment.status === "completed" ? "Visit Completed" : "Upcoming Visit"}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {format(new Date(appointment.appointmentDate), "PPP")}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {format(new Date(appointment.appointmentDate), "p")}
                </div>
                {appointment.reason && (
                  <div className="col-span-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Reason: </span>
                    {appointment.reason}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {appointment.status === "confirmed" && (
                  <Button 
                    size="sm"
                    onClick={() => completeMutation.mutate({ id: appointment.id })}
                    disabled={completeMutation.isPending}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Completed
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
