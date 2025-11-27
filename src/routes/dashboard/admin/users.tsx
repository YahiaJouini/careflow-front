import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
   getUsers,
   createUser,
   deleteUser,
   updateUserRole,
   verifyDoctor,
} from "@/api/admin"
import { getPublicSpecialties } from "@/api/public"
import { User, CreateUserInput } from "@/types/user"
import { Specialty } from "@/types/specialty"
import { PromoteToDoctorInput } from "@/types/doctor"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Loader from "@/components/global/Loader"

export const Route = createFileRoute("/dashboard/admin/users")({
   component: UsersPage,
})

function UsersPage() {
   const queryClient = useQueryClient()
   const [roleFilter, setRoleFilter] = useState<
      "doctor" | "patient" | undefined
   >(undefined)
   const [isCreateOpen, setIsCreateOpen] = useState(false)
   const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
   const [promotingUser, setPromotingUser] = useState<User | null>(null)

   // Fetch users
   const { data: users, isLoading } = useQuery({
      queryKey: ["admin", "users", roleFilter],
      queryFn: () => getUsers(roleFilter),
   })

   // Fetch specialties for doctor promotion
   const { data: specialties } = useQuery({
      queryKey: ["public", "specialties"],
      queryFn: getPublicSpecialties,
   })

   // Create user mutation
   const createMutation = useMutation({
      mutationFn: createUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
         setIsCreateOpen(false)
         toast.success("User created successfully")
      },
      onError: (error: any) => {
         toast.error(error.response?.data?.message || "Failed to create user")
      },
   })

   // Delete mutation
   const deleteMutation = useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
         setDeleteConfirm(null)
         toast.success("User deleted successfully")
      },
      onError: (error: any) => {
         toast.error(error.response?.data?.message || "Failed to delete user")
      },
   })

   // Verify doctor mutation
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

   // Update role mutation (promote/demote)
   const roleChangeMutation = useMutation({
      mutationFn: ({
         userId,
         data,
      }: {
         userId: number
         data: PromoteToDoctorInput
      }) => updateUserRole(userId, data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
         setPromotingUser(null)
         toast.success("User role updated successfully")
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || "Failed to update user role",
         )
      },
   })

   // Demote to patient
   const demoteMutation = useMutation({
      mutationFn: (userId: number) =>
         updateUserRole(userId, { role: "patient" }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
         toast.success("User demoted to patient")
      },
      onError: (error: any) => {
         toast.error(error.response?.data?.message || "Failed to demote user")
      },
   })

   if (isLoading) {
      return <Loader />
   }

   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <div className="flex flex-row items-center justify-between">
                  <div>
                     <CardTitle>User Management</CardTitle>
                     <CardDescription>
                        Manage users, doctors, and patients
                     </CardDescription>
                  </div>
                  <Button onClick={() => setIsCreateOpen(true)}>
                     Add User
                  </Button>
               </div>
               <div className="mt-4 flex gap-2">
                  <Button
                     variant={roleFilter === undefined ? "default" : "outline"}
                     onClick={() => setRoleFilter(undefined)}
                  >
                     All Users
                  </Button>
                  <Button
                     variant={roleFilter === "doctor" ? "default" : "outline"}
                     onClick={() => setRoleFilter("doctor")}
                  >
                     Doctors
                  </Button>
                  <Button
                     variant={roleFilter === "patient" ? "default" : "outline"}
                     onClick={() => setRoleFilter("patient")}
                  >
                     Patients
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {users?.map((user) => (
                        <TableRow key={user.id}>
                           <TableCell>{user.id}</TableCell>
                           <TableCell className="font-medium">
                              {user.firstName} {user.lastName}
                           </TableCell>
                           <TableCell>{user.email}</TableCell>
                           <TableCell>
                              <Badge
                                 variant={
                                    user.role === "admin"
                                       ? "destructive"
                                       : user.role === "doctor"
                                         ? "default"
                                         : "secondary"
                                 }
                              >
                                 {user.role}
                              </Badge>
                           </TableCell>
                           <TableCell>
                              <div className="flex gap-1">
                                 {user.verified && (
                                    <Badge variant="outline">Verified</Badge>
                                 )}
                                 {user.role === "doctor" &&
                                    user.doctor &&
                                    !user.doctor.isVerified && (
                                       <Badge variant="destructive">
                                          Unverified Doctor
                                       </Badge>
                                    )}
                              </div>
                           </TableCell>
                           <TableCell className="space-x-2 text-right">
                              {user.role === "doctor" &&
                                 user.doctor &&
                                 !user.doctor.isVerified && (
                                    <Button
                                       variant="default"
                                       size="sm"
                                       onClick={() =>
                                          verifyMutation.mutate(user.doctor!.id)
                                       }
                                       disabled={verifyMutation.isPending}
                                    >
                                       Verify
                                    </Button>
                                 )}
                              {user.role === "patient" && (
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPromotingUser(user)}
                                 >
                                    Promote to Doctor
                                 </Button>
                              )}
                              {user.role === "doctor" && (
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                       demoteMutation.mutate(user.id)
                                    }
                                    disabled={demoteMutation.isPending}
                                 >
                                    Demote to Patient
                                 </Button>
                              )}
                              <Button
                                 variant="destructive"
                                 size="sm"
                                 onClick={() => setDeleteConfirm(user.id)}
                              >
                                 Delete
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

         {/* Create User Modal */}
         <CreateUserDialog
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            onSubmit={(data) => createMutation.mutate(data)}
            isLoading={createMutation.isPending}
         />

         {/* Promote to Doctor Modal */}
         {promotingUser && (
            <PromoteToDoctorDialog
               open={true}
               onOpenChange={(open) => !open && setPromotingUser(null)}
               user={promotingUser}
               specialties={specialties || []}
               onSubmit={(data) =>
                  roleChangeMutation.mutate({ userId: promotingUser.id, data })
               }
               isLoading={roleChangeMutation.isPending}
            />
         )}

         {/* Delete Confirmation */}
         <Dialog
            open={deleteConfirm !== null}
            onOpenChange={() => setDeleteConfirm(null)}
         >
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                     Are you sure you want to delete this user? This action
                     cannot be undone.
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setDeleteConfirm(null)}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant="destructive"
                     onClick={() =>
                        deleteConfirm && deleteMutation.mutate(deleteConfirm)
                     }
                     disabled={deleteMutation.isPending}
                  >
                     {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   )
}

// Create User Dialog
interface CreateUserDialogProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   onSubmit: (data: CreateUserInput) => void
   isLoading: boolean
}

function CreateUserDialog({
   open,
   onOpenChange,
   onSubmit,
   isLoading,
}: CreateUserDialogProps) {
   const [formData, setFormData] = useState<CreateUserInput>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "patient",
   })

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create User</DialogTitle>
               <DialogDescription>
                  Add a new admin or patient user
               </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className="space-y-4 py-4">
                  <div className="space-y-2">
                     <Label htmlFor="firstName">First Name</Label>
                     <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              firstName: e.target.value,
                           })
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="lastName">Last Name</Label>
                     <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              lastName: e.target.value,
                           })
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                           setFormData({ ...formData, email: e.target.value })
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              password: e.target.value,
                           })
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="role">Role</Label>
                     <select
                        id="role"
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.role}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              role: e.target.value as "admin" | "patient",
                           })
                        }
                     >
                        <option value="patient">Patient</option>
                        <option value="admin">Admin</option>
                     </select>
                  </div>
               </div>
               <DialogFooter>
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => onOpenChange(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                     {isLoading ? "Creating..." : "Create"}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}

// Promote to Doctor Dialog
interface PromoteToDoctorDialogProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   user: User
   specialties: Specialty[]
   onSubmit: (data: PromoteToDoctorInput) => void
   isLoading: boolean
}

function PromoteToDoctorDialog({
   open,
   onOpenChange,
   user,
   specialties,
   onSubmit,
   isLoading,
}: PromoteToDoctorDialogProps) {
   const [formData, setFormData] = useState<PromoteToDoctorInput>({
      role: "doctor",
      specialtyId: specialties[0]?.id || 1,
      licenseNumber: "",
   })

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Promote to Doctor</DialogTitle>
               <DialogDescription>
                  Promote {user.firstName} {user.lastName} to doctor role
               </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className="space-y-4 py-4">
                  <div className="space-y-2">
                     <Label htmlFor="specialty">Specialty</Label>
                     <select
                        id="specialty"
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.specialtyId}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              specialtyId: parseInt(e.target.value),
                           })
                        }
                     >
                        {specialties.map((specialty) => (
                           <option key={specialty.id} value={specialty.id}>
                              {specialty.name}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="licenseNumber">License Number</Label>
                     <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              licenseNumber: e.target.value,
                           })
                        }
                        required
                     />
                  </div>
               </div>
               <DialogFooter>
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => onOpenChange(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                     {isLoading ? "Promoting..." : "Promote"}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
