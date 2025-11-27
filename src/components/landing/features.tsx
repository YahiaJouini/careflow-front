import { Brain, Calendar, Shield, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "AI Symptom Analysis",
    description: "Get instant preliminary diagnosis powered by advanced AI algorithms.",
    icon: Brain,
  },
  {
    title: "Instant Doctor Booking",
    description: "Find and book appointments with top specialists in seconds.",
    icon: Calendar,
  },
  {
    title: "Secure Medical Records",
    description: "Your health data is encrypted and stored with bank-grade security.",
    icon: Shield,
  },
  {
    title: "Real-time Chat",
    description: "Connect with your doctor anytime for quick follow-ups and questions.",
    icon: MessageSquare,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="wrapper">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Advanced Healthcare Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of medical care with our cutting-edge platform designed for your well-being.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
