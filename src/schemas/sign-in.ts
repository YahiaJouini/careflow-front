import z from "zod"

export const SignInSchema = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
   password: z.string().nonempty({
      message: "Please enter your password",
   }),
})

export type SignInType = z.infer<typeof SignInSchema>
export const INITIAL_VALUES: SignInType = {
   email: "",
   password: "",
}
