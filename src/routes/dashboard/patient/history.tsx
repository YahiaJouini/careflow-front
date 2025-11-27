import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export const Route = createFileRoute("/dashboard/patient/history")({
   component: MedicalHistoryPage,
})

function MedicalHistoryPage() {
   return (
      <div className="">
         <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <div>
                     <CardTitle>Medical History</CardTitle>
                     <CardDescription>
                        View your medical records and history
                     </CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
                  <FileText className="mb-4 h-16 w-16 opacity-20" />
                  <p className="text-lg font-medium">Coming Soon</p>
                  <p className="mt-2 text-sm">
                     Medical history feature is under development
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
