export function About() {
    return (
        <section id="about" className="mx-auto max-w-[1200px] px-10 py-20">
            <h3 className="text-foreground mb-12 text-[32px] font-bold">
                About CareFlow
            </h3>

            <div className="space-y-8">
                <div>
                    <h4 className="text-primary mb-4 text-[18px] font-semibold">
                        Our Mission
                    </h4>
                    <p className="text-muted-foreground text-[16px] leading-relaxed">
                        We believe everyone deserves access to quality healthcare
                        without barriers. CareFlow is built to democratize healthcare
                        by combining the expertise of medical professionals with
                        cutting-edge AI technology. Our platform eliminates
                        geographical constraints and long wait times, bringing care
                        directly to you.
                    </p>
                </div>

                <div>
                    <h4 className="text-primary mb-4 text-[18px] font-semibold">
                        How It Works
                    </h4>
                    <p className="text-muted-foreground text-[16px] leading-relaxed">
                        Start by describing your symptoms to our AI health assistant.
                        Based on your input, you'll receive preliminary health
                        insights and recommendations. If needed, you can seamlessly
                        book an appointment with a qualified healthcare professional
                        for a thorough evaluation and personalized treatment plan.
                    </p>
                </div>

                <div>
                    <h4 className="text-primary mb-4 text-[18px] font-semibold">
                        Why Choose CareFlow
                    </h4>
                    <ul className="text-muted-foreground space-y-2 text-[16px] leading-relaxed">
                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span> Secure,
                            HIPAA-compliant platform protecting your privacy
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span> 24/7 access to AI
                            health insights and professional consultations
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span> Comprehensive
                            medical records management in one secure location
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span> Affordable
                            healthcare without hidden fees
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
