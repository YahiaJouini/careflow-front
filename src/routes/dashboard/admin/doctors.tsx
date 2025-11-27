import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUsers, verifyDoctor } from "@/api/admin"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Loader from "@/components/global/Loader"

export const Route = createFileRoute("/dashboard/admin/doctors")({
   component: DoctorsPage,
})

function DoctorsPage() {
   const queryClient = useQueryClient()

   const { data: doctors, isLoading } = useQuery({
      queryKey: ["admin", "users", "doctor"],
      queryFn: () => getUsers("doctor"),
   })

   const verifyMutation = useMutation({
      mutationFn: verifyDoctor,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
         toast.success("Doctor verified successfully")
      },
      onError: (error: any) => {
         toast.error(error.response?.data?.message || "Failed to verify doctor")
      },
   })

   if (isLoading) {
      return <Loader />
   }

   return (
      <div>
         <Card>
            <CardHeader>
               <CardTitle>Doctor Management</CardTitle>
               <CardDescription>
                  Manage and verify doctors in the system
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>License</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {doctors?.map((doctor) => (
                        <TableRow key={doctor.id}>
                           <TableCell>{doctor.id}</TableCell>
                           <TableCell className="font-medium">
                              {doctor.firstName} {doctor.lastName}
                           </TableCell>
                           <TableCell>{doctor.email}</TableCell>
                           <TableCell>
                              {doctor.doctor?.specialty?.name || "N/A"}
                           </TableCell>
                           <TableCell>
                              {doctor.doctor?.licenseNumber || "N/A"}
                           </TableCell>
                           <TableCell>
                              {doctor.doctor?.isVerified ? (
                                 <Badge variant="outline">Verified</Badge>
                              ) : (
                                 <Badge variant="destructive">Unverified</Badge>
                              )}
                           </TableCell>
                           <TableCell className="text-right">
                              {doctor.doctor && !doctor.doctor.isVerified && (
                                 <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() =>
                                       verifyMutation.mutate(doctor.doctor!.id)
                                    }
                                    disabled={verifyMutation.isPending}
                                 >
                                    Verify
                                 </Button>
                              )}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
   )
}
