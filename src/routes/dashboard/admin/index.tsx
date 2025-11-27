import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import {
  Users,
  Stethoscope,
  ShieldCheck,
  Tag,
} from "lucide-react"
import { getAdminStats } from "@/api/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const Route = createFileRoute("/dashboard/admin/")({
  component: AdminOverview,
})

function AdminOverview() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: getAdminStats,
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          System overview and statistics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-8" /> : stats?.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Doctors
            </CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-8" /> : stats?.totalDoctors}
            </div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Doctors
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-8" /> : stats?.verifiedDoctors}
            </div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Specialties
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-8" /> : stats?.totalSpecialties}
            </div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
               <div className="flex items-center">
                  <div className="space-y-1">
                     <p className="text-sm font-medium leading-none">
                        Olivia Martin
                     </p>
                     <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                     </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
               </div>
               <div className="flex items-center">
                  <div className="space-y-1">
                     <p className="text-sm font-medium leading-none">
                        Jackson Lee
                     </p>
                     <p className="text-sm text-muted-foreground">
                        jackson.lee@email.com
                     </p>
                  </div>
                  <div className="ml-auto font-medium">+$39.00</div>
               </div>
               <div className="flex items-center">
                  <div className="space-y-1">
                     <p className="text-sm font-medium leading-none">
                        Isabella Nguyen
                     </p>
                     <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                     </p>
                  </div>
                  <div className="ml-auto font-medium">+$299.00</div>
               </div>
               <div className="flex items-center">
                  <div className="space-y-1">
                     <p className="text-sm font-medium leading-none">
                        William Kim
                     </p>
                     <p className="text-sm text-muted-foreground">
                        will@email.com
                     </p>
                  </div>
                  <div className="ml-auto font-medium">+$99.00</div>
               </div>
               <div className="flex items-center">
                  <div className="space-y-1">
                     <p className="text-sm font-medium leading-none">
                        Sofia Davis
                     </p>
                     <p className="text-sm text-muted-foreground">
                        sofia.davis@email.com
                     </p>
                  </div>
                  <div className="ml-auto font-medium">+$39.00</div>
               </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database</span>
                  <span className="text-sm text-green-500">Operational</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Gateway</span>
                  <span className="text-sm text-green-500">Operational</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-green-500">Operational</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email Service</span>
                  <span className="text-sm text-yellow-500">Degraded</span>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
