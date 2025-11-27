import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { Hero } from "../components/landing/hero"
import { About } from "../components/landing/about"
import { Services } from "../components/landing/services"
import { Contact } from "../components/landing/contact"
import { useAuth } from "@/context/authContext"

export const Route = createFileRoute("/")({
   component: LandingPage,
})

function LandingPage() {
   const { user } = useAuth()
   console.log(user)
   return (
      <div className="bg-background min-h-screen">
         <Navbar />
         <Hero />
         <div id="about">
            <About />
         </div>
         <div id="services">
            <Services />
         </div>
         <div id="contact">
            <Contact />
         </div>
         <Footer />
      </div>
   )
}
