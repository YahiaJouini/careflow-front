import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { Hero } from "../components/landing/hero"
import { About } from "../components/landing/about"
import { Services } from "../components/landing/services"
import { Contact } from "../components/landing/contact"

export const Route = createFileRoute("/")({
    component: LandingPage,
})

function LandingPage() {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Contact />
            <Footer />
        </div>
    )
}
