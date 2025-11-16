import { createFileRoute } from "@tanstack/react-router"
import { useTheme } from "../../context/themeContext"
import { INITIAL_VALUES } from "../../schemas/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../../schemas/user"
import { useForm } from "react-hook-form"
import Loader from "@/components/global/Loader"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../../components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import InputField from "@/components/global/InputField"
import { Moon, Pen, Sun, Trash2, User as UserIcon } from "lucide-react"
import SubmitButton from "@/components/global/SubmitButton"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User } from "@/types/user"

export const Route = createFileRoute("/dashboard/profile")({
    component: Profile,
})

export default function Profile() {
    const { theme, setTheme } = useTheme()
    const user: User = {
        id: 1,
        fullName: "John Doe",
        email: "john@gmail.com",
        image: "https://i.pravatar.cc/150?img=3",
        createdAt: "2023-01-01T00:00:00.000Z",
        bio: "This is my bio",
    }
    const isLoading = false
    const form = useForm({
        mode: "onSubmit",
        resolver: zodResolver(userSchema),
        defaultValues: INITIAL_VALUES,
    })

    const onSubmit = async () => { }

    if (isLoading) {
        return (
            <div className="flex-center h-full w-full">
                <Loader />
            </div>
        )
    }

    if (!user) {
        return <div>User not found</div>
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
                className="mx-auto flex max-w-3xl flex-col gap-5"
            >
                <div className="mx-auto w-full px-4">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="mb-6 flex flex-col items-center">
                                        <div className="group relative mb-4">
                                            <Avatar className="border-theme h-32 w-32 border-4">
                                                <AvatarImage
                                                    src={user.image ?? "/placeholder.svg"}
                                                    alt={user.fullName}
                                                />
                                                <AvatarFallback className="bg-[var(--color-theme)] text-3xl text-white">
                                                    {user.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <label
                                                    htmlFor="avatar-upload"
                                                    className="cursor-pointer rounded-md bg-[var(--color-theme)] px-3 py-1 text-sm font-medium text-white"
                                                >
                                                    Change
                                                </label>
                                                <input
                                                    {...field}
                                                    value={undefined}
                                                    type="file"
                                                    accept="image/*"
                                                    id="avatar-upload"
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-semibold">
                                            {user.fullName}
                                        </h2>
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mb-8 rounded-lg p-6 shadow-md">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field, fieldState }) => (
                                    <InputField
                                        {...field}
                                        value={field.value ?? ""}
                                        label="Full Name"
                                        placeholder="John Doe"
                                        icon={<UserIcon className="h-5 w-5" />}
                                        hasError={!!fieldState.error}
                                    />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field, fieldState }) => (
                                    <InputField
                                        {...field}
                                        value={field.value ?? ""}
                                        label="Bio"
                                        placeholder="Tell us about yourself"
                                        icon={<Pen className="h-5 w-5" />}
                                        hasError={!!fieldState.error}
                                    />
                                )}
                            />

                            <SubmitButton
                                loading={form.formState.isSubmitting}
                                disabled={!form.formState.isValid}
                                text="Save"
                                type="submit"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-lightBg rounded-lg p-6 shadow-md">
                            <h3 className="mb-4 text-xl font-semibold">Appearance</h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {theme === "dark" ? (
                                        <Moon className="h-5 w-5" />
                                    ) : (
                                        <Sun className="h-5 w-5" />
                                    )}
                                    <Label htmlFor="dark-mode">Dark Mode</Label>
                                </div>
                                <Switch
                                    id="dark-mode"
                                    checked={theme === "dark"}
                                    onCheckedChange={(checked) =>
                                        setTheme(checked ? "dark" : "light")
                                    }
                                    className="cursor-pointer data-[state=checked]:bg-[var(--color-theme)]"
                                />
                            </div>
                        </div>

                        <div className="bg-lightBg rounded-lg border-t-4 border-red-500 p-6 shadow-md">
                            <h3 className="mb-4 flex items-center text-xl font-semibold text-red-500">
                                <Trash2 className="mr-2 h-5 w-5" />
                                Danger Zone
                            </h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Once you delete your account, there is no going back.
                                Please be certain.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
