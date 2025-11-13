export function About() {
   return (
      <section id="about" className="mx-auto max-w-[1200px] px-10 py-20">
         <h2 className="text-foreground mb-16 text-4xl font-bold">
            About <span className="text-primary">CareFlow</span>
         </h2>

         <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-card border-border rounded-xl border p-8">
               <div className="mb-4 text-3xl">🎯</div>
               <h3 className="text-primary mb-3 text-xl font-bold">
                  Our Mission
               </h3>
               <p className="text-muted-foreground leading-relaxed">
                  We believe everyone deserves access to quality healthcare
                  without barriers. CareFlow democratizes healthcare by
                  combining medical expertise with AI technology.
               </p>
            </div>

            <div className="bg-card border-border rounded-xl border p-8">
               <div className="mb-4 text-3xl">⚙️</div>
               <h3 className="text-primary mb-3 text-xl font-bold">
                  How It Works
               </h3>
               <p className="text-muted-foreground leading-relaxed">
                  Describe your symptoms to our AI assistant, receive
                  preliminary insights, and seamlessly book appointments with
                  qualified professionals for personalized care.
               </p>
            </div>

            <div className="bg-card border-border rounded-xl border p-8">
               <div className="mb-4 text-3xl">✨</div>
               <h3 className="text-primary mb-3 text-xl font-bold">
                  Why Choose Us
               </h3>
               <ul className="text-muted-foreground space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                     <span className="text-accent">✓</span> HIPAA-compliant
                     security
                  </li>
                  <li className="flex items-center gap-2">
                     <span className="text-accent">✓</span> 24/7 access to care
                  </li>
                  <li className="flex items-center gap-2">
                     <span className="text-accent">✓</span> Affordable pricing
                  </li>
               </ul>
            </div>
         </div>
      </section>
   )
}
