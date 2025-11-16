import { z } from "zod"

const baseSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    bio: z.string().optional(),
})

export const userSchema = baseSchema.extend({
    image: z
        .object({
            file: z.instanceof(File).optional(),
            previewUrl: z.string(),
        })
        .optional(),
})

export const userSubmitSchema = baseSchema.partial().extend({
    image: z.string().url().optional(),
})

export type UserSchemaType = z.infer<typeof userSchema>
export type UserSubmitSchemaType = z.infer<typeof userSubmitSchema>

export const INITIAL_VALUES: UserSchemaType = {
    fullName: "",
    image: undefined,
    bio: "",
}
