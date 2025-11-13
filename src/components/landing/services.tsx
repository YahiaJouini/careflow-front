export function Services() {
   const services = [
      {
         title: "AI Health Assistant",
         desc: "Describe your symptoms and get preliminary health insights powered by advanced AI.",
         icon: "🤖",
      },
      {
         title: "Book Appointments",
         desc: "Schedule consultations with licensed professionals and connect via video call.",
         icon: "📅",
      },
      {
         title: "Medical Records",
         desc: "Keep all your health data in one secure, organized location.",
         icon: "📋",
      },
      {
         title: "Treatment Plans",
         desc: "Receive personalized recommendations and track your progress effortlessly.",
         icon: "💊",
      },
      {
         title: "Health Tracking",
         desc: "Monitor vital signs and health metrics with real-time insights.",
         icon: "📊",
      },
      {
         title: "24/7 Support",
         desc: "Our team is always available to answer your questions.",
         icon: "🆘",
      },
   ]

   return (
      <section
         id="services"
         className="border-border/50 via-accent/5 border-t bg-gradient-to-b from-transparent to-transparent px-10 py-24"
      >
         <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-4 text-center text-4xl font-bold">
               What We <span className="text-primary">Offer</span>
            </h2>
            <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center">
               CareFlow provides a complete suite of healthcare services
               designed to make medical care accessible and convenient.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
               {services.map((service, idx) => (
                  <div
                     key={idx}
                     className="group bg-card border-border hover:border-primary/50 hover:shadow-primary/10 rounded-xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                     <div className="mb-4 text-4xl transition-transform group-hover:scale-110">
                        {service.icon}
                     </div>
                     <h3 className="text-primary mb-3 text-lg font-bold">
                        {service.title}
                     </h3>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}
