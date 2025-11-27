export function Stats() {
  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold tracking-tight">10k+</span>
            <span className="text-primary-foreground/80 font-medium">Happy Patients</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold tracking-tight">500+</span>
            <span className="text-primary-foreground/80 font-medium">Verified Doctors</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold tracking-tight">24/7</span>
            <span className="text-primary-foreground/80 font-medium">Medical Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
