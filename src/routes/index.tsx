import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { Hero } from "../components/landing/hero"
import { Features } from "../components/landing/features"
import { HowItWorks } from "../components/landing/how-it-works"
import { Stats } from "../components/landing/stats"
import { Testimonials } from "../components/landing/testimonials"
import { CTA } from "../components/landing/cta"
import { Pricing } from "@/components/landing/pricing"

export const Route = createFileRoute("/")({
   component: LandingPage,
})

function LandingPage() {
   return (
      <div className="bg-background min-h-screen">
         <Navbar />
         <main>
            <div id="home">
               <Hero />
            </div>
            <Stats />
            <div id="features">
               <Features />
            </div>
            <div id="how-it-works">
               <HowItWorks />
            </div>
            <div id="pricing">
               <Pricing />
            </div>
            <Testimonials />
            <CTA />
         </main>
         <Footer />
      </div>
   )
}
