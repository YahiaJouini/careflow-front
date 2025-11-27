import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Mail } from "lucide-react"
import { apiClient } from "@/lib/axios"
import Header from "@/components/auth/Header"
import InputField from "@/components/global/InputField"
import SubmitButton from "@/components/global/SubmitButton"
import { Form, FormField } from "@/components/ui/form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const ForgotPasswordSchema = z.object({
   email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>

export const Route = createFileRoute("/_auth/forgot-password")({
   component: ForgotPassword,
})

function ForgotPassword() {
   const [isSubmitted, setIsSubmitted] = useState(false)
   
   const form = useForm<ForgotPasswordType>({
      resolver: zodResolver(ForgotPasswordSchema),
      defaultValues: {
         email: "",
      },
   })

   const onSubmit = async (values: ForgotPasswordType) => {
      try {
         // Assuming endpoint exists or will exist. 
         // If not, this is a placeholder for the frontend logic as requested.
         await apiClient.post("/auth/forgot-password", values)
         setIsSubmitted(true)
         toast.success("Reset link sent")
      } catch (error) {
         console.error(error)
         toast.error("Failed to send reset link")
      }
   }

   if (isSubmitted) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
               <CardHeader>
                  <Header
                     title="Check your email"
                     subtitle="We have sent a password reset link to your email address."
                  />
               </CardHeader>
               <CardContent className="flex flex-col gap-4">
                  <p className="text-center text-sm text-muted-foreground">
                     Did not receive the email? Check your spam folder or try again.
                  </p>
                  <Link
                     to="/sign-in"
                     className="text-primary hover:underline text-center text-sm font-medium"
                  >
                     Back to Sign In
                  </Link>
               </CardContent>
            </Card>
         </div>
      )
   }

   return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
         <Card className="w-full max-w-md">
            <CardContent className="pt-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mx-auto flex w-full flex-col gap-5"
                    >
                        <Header
                        title="Reset Password"
                        subtitle="Enter your email to receive a reset link"
                        />
                        
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <InputField
                                {...field}
                                label="Email"
                                placeholder="name@example.com"
                                type="email"
                                icon={<Mail className="h-5 w-5" />}
                                hasError={!!fieldState.error}
                            />
                        )}
                        />

                        <SubmitButton
                        text="Send Reset Link"
                        loading={form.formState.isSubmitting}
                        disabled={!form.formState.isValid}
                        />

                        <div className="text-center text-sm">
                        <Link
                            to="/sign-in"
                            className="text-primary hover:underline font-medium"
                        >
                            Back to Login
                        </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
         </Card>
      </div>
   )
}
