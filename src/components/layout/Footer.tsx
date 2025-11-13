export function Footer() {
   return (
      <footer className="border-border/50 border-t px-10 py-12">
         <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
               <div>
                  <h4 className="text-foreground mb-4 text-sm font-bold">
                     Product
                  </h4>
                  <ul className="text-muted-foreground space-y-3 text-sm">
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Features
                        </a>
                     </li>
                     <li>
                        <a
                           href="#pricing"
                           className="hover:text-primary transition-colors"
                        >
                           Pricing
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Security
                        </a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-foreground mb-4 text-sm font-bold">
                     Company
                  </h4>
                  <ul className="text-muted-foreground space-y-3 text-sm">
                     <li>
                        <a
                           href="#about"
                           className="hover:text-primary transition-colors"
                        >
                           About
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Blog
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Careers
                        </a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-foreground mb-4 text-sm font-bold">
                     Legal
                  </h4>
                  <ul className="text-muted-foreground space-y-3 text-sm">
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Privacy
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Terms
                        </a>
                     </li>
                     <li>
                        <a
                           href="#contact"
                           className="hover:text-primary transition-colors"
                        >
                           Contact
                        </a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-foreground mb-4 text-sm font-bold">
                     Follow
                  </h4>
                  <ul className="text-muted-foreground space-y-3 text-sm">
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Twitter
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           LinkedIn
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="hover:text-primary transition-colors"
                        >
                           Instagram
                        </a>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="border-border border-t pt-8 text-center">
               <p className="text-muted-foreground text-sm">
                  © 2025 CareFlow. All rights reserved. Your health, our
                  priority.
               </p>
            </div>
         </div>
      </footer>
   )
}
