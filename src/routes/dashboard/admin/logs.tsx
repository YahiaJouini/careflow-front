import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scroll } from "lucide-react"

export const Route = createFileRoute("/dashboard/admin/logs")({
   component: SystemLogsPage,
})

function SystemLogsPage() {
   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                  <Scroll className="h-6 w-6" />
                  <div>
                     <CardTitle>System Logs</CardTitle>
                     <CardDescription>
                        View system activity and audit logs
                     </CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
                  <Scroll className="mb-4 h-16 w-16 opacity-20" />
                  <p className="text-lg font-medium">Coming Soon</p>
                  <p className="mt-2 text-sm">
                     System logs feature is under development
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
