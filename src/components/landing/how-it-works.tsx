import { UserPlus, Search, Stethoscope } from "lucide-react"

const steps = [
  {
    title: "Create Account",
    description: "Sign up in minutes and build your digital health profile.",
    icon: UserPlus,
  },
  {
    title: "Find Specialist",
    description: "Browse verified doctors by specialty, rating, and availability.",
    icon: Search,
  },
  {
    title: "Get Treated",
    description: "Book an appointment and receive world-class care.",
    icon: Stethoscope,
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="wrapper">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your journey to better health is just three simple steps away.
          </p>
        </div>
        
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10" />
          
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center bg-background">
              <div className="h-24 w-24 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center mb-6 shadow-lg">
                <step.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
