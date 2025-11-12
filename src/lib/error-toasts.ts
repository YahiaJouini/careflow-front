import { toast } from "sonner"

export const errorToasts = (status: number, message: string) => {
   switch (status) {
      case 400:
         toast.error("Bad Request", {
            description: message,
         })
         break
      case 401:
         toast.error("Unauthorized", {
            description: message,
         })
         break
      case 403:
         toast.error("Forbidden", {
            description: message,
         })
         break
      case 409:
         toast.error("Conflict", {
            description: message,
         })
         break
      case 404:
         toast.error("Not Found", {
            description: message,
         })
         break
      case 500:
         toast.error("Server Error", {
            description: message,
         })
         break
      default:
         toast.error("An error occurred", {
            description: "Please try again later",
         })
   }
}
