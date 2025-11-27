import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { Stethoscope } from "lucide-react"
import { PublicDoctor } from "@/types/doctor"
import { useAuth } from "@/context/authContext"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-12 w-12">
               <AvatarImage src={doctor.user.image} alt={doctor.user.firstName} />
               <AvatarFallback>
                  {doctor.user.firstName[0]}
                  {doctor.user.lastName[0]}
               </AvatarFallback>
            </Avatar>
            <div className="flex-1">
               <CardTitle className="text-lg">
                  Dr. {doctor.user.firstName} {doctor.user.lastName}
               </CardTitle>
               <CardDescription className="flex items-center gap-1">
                  {doctor.specialty.icon ? (
                     <img 
                        src={doctor.specialty.icon} 
                        alt={doctor.specialty.name}
                        className="h-4 w-4 object-contain"
                     />
                  ) : (
                     <Stethoscope className="h-4 w-4" />
                  )}
                  {doctor.specialty.name}
               </CardDescription>
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
