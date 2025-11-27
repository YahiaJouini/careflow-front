import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot } from "lucide-react"

export const Route = createFileRoute("/dashboard/patient/chat")({
   component: AIHealthAssistantPage,
})

function AIHealthAssistantPage() {
   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6" />
                  <div>
                     <CardTitle>AI Health Assistant</CardTitle>
                     <CardDescription>
                        Get health guidance from our AI assistant
                     </CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
                  <Bot className="mb-4 h-16 w-16 opacity-20" />
                  <p className="text-lg font-medium">Coming Soon</p>
                  <p className="mt-2 text-sm">
                     AI Health Assistant is under development
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
