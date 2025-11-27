import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import ThemeProvider from "./context/themeContext"
import { GoogleOAuthProvider } from "@react-oauth/google"

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement)
   root.render(
      <StrictMode>
         <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <ThemeProvider>
               <App />
            </ThemeProvider>
         </GoogleOAuthProvider>
      </StrictMode>,
   )
}
