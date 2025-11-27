import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content: "CareFlow changed how I manage my family's health. The AI diagnosis was spot on and saved us an ER trip.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Michael Chen",
    role: "Patient",
    content: "Booking a specialist used to take weeks. With CareFlow, I saw a cardiologist the next day. Incredible service.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Dr. Emily Davis",
    role: "Pediatrician",
    content: "As a doctor, the platform is intuitive and helps me focus on patient care rather than administrative tasks.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&auto=format&fit=crop&q=60",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="wrapper">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our community has to say about their CareFlow experience.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
