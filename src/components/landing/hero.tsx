import GetStarted from "../global/GetStarted"

export function Hero() {
   return (
      <section className="from-background via-background relative min-h-screen overflow-hidden bg-gradient-to-br to-[#111b3d] pt-20">
         {/* Decorative gradient orbs */}
         <div className="bg-primary/10 absolute top-20 left-10 h-96 w-96 rounded-full opacity-30 blur-3xl"></div>
         <div className="bg-accent/10 absolute right-20 bottom-40 h-96 w-96 rounded-full opacity-20 blur-3xl"></div>

         <div className="relative z-10 mx-auto max-w-[1200px] px-10 py-32 text-center">
            <div className="mb-6 inline-block">
               <span className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium">
                  ✨ Welcome to Better Healthcare
               </span>
            </div>

            <h1 className="mb-8 text-5xl leading-tight font-bold text-balance md:text-6xl">
               <span className="from-primary via-accent to-primary bg-gradient-to-r bg-clip-text text-transparent">
                  Your Health, Our Priority
               </span>
            </h1>

            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg leading-relaxed">
               CareFlow brings healthcare to your fingertips. Get instant health
               insights powered by AI, book appointments with trusted
               professionals, and manage your complete medical history all in
               one secure place.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
               <GetStarted />
               <button className="border-accent/50 hover:border-accent text-accent hover:bg-accent/10 rounded-lg border px-8 py-3 font-semibold transition-all">
                  Watch Demo
               </button>
            </div>
         </div>
      </section>
   )
}
