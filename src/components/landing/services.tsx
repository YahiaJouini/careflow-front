export function Services() {
    const services = [
        {
            title: "AI Health Assistant",
            desc: "Describe your symptoms and get preliminary health insights powered by advanced AI. Our system analyzes your input and provides evidence-based recommendations.",
            icon: "🤖",
        },
        {
            title: "Book Appointments",
            desc: "Schedule consultations with licensed healthcare professionals. Choose your preferred time slot and connect via video call from the comfort of your home.",
            icon: "📅",
        },
        {
            title: "Medical Records",
            desc: "Keep all your health data in one secure, organized place. Access prescriptions, test results, and medical history anytime.",
            icon: "📋",
        },
        {
            title: "Treatment Plans",
            desc: "Receive personalized treatment recommendations from doctors. Track your progress and follow up on prescriptions effortlessly.",
            icon: "💊",
        },
        {
            title: "Health Tracking",
            desc: "Monitor your vital signs and health metrics over time. Share data with your healthcare provider for better-informed decisions.",
            icon: "📊",
        },
        {
            title: "24/7 Support",
            desc: "Need help? Our support team is always available to answer questions about your health journey and platform usage.",
            icon: "🆘",
        },
    ]

    return (
        <section
            id="services"
            className="border-border bg-card/30 border-y px-10 py-20"
        >
            <div className="mx-auto max-w-[1200px]">
                <h3 className="text-foreground mb-4 text-center text-[32px] font-bold">
                    What We Do
                </h3>
                <p className="text-muted-foreground mb-12 text-center text-[16px]">
                    CareFlow offers a complete suite of healthcare services designed
                    to make medical care accessible, affordable, and convenient.
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="border-border bg-card/50 hover:shadow-primary/10 hover:border-primary/50 rounded-lg border p-6 shadow-sm transition-all hover:shadow-lg"
                        >
                            <div className="mb-3 text-[32px]">{service.icon}</div>
                            <h4 className="text-primary mb-3 text-[18px] font-semibold">
                                {service.title}
                            </h4>
                            <p className="text-muted-foreground text-[14px] leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
