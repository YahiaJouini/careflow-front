import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { User } from "lucide-react"
import { PublicDoctor } from "@/types/doctor"
import { useAuth } from "@/context/authContext"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingDialog } from "./BookingDialog"

interface DoctorCardProps {
  doctor: PublicDoctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const { user, accessToken } = useAuth()
  const navigate = useNavigate()
  const [showBookingDialog, setShowBookingDialog] = useState(false)

  const handleBookClick = () => {
    // Check if user is authenticated
    if (!accessToken) {
      navigate({
        to: "/sign-in",
        search: { redirect: "/doctors" },
      })
      return
    }

    // Check if user is a patient
    if (user?.role !== "patient") {
      toast.error("Only patients can book appointments")
      return
    }

    // Open booking dialog for patients
    setShowBookingDialog(true)
  }

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
        <CardHeader className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold">
                Dr. {doctor.user.firstName} {doctor.user.lastName}
              </h3>
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <img 
                  src={doctor.specialty.icon} 
                  alt={doctor.specialty.name}
                  className="h-4 w-4 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {doctor.specialty.name}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {doctor.bio}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-4 border-t">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Consultation Fee</p>
            <p className="text-2xl font-bold text-primary">
              ${doctor.consultationFee}
            </p>
          </div>
          <Button 
            onClick={handleBookClick}
            disabled={!doctor.isAvailable}
          >
            {doctor.isAvailable ? "Book Appointment" : "Unavailable"}
          </Button>
        </CardFooter>
      </Card>

      {user?.role === "patient" && (
        <BookingDialog
          doctor={doctor}
          open={showBookingDialog}
          onOpenChange={setShowBookingDialog}
        />
      )}
    </>
  )
}
