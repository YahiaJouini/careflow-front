export function Pricing() {
   const plans = [
      {
         name: "Starter",
         price: "$29",
         period: "/month",
         description: "Perfect for getting started",
         features: [
            "AI Health Assessment",
            "Up to 3 appointments/month",
            "Medical records storage",
            "Email support",
            "Mobile app access",
         ],
         icon: "🚀",
         highlighted: false,
      },
      {
         name: "Professional",
         price: "$79",
         period: "/month",
         description: "Best for active users",
         features: [
            "Everything in Starter",
            "Unlimited appointments",
            "Priority booking",
            "Advanced health tracking",
            "24/7 phone support",
            "Prescription management",
         ],
         icon: "⭐",
         highlighted: true,
      },
      {
         name: "Family",
         price: "$149",
         period: "/month",
         description: "For 4 family members",
         features: [
            "Everything in Professional",
            "Up to 4 user accounts",
            "Family health dashboard",
            "Shared medical records",
            "Dedicated account manager",
            "Priority AI consultations",
         ],
         icon: "👨‍👩‍👧‍👦",
         highlighted: false,
      },
   ]

   return (
      <section
         id="pricing"
         className="border-border/50 via-primary/5 border-t bg-gradient-to-b from-transparent to-transparent px-10 py-24"
      >
         <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-4 text-center text-4xl font-bold">
               Simple, Transparent <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center">
               Choose the plan that works best for you. Cancel anytime, no
               hidden fees.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
               {plans.map((plan, idx) => (
                  <div
                     key={idx}
                     className={`relative rounded-xl border transition-all ${
                        plan.highlighted
                           ? "border-primary bg-card shadow-primary/20 transform shadow-xl md:scale-105"
                           : "border-border bg-card/50 hover:border-primary/30"
                     }`}
                  >
                     {plan.highlighted && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                           <span className="from-primary to-accent text-mainText rounded-full bg-gradient-to-r px-4 py-1 text-xs font-bold">
                              MOST POPULAR
                           </span>
                        </div>
                     )}

                     <div className="p-8">
                        <div className="mb-3 text-4xl">{plan.icon}</div>
                        <h3 className="text-foreground mb-2 text-2xl font-bold">
                           {plan.name}
                        </h3>
                        <p className="text-muted-foreground mb-6 text-sm">
                           {plan.description}
                        </p>

                        <div className="mb-6">
                           <span className="text-primary text-5xl font-bold">
                              {plan.price}
                           </span>
                           <span className="text-muted-foreground">
                              {plan.period}
                           </span>
                        </div>

                        <button
                           className={`mb-8 w-full rounded-lg py-3 font-semibold transition-all ${
                              plan.highlighted
                                 ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/30 hover:shadow-lg"
                                 : "border-primary/50 text-primary hover:border-primary hover:bg-primary/10 border"
                           }`}
                        >
                           Get Started
                        </button>

                        <div className="space-y-3">
                           {plan.features.map((feature, i) => (
                              <div key={i} className="flex items-start gap-3">
                                 <span className="text-green-600 font-bold mt-1">✓</span>
                                 <span className="text-muted-foreground text-sm">
                                    {feature}
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-16 text-center">
               <p className="text-muted-foreground mb-4">
                  Questions about our plans?
               </p>
               <button className="text-primary hover:text-primary/80 font-semibold underline">
                  Contact our sales team →
               </button>
            </div>
         </div>
      </section>
   )
}
