export function Contact() {
    return (
        <section id="contact" className="mx-auto max-w-[1200px] px-10 py-20">
            <h3 className="text-foreground mb-4 text-[32px] font-bold">
                Get in Touch
            </h3>
            <p className="text-muted-foreground mb-8 text-[16px]">
                Have questions or feedback? We'd love to hear from you. Reach out to
                our team through any of the following channels.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="border-border bg-card/50 hover:border-primary/50 hover:shadow-primary/10 rounded-lg border p-6 transition-all hover:shadow-lg">
                    <div className="mb-3 text-[28px]">📧</div>
                    <h4 className="text-primary mb-2 text-[16px] font-semibold">
                        Email
                    </h4>
                    <p className="text-foreground text-[14px]">
                        support@careflow.health
                    </p>
                    <p className="text-muted-foreground mt-2 text-[12px]">
                        We respond within 24 hours
                    </p>
                </div>

                <div className="border-border bg-card/50 hover:border-primary/50 hover:shadow-primary/10 rounded-lg border p-6 transition-all hover:shadow-lg">
                    <div className="mb-3 text-[28px]">📱</div>
                    <h4 className="text-primary mb-2 text-[16px] font-semibold">
                        Phone
                    </h4>
                    <p className="text-foreground text-[14px]">1-800-CARE-FLOW</p>
                    <p className="text-muted-foreground mt-2 text-[12px]">
                        Available Mon-Fri, 9AM-6PM EST
                    </p>
                </div>

                <div className="border-border bg-card/50 hover:border-primary/50 hover:shadow-primary/10 rounded-lg border p-6 transition-all hover:shadow-lg">
                    <div className="mb-3 text-[28px]">💬</div>
                    <h4 className="text-primary mb-2 text-[16px] font-semibold">
                        Live Chat
                    </h4>
                    <p className="text-foreground text-[14px]">
                        Available on our app
                    </p>
                    <p className="text-muted-foreground mt-2 text-[12px]">
                        Chat with our team instantly
                    </p>
                </div>
            </div>
        </section>
    )
}
