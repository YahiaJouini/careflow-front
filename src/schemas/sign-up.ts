import z from "zod"

export const SignUpSchema = z
   .object({
      firstName: z.string().min(3, {
         message: "First name must be at least 3 characters long",
      }),
      lastName: z.string().min(3, {
         message: "Last name must be at least 3 characters long",
      }),
      email: z.string().email({
         message: "Please enter a valid email address",
      }),
      password: z.string().min(6, {
         message: "Password must be at least 6 characters long",
      }),
      role: z.enum(["patient", "doctor"]).default("patient"),
      specialtyId: z.coerce.number().optional(),
      licenseNumber: z.string().optional(),
   })
   .superRefine((data, ctx) => {
      if (data.role === "doctor") {
         if (!data.specialtyId) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: "Specialty is required for doctors",
               path: ["specialtyId"],
            })
         }
         if (!data.licenseNumber || data.licenseNumber.length < 3) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: "License number is required for doctors",
               path: ["licenseNumber"],
            })
         }
      }
   })

export type SignUpType = z.infer<typeof SignUpSchema>

export const INITIAL_VALUES: SignUpType = {
   firstName: "",
   lastName: "",
   email: "",
   password: "",
   role: "patient",
   specialtyId: undefined,
   licenseNumber: "",
}
