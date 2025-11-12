import GetStarted from "../global/GetStarted"

export function Navbar() {
    const scrollToSection = (sectionId: string) => {
        const el = document.getElementById(sectionId)
        el?.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <nav className="border-border bg-background fixed top-0 right-0 left-0 z-50 flex h-[70px] items-center justify-between border-b px-10">
            <h1 className="text-primary text-[22px] font-bold">CareFlow</h1>

            <div className="flex items-center gap-8">
                {["about", "services", "contact"].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className="text-muted-foreground hover:text-primary text-[14px] font-medium capitalize transition-colors"
                    >
                        {item}
                    </button>
                ))}
                <GetStarted />
            </div>
        </nav>
    )
}
