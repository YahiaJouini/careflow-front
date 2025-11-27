import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import axios from "axios"
import { Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Header from "../../components/auth/Header"
import InputField from "../../components/global/InputField"
import SubmitButton from "../../components/global/SubmitButton"
import { Form, FormField } from "../../components/ui/form"
import { useAuth } from "../../context/authContext"
import { apiClient } from "../../lib/axios"
import { INITIAL_VALUES, SignInSchema, SignInType } from "../../schemas/sign-in"
import { ServerResponse } from "../../types/global"
import { USER_QUERY_KEY } from "../../lib/constants"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Verification from "@/components/auth/Verification"

export const Route = createFileRoute("/_auth/sign-in")({
   component: SignIn,
})

function SignIn() {
   const form = useForm({
      mode: "onSubmit",
      resolver: zodResolver(SignInSchema),
      defaultValues: INITIAL_VALUES,
   })
   const { setAccessToken } = useAuth()
   const navigate = useNavigate()
   const [isVerifying, setIsVerifying] = useState(false)

   const queryClient = useQueryClient()

   const onSubmit = async (values: SignInType) => {
   toast.promise(
      async () => {
         return await apiClient.post<ServerResponse>("/auth/login", values)
      },
      {
         loading: "Signing in...",
         success: ({ data }) => {
            const token = data.data?.tokens?.accessToken
            const user = data.data?.user

            setAccessToken(token)
            if (user) {
               queryClient.setQueryData([USER_QUERY_KEY], user)
            }

            navigate({
               to: "/dashboard",
               replace:true
            })
            return "Signed in successfully"
         },
         error: async (err: any) => {
            if (axios.isAxiosError(err)) {
               if (err.response?.status === 403) {
                  await apiClient.post("/auth/resend-verification", {
                     email: values.email,
                  })
                  setIsVerifying(true)
                  return "Please verify your email to continue"
               }
               return (
                  err.response?.data?.error ||
                  "An error occurred during sign in"
               )
            }
            return "An unexpected error occurred"
         },
      }
   )
}

   if (isVerifying) {
      return <Verification from="signIn" email={form.getValues("email")} />
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit, (err) => {
               console.log(err)
               toast.error("Please fill the form correctly", {
                  description: err.root?.message,
               })
            })}
            className="mx-auto flex w-full flex-col gap-5"
         >
            <Header
               title="Welcome back"
               subtitle="Sign in to your account to continue"
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field, fieldState }) => (
                  <InputField
                     {...field}
                     label="Email"
                     placeholder="you@example.com"
                     type="email"
                     icon={<Mail className="h-5 w-5" />}
                     hasError={!!fieldState.error}
                  />
               )}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field, fieldState }) => (
                  <InputField
                     {...field}
                     label="Password"
                     placeholder="Your password"
                     type="password"
                     icon={<Lock className="h-5 w-5" />}
                     hasError={!!fieldState.error}
                  />
               )}
            />
            <SubmitButton
               text="Sign In"
               loading={form.formState.isSubmitting}
               disabled={!form.formState.isValid}
            />
            <div className="text-center text-sm">
               Don't have an account?{" "}
               <Link
                  to="/sign-up"
                  className="text-theme font-medium hover:underline"
               >
                  Create account
               </Link>
            </div>
         </form>
      </Form>
   )
}
