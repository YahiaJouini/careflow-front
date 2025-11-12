import z from "zod"

export const SignUpSchema = z.object({
   fullName: z.string().min(3, {
      message: "Full name must be at least 3 characters long",
   }),
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
   password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
   }),
})

export type SignUpType = z.infer<typeof SignUpSchema>
export const INITIAL_VALUES: SignUpType = {
   fullName: "",
   email: "",
   password: "",
}
