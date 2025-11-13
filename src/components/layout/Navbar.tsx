import GetStarted from "../global/GetStarted"

export function Navbar() {
   const scrollToSection = (sectionId: string) => {
      const el = document.getElementById(sectionId)
      el?.scrollIntoView({ behavior: "smooth" })
   }

   return (
      <nav className="border-border/50 bg-background/80 fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b px-10 backdrop-blur-md">
         <h1 className="text-primary text-2xl font-bold">CareFlow</h1>

         <div className="flex items-center gap-8">
            {["about", "services", "pricing", "contact"].map((item) => (
               <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium capitalize transition-colors"
               >
                  {item}
               </button>
            ))}
            <GetStarted text="Sign in" />
         </div>
      </nav>
   )
}
