import GetStarted from "../global/GetStarted"

export function Hero() {
    return (
        <section className="border-border from-background to-background/80 border-b bg-gradient-to-b px-10 pt-[120px] pb-20 text-center">
            <h2 className="text-foreground mb-4 text-[44px] font-bold">
                Your Health, Our Priority
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-[600px] text-[16px] leading-relaxed">
                CareFlow brings healthcare to your fingertips. Get instant health
                insights powered by AI, book appointments with trusted
                professionals, and manage your complete medical history all in one
                place.
            </p>
            <GetStarted />
        </section>
    )
}
