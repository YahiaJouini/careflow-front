import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="wrapper">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground shadow-xl overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Ready to Transform Your Health?
            </h2>
            <p className="text-primary-foreground/90 text-lg sm:text-xl max-w-2xl mx-auto">
              Join thousands of patients who have already taken control of their medical journey with CareFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="font-bold text-base h-12 px-8">
                <Link to="/sign-up">
                  Get Started Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-base h-12 px-8">
                <Link to="/doctors">
                  Find a Doctor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
