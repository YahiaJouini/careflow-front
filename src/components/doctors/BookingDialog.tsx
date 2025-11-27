import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { toast } from "sonner"
import { createAppointment } from "@/api/patient"
import { PublicDoctor } from "@/types/doctor"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface BookingDialogProps {
  doctor: PublicDoctor
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingDialog({ doctor, open, onOpenChange }: BookingDialogProps) {
  const [date, setDate] = useState<Date>()
  const [reason, setReason] = useState("")

  const { mutate: bookAppointment, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success("Appointment requested successfully!")
      onOpenChange(false)
      setDate(undefined)
      setReason("")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to book appointment")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !reason.trim()) {
      toast.error("Please select a date and provide a reason")
      return
    }

    bookAppointment({
      doctorId: doctor.id,
      appointmentDate: date.toISOString(),
      reason: reason.trim(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment with Dr. {doctor.user.firstName} {doctor.user.lastName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Appointment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Textarea
              id="reason"
              placeholder="Please describe your symptoms or reason for consultation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
