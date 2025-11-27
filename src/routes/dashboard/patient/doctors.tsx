import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { getPublicSpecialties, getDoctors } from "@/api/public"
import { DoctorCard } from "@/components/doctors/DoctorCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { PublicDoctor } from "@/types/doctor"

export const Route = createFileRoute("/dashboard/patient/doctors")({
  component: PatientDoctorsPage,
})

function PatientDoctorsPage() {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { data: specialties, isLoading: loadingSpecialties } = useQuery({
    queryKey: ["specialties"],
    queryFn: getPublicSpecialties,
  })

  const { data: doctors, isLoading: loadingDoctors } = useQuery({
    queryKey: ["doctors", selectedSpecialtyId],
    queryFn: () => getDoctors(selectedSpecialtyId === "all" ? undefined : parseInt(selectedSpecialtyId)),
  })

  // Client-side search filter
  const filteredDoctors = doctors?.filter((doctor: PublicDoctor) => {
    const fullName = `${doctor.user.firstName} ${doctor.user.lastName}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
  }) || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Find a Doctor</h2>
        <p className="text-muted-foreground">
          Browse and book appointments with our specialists
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="w-full md:w-[250px]">
          {loadingSpecialties ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select
              value={selectedSpecialtyId}
              onValueChange={setSelectedSpecialtyId}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties?.map((specialty) => (
                  <SelectItem key={specialty.id} value={specialty.id.toString()}>
                    <div className="flex items-center gap-2">
                      <img 
                        src={specialty.icon} 
                        alt={specialty.name}
                        className="h-4 w-4 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {specialty.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {loadingDoctors ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[300px] w-full" />
          ))}
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor: PublicDoctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No doctors found matching your criteria.
        </div>
      )}
    </div>
  )
}
