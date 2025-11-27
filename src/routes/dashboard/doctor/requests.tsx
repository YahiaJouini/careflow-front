import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Check, X, Calendar, Clock, User } from "lucide-react"
import { getDoctorAppointments, validateAppointment, rejectAppointment } from "@/api/doctor"
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
import Loader from "@/components/global/Loader"
import { Appointment } from "@/types/appointment"

export const Route = createFileRoute("/dashboard/doctor/requests")({
  component: PatientRequests,
})

function PatientRequests() {
  const queryClient = useQueryClient()
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["doctor", "appointments"],
    queryFn: getDoctorAppointments,
  })

  const pendingAppointments = appointments?.filter(
    (apt) => apt.status === "pending"
  ) || []

  const validateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: "confirmed" | "completed" }) =>
      validateAppointment(id, { status }),
    onSuccess: () => {
      toast.success("Appointment confirmed successfully")
      queryClient.invalidateQueries({ queryKey: ["doctor", "appointments"] })
      queryClient.invalidateQueries({ queryKey: ["doctor", "stats"] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to confirm appointment")
    },
  })

  const rejectMutation = useMutation({
    mutationFn: rejectAppointment,
    onSuccess: () => {
      toast.success("Appointment rejected successfully")
      queryClient.invalidateQueries({ queryKey: ["doctor", "appointments"] })
      queryClient.invalidateQueries({ queryKey: ["doctor", "stats"] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to reject appointment")
    },
  })

  if (isLoading) return <Loader />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Patient Requests</h2>
        <p className="text-muted-foreground">
          Review and manage pending appointment requests
        </p>
      </div>

      <div className="grid gap-6">
        {pendingAppointments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No pending requests.
          </div>
        ) : (
          pendingAppointments.map((appointment: Appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      {appointment.patient?.firstName} {appointment.patient?.lastName}
                    </CardTitle>
                    <CardDescription>
                      Requesting appointment
                    </CardDescription>
                  </div>
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => rejectMutation.mutate(appointment.id)}
                  disabled={rejectMutation.isPending || validateMutation.isPending}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  size="sm"
                  onClick={() => validateMutation.mutate({ id: appointment.id, status: "confirmed" })}
                  disabled={rejectMutation.isPending || validateMutation.isPending}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Accept
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
