import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
   getAdminSpecialties,
   createSpecialty,
   updateSpecialty,
   deleteSpecialty,
} from "@/api/admin"
import { Specialty, CreateSpecialtyInput } from "@/types/specialty"
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
import { toast } from "sonner"
import Loader from "@/components/global/Loader"

export const Route = createFileRoute("/dashboard/admin/specialties")({
   component: SpecialtiesPage,
})

function SpecialtiesPage() {
   const queryClient = useQueryClient()
   const [isCreateOpen, setIsCreateOpen] = useState(false)
   const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
      null,
   )
   const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

   // Fetch specialties
   const { data: specialties, isLoading } = useQuery({
      queryKey: ["admin", "specialties"],
      queryFn: getAdminSpecialties,
   })

   // Create mutation
   const createMutation = useMutation({
      mutationFn: createSpecialty,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "specialties"] })
         setIsCreateOpen(false)
         toast.success("Specialty created successfully")
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || "Failed to create specialty",
         )
      },
   })

   // Update mutation
   const updateMutation = useMutation({
      mutationFn: ({ id, data }: { id: number; data: CreateSpecialtyInput }) =>
         updateSpecialty(id, data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "specialties"] })
         setEditingSpecialty(null)
         toast.success("Specialty updated successfully")
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || "Failed to update specialty",
         )
      },
   })

   // Delete mutation
   const deleteMutation = useMutation({
      mutationFn: deleteSpecialty,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admin", "specialties"] })
         setDeleteConfirm(null)
         toast.success("Specialty deleted successfully")
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || "Failed to delete specialty",
         )
      },
   })

   if (isLoading) {
      return <Loader />
   }

   return (
      <div className="">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Specialties Management</CardTitle>
                  <CardDescription>Manage medical specialties</CardDescription>
               </div>
               <Button onClick={() => setIsCreateOpen(true)}>
                  Add Specialty
               </Button>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {specialties?.map((specialty) => (
                        <TableRow key={specialty.id}>
                           <TableCell>{specialty.id}</TableCell>
                           <TableCell>
                              <img 
                                 src={specialty.icon} 
                                 alt={specialty.name}
                                 className="h-8 w-8 object-contain"
                                 onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                 }}
                              />
                           </TableCell>
                           <TableCell className="font-medium">
                              {specialty.name}
                           </TableCell>
                           <TableCell>{specialty.description}</TableCell>
                           <TableCell className="space-x-2 text-right">
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => setEditingSpecialty(specialty)}
                              >
                                 Edit
                              </Button>
                              <Button
                                 variant="destructive"
                                 size="sm"
                                 onClick={() => setDeleteConfirm(specialty.id)}
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

         {/* Create Modal */}
         <SpecialtyFormDialog
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            onSubmit={(data) => createMutation.mutate(data)}
            isLoading={createMutation.isPending}
            title="Create Specialty"
            description="Add a new medical specialty"
         />

         {/* Edit Modal */}
         {editingSpecialty && (
            <SpecialtyFormDialog
               open={true}
               onOpenChange={(open) => !open && setEditingSpecialty(null)}
               onSubmit={(data) =>
                  updateMutation.mutate({ id: editingSpecialty.id, data })
               }
               isLoading={updateMutation.isPending}
               title="Edit Specialty"
               description="Update specialty information"
               initialValues={editingSpecialty}
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
                     Are you sure you want to delete this specialty? This action
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

// Form Dialog Component
interface SpecialtyFormDialogProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   onSubmit: (data: CreateSpecialtyInput) => void
   isLoading: boolean
   title: string
   description: string
   initialValues?: Specialty
}

function SpecialtyFormDialog({
   open,
   onOpenChange,
   onSubmit,
   isLoading,
   title,
   description,
   initialValues,
}: SpecialtyFormDialogProps) {
   const [formData, setFormData] = useState<CreateSpecialtyInput>({
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      icon: initialValues?.icon || "",
   })

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className="space-y-4 py-4">
                  <div className="space-y-2">
                     <Label htmlFor="name">Name</Label>
                     <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                           setFormData({ ...formData, name: e.target.value })
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="description">Description</Label>
                     <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              description: e.target.value,
                           })
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="icon">Icon URL</Label>
                     <Input
                        id="icon"
                        value={formData.icon}
                        onChange={(e) =>
                           setFormData({ ...formData, icon: e.target.value })
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
                     {isLoading ? "Saving..." : "Save"}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
