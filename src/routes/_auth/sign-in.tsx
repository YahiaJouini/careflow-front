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

    const onSubmit = async (values: SignInType) => {
        try {
            const { data } = await apiClient.post<ServerResponse>(
                "/auth/login",
                values,
            )

            setAccessToken(data.data?.tokens?.accessToken)
            navigate({
                to: "/dashboard",
            })

            toast.success("Login successful")
        } catch (err) {
            let message = "An unexpected error occurred during login"
            if (axios.isAxiosError(err)) {
                message =
                    err.response?.data?.message || "An error occurred during login"
                toast.error("Login failed", {
                    description: message,
                })
            }
            toast.error(message)
        }
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
