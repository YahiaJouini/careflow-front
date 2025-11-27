import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, User } from "lucide-react"
import { getMyAppointments, cancelAppointment } from "@/api/patient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Loader from "@/components/global/Loader"
import { Appointment } from "@/types/appointment"

export const Route = createFileRoute("/dashboard/patient/appointments")({
  component: MyAppointments,
})

function MyAppointments() {
  const queryClient = useQueryClient()
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["patient", "appointments"],
    queryFn: getMyAppointments,
  })

  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      toast.success("Appointment cancelled successfully")
      queryClient.invalidateQueries({ queryKey: ["patient", "appointments"] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to cancel appointment")
    },
  })

  if (isLoading) return <Loader />

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Appointments</h2>
        <p className="text-muted-foreground">
          View and manage your scheduled appointments
        </p>
      </div>

      <div className="grid gap-6">
        {appointments?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No appointments found.
          </div>
        ) : (
          appointments?.map((appointment: Appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      Dr. {appointment.doctor?.user.firstName} {appointment.doctor?.user.lastName}
                    </CardTitle>
                    <CardDescription>
                      {appointment.doctor?.specialty.name}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
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
                {appointment.status !== "cancelled" && appointment.status !== "completed" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Cancel Appointment
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently cancel your appointment.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => cancelMutation.mutate(appointment.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Confirm Cancellation
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
