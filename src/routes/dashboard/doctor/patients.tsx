import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export const Route = createFileRoute("/dashboard/doctor/patients")({
   component: PatientsPage,
})

function PatientsPage() {
   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                  <Users className="h-6 w-6" />
                  <div>
                     <CardTitle>My Patients</CardTitle>
                     <CardDescription>
                        View and manage your patients
                     </CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
                  <Users className="mb-4 h-16 w-16 opacity-20" />
                  <p className="text-lg font-medium">Coming Soon</p>
                  <p className="mt-2 text-sm">
                     Patient management feature is under development
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
