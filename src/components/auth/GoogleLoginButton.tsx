import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "@/components/ui/button"
import { googleLogin, verifySession } from "@/api/auth"
import { useAuth } from "@/context/authContext"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { USER_QUERY_KEY } from "@/lib/constants"

export default function GoogleLoginButton() {
   const { setAccessToken } = useAuth()
   const navigate = useNavigate()
   const queryClient = useQueryClient()

   const login = useGoogleLogin({
      flow: 'auth-code',
      onSuccess: async (codeResponse) => {
         try {
            const res = await googleLogin(codeResponse.code)
            
            setAccessToken(res.data.tokens.accessToken)
            queryClient.setQueryData([USER_QUERY_KEY], res.data.user)
            
            // Trigger server-side verification
            await verifySession()
            
            navigate({ to: "/dashboard" })
            toast.success("Logged in with Google")
         } catch (error) {
            console.error(error)
            toast.error("Google login failed")
         }
      },
      onError: () => {
         toast.error("Google login failed")
      }
   })

   return (
      <Button 
         variant="outline" 
         className="w-full" 
         onClick={() => {
            console.log("Google login button clicked")
            console.log("Login function:", login)
            login()
         }} 
         type="button"
      >
         <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
         </svg>
         Continue with Google
      </Button>
   )
}
