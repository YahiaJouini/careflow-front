import { createFileRoute, Link } from "@tanstack/react-router"
import Verification from "@/components/auth/Verification"
import GoogleLoginButton from "@/components/auth/GoogleLoginButton"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ClipboardList, Lock, Mail, User } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getPublicSpecialties } from "../../api/public"
import Header from "../../components/auth/Header"
import InputField from "../../components/global/InputField"
import SubmitButton from "../../components/global/SubmitButton"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
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

   const [tab, setTab] = useState<"doctor" | "patient">("patient")
   const [openSelect, setOpenSelect] = useState(false)
   const [isVerifying, setIsVerifying] = useState(false)

   const { data: specialties, isLoading } = useQuery({
      queryKey: ["public", "specialties"],
      queryFn: getPublicSpecialties,
      enabled: openSelect,
   })

  const onSubmit = async (values: SignUpType) => {
    toast.promise(
        async () => {
            return await apiClient.post("/auth/register", values)
        },
        {
            loading: "Creating account...",
            success: () => {
                setIsVerifying(true)
                return "Account created successfully"
            },
            error: (err: any) => {
                let message = "An unexpected error occurred"
                if (axios.isAxiosError(err)) {
                message =
                    err.response?.data?.error ||
                    "An error occurred during account creation"
                }
                return message
            },
        }
    )
    }
   if (isVerifying) {
      return <Verification from="signUp" email={form.getValues("email")} />
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit, (err) => {
               toast.error("Please fill the form correctly", {
                  description: err.root?.message,
               })
            })}
            className="mx-auto flex w-full flex-col gap-5"
         >
            <Header
               title="Create Account"
               subtitle="Get started with your free account"
            />

            <div className="bg-secondary mx-auto flex w-fit gap-2 rounded-lg p-1">
               <button
                  type="button"
                  onClick={() => {
                     setTab("patient")
                     form.setValue("role", "patient")
                  }}
                  className={`rounded-md px-6 py-2 font-medium transition-all ${
                     tab === "patient"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
               >
                  Patient
               </button>
               <button
                  type="button"
                  onClick={() => {
                     setTab("doctor")
                     form.setValue("role", "doctor")
                  }}
                  className={`rounded-md px-6 py-2 font-medium transition-all ${
                     tab === "doctor"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
               >
                  Doctor
               </button>
            </div>

            <div className="flex flex-col gap-5">
               <div className="flex gap-4">
                  <FormField
                     control={form.control}
                     name="firstName"
                     render={({ field, fieldState }) => (
                        <InputField
                           {...field}
                           label="First Name"
                           placeholder="John"
                           icon={<User className="h-5 w-5" />}
                           hasError={!!fieldState.error}
                        />
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="lastName"
                     render={({ field, fieldState }) => (
                        <InputField
                           {...field}
                           label="Last Name"
                           placeholder="Doe"
                           icon={<User className="h-5 w-5" />}
                           hasError={!!fieldState.error}
                        />
                     )}
                  />
               </div>

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

               {tab === "doctor" && (
                  <div className="border-border flex flex-col gap-5 border-t pt-2">
                     <FormField
                        control={form.control}
                        name="specialtyId"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Specialty</FormLabel>
                              <Select
                                 open={openSelect}
                                 onOpenChange={setOpenSelect}
                                 onValueChange={(value) =>
                                    field.onChange(Number(value))
                                 }
                                 defaultValue={field.value?.toString()}
                              >
                                 <FormControl>
                                    <SelectTrigger className="bg-input border-border text-foreground placeholder:text-muted-foreground">
                                       <SelectValue placeholder="Select a specialty" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent className="bg-card border-border">
                                    {isLoading || !specialties ? (
                                       <div className="text-muted-foreground p-2 text-sm">
                                          Loading...
                                       </div>
                                    ) : (
                                       specialties?.map((specialty) => (
                                          <SelectItem
                                             key={specialty.id}
                                             value={specialty.id.toString()}
                                             className="text-foreground hover:bg-secondary"
                                          >
                                             {specialty.name}
                                          </SelectItem>
                                       ))
                                    )}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="licenseNumber"
                        render={({ field, fieldState }) => (
                           <InputField
                              {...field}
                              value={field.value ?? ""}
                              label="License Number"
                              placeholder="MD-12345"
                              icon={<ClipboardList className="h-5 w-5" />}
                              hasError={!!fieldState.error}
                           />
                        )}
                     />
                  </div>
               )}
            </div>

            <SubmitButton
               text="Create Account"
               loading={form.formState.isSubmitting}
            />

            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                     Or continue with
                  </span>
               </div>
            </div>

            <GoogleLoginButton />

            <div className="text-center text-sm">
               Already have an account?{" "}
               <Link
                  to="/sign-in"
                  className="text-theme font-medium hover:underline"
               >
                  Sign In
               </Link>
            </div>
         </form>
      </Form>
   )
}
