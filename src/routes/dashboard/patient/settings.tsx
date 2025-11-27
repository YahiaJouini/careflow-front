import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export const Route = createFileRoute("/dashboard/patient/settings")({
   component: SettingsPage,
})

function SettingsPage() {
   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6" />
                  <div>
                     <CardTitle>Settings</CardTitle>
                     <CardDescription>
                        Manage your account preferences
                     </CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
                  <Settings className="mb-4 h-16 w-16 opacity-20" />
                  <p className="text-lg font-medium">Coming Soon</p>
                  <p className="mt-2 text-sm">
                     Settings management is under development
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
