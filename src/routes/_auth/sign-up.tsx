import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { Lock, Mail, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Header from "../../components/auth/Header"
import InputField from "../../components/global/InputField"
import SubmitButton from "../../components/global/SubmitButton"
import { Form, FormField } from "../../components/ui/form"
import { apiClient } from "../../lib/axios"
import { INITIAL_VALUES, SignUpSchema, SignUpType } from "../../schemas/sign-up"
import { useAuth } from "../../context/authContext"
import { ServerResponse } from "../../types/global"
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { USER_QUERY_KEY } from "../../lib/constants"

export const Route = createFileRoute("/_auth/sign-up")({
    component: SignUp,
})

function SignUp() {
    const form = useForm({
        mode: "onSubmit",
        resolver: zodResolver(SignUpSchema),
        defaultValues: INITIAL_VALUES,
    })

    const { setAccessToken } = useAuth()
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const onSubmit = async (values: SignUpType) => {
        try {
            const { data } = await apiClient.post<ServerResponse>(
                "/auth/register",
                values,
            )
            const token = data.data?.tokens?.accessToken
            const user = data.data?.user

            setAccessToken(token)
            if (user) {
                queryClient.setQueryData([USER_QUERY_KEY], user)
            }

            toast.success("Account created successfully")
            navigate({
                to: "/dashboard",
            })
        } catch (err) {
            let message = "An unexpected error occurred"
            if (axios.isAxiosError(err)) {
                message =
                    err.response?.data?.message ||
                    "An error occurred during account creation"
            }
            toast.error("Sign up failed", { description: message })
            return
        }
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
                <div className="text-center text-sm">
                    Already have an accunt?{" "}
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
