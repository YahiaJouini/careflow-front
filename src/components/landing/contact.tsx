export function Contact() {
   return (
      <section
         id="contact"
         className="border-border/50 mx-auto max-w-[1200px] border-t px-10 py-24"
      >
         <h2 className="mb-4 text-4xl font-bold">
            Get in <span className="text-primary">Touch</span>
         </h2>
         <p className="text-muted-foreground mb-12 max-w-2xl">
            Have questions or feedback? We'd love to hear from you. Reach out to
            our team through any of the following channels.
         </p>

         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-card border-border hover:border-primary/50 hover:shadow-primary/10 rounded-xl border p-8 transition-all hover:shadow-lg">
               <div className="mb-4 text-4xl">📧</div>
               <h3 className="text-primary mb-2 text-lg font-bold">Email</h3>
               <p className="text-foreground mb-1">support@careflow.health</p>
               <p className="text-muted-foreground text-sm">
                  We respond within 24 hours
               </p>
            </div>

            <div className="bg-card border-border hover:border-primary/50 hover:shadow-primary/10 rounded-xl border p-8 transition-all hover:shadow-lg">
               <div className="mb-4 text-4xl">📱</div>
               <h3 className="text-primary mb-2 text-lg font-bold">Phone</h3>
               <p className="text-foreground mb-1">1-800-CARE-FLOW</p>
               <p className="text-muted-foreground text-sm">
                  Mon-Fri, 9AM-6PM EST
               </p>
            </div>

            <div className="bg-card border-border hover:border-primary/50 hover:shadow-primary/10 rounded-xl border p-8 transition-all hover:shadow-lg">
               <div className="mb-4 text-4xl">💬</div>
               <h3 className="text-primary mb-2 text-lg font-bold">
                  Live Chat
               </h3>
               <p className="text-foreground mb-1">Available on our app</p>
               <p className="text-muted-foreground text-sm">
                  Chat instantly with our team
               </p>
            </div>
         </div>
      </section>
   )
}
