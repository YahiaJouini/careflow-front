import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Lock, Mail, User } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Header from "../../components/auth/Header"
import Verification from "../../components/auth/Verification"
import InputField from "../../components/global/InputField"
import SubmitButton from "../../components/global/SubmitButton"
import { Form, FormField } from "../../components/ui/form"
import { apiClient } from "../../lib/axios"
import { INITIAL_VALUES, SignUpSchema, SignUpType } from "../../schemas/sign-up"

export const Route = createFileRoute("/_auth/sign-up")({
   component: SignUp,
})

function SignUp() {
   const form = useForm({
      mode: "onSubmit",
      resolver: zodResolver(SignUpSchema),
      defaultValues: INITIAL_VALUES,
   })
   const [isVerifying, setIsVerifying] = useState(false)

   const onSubmit = async (values: SignUpType) => {
      try {
         await apiClient.post("/auth/register", values)
         setIsVerifying(true)
      } catch {
         return
      }
   }
   if (isVerifying) {
      return <Verification from="signUp" email={form.getValues("email")} />
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
            className="mx-auto flex w-full flex-col gap-5">
            <Header
               title="Create Account"
               subtitle="Get started with your free account"
            />
            <FormField
               control={form.control}
               name="fullName"
               render={({ field, fieldState }) => (
                  <InputField
                     {...field}
                     label="Full Name"
                     placeholder="John Doe"
                     icon={<User className="h-5 w-5" />}
                     hasError={!!fieldState.error}
                  />
               )}
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
               text="Create Account"
               loading={form.formState.isSubmitting}
            />
            <div className="text-sm text-center">
               Already have an accunt?{" "}
               <Link
                  to="/sign-in"
                  className="font-medium text-theme hover:underline">
                  Sign In
               </Link>
            </div>
         </form>
      </Form>
   )
}
