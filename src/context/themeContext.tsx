import React, { createContext, useState } from "react"
import { Theme } from "../types/global"

type ThemeContext = {
   theme: Theme
   setTheme: (theme: Theme) => void
}

const context = createContext<null | ThemeContext>(null)

export default function ThemeProvider({
   children,
}: {
   children: React.ReactNode
}) {
   const [theme, setTheme] = useState<Theme>("light")

   return (
      <context.Provider
         value={{
            theme,
            setTheme,
         }}
      >
         {children}
      </context.Provider>
   )
}

export function useTheme() {
   const ctx = React.useContext(context)
   if (!ctx) {
      throw new Error("useTheme must be used within a ThemeProvider")
   }
   return ctx
}
