import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { getPublicSpecialties, getDoctors } from "@/api/public"
import { DoctorCard } from "@/components/doctors/DoctorCard"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export const Route = createFileRoute("/doctors")({
  component: DoctorsPage,
})

function DoctorsPage() {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("all")

  const { data: specialties, isLoading: loadingSpecialties } = useQuery({
    queryKey: ["specialties"],
    queryFn: getPublicSpecialties,
  })

  const { data: doctors, isLoading: loadingDoctors } = useQuery({
    queryKey: ["public-doctors", selectedSpecialtyId],
    queryFn: () => getDoctors(selectedSpecialtyId === "all" ? undefined : parseInt(selectedSpecialtyId)),
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Find a Doctor</h1>
            <p className="text-muted-foreground text-lg">
              Browse our network of qualified healthcare professionals
            </p>
          </div>

          {/* Filter Section */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Filter by Specialty</h2>
            </div>
            
            {loadingSpecialties ? (
              <Skeleton className="h-10 w-full max-w-xs" />
            ) : (
              <Select
                value={selectedSpecialtyId}
                onValueChange={setSelectedSpecialtyId}
              >
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select a specialty" />
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

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {loadingDoctors ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              `Showing ${doctors?.length || 0} ${doctors?.length === 1 ? "doctor" : "doctors"}`
            )}
          </div>

          {/* Doctor Grid */}
          {loadingDoctors ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[300px] w-full" />
              ))}
            </div>
          ) : doctors && doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No doctors found for this specialty
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
