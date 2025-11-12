import { useNavigate } from "@tanstack/react-router"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { AlertCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../../context/authContext"
import { apiClient } from "../../lib/axios"
import SubmitButton from "../global/SubmitButton"
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSeparator,
   InputOTPSlot,
} from "../ui/input-otp"

type Props = {
   email: string
   from: "signIn" | "signUp"
}
const Verification = ({ email, from }: Props) => {
   const navigate = useNavigate()
   const [emailVerification, setEmailVerification] = useState({
      code: "",
      loading: false,
   })
   const { setAccessToken } = useAuth()
   const [isResending, setIsResending] = useState(false)

   const verifyEmail = async () => {
      try {
         setEmailVerification({ ...emailVerification, loading: true })
         toast.promise(
            async () => {
               if (from === "signIn") {
                  return await apiClient.post("/auth/verify-email/token", {
                     email,
                     code: emailVerification.code,
                  })
               }
               return await apiClient.post("/auth/verify-email", {
                  email,
                  code: emailVerification.code,
               })
            },
            {
               loading: "Verifying...",
               success: ({ data }) => {
                  console.log("data", data)
                  if (data.data) {
                     setAccessToken(data.data)
                     navigate({
                        to: from === "signUp" ? "/sign-in" : "/",
                     })
                  }
                  return "Email verified successfully"
               },
            }
         )
      } finally {
         setEmailVerification({ code: "", loading: false })
      }
   }

   const handleResendEmail = async () => {
      try {
         toast.promise(
            () => {
               setIsResending(true)
               return apiClient.post("/auth/resend-verification", {
                  email,
               })
            },
            {
               loading: "Resending...",
               success: () => "Verification code resent",
            }
         )
      } finally {
         setIsResending(false)
      }
   }

   return (
      <div className="flex w-full flex-col items-center gap-6">
         <div className="text-center">
            <h2 className="text-xl font-semibold">Verification Required</h2>
            <p className="mt-2">
               Verification code sent to{" "}
               <span className="font-medium">{email}</span>
            </p>
         </div>
         <InputOTP
            onChange={(val) =>
               setEmailVerification((prev) => ({ ...prev, code: val }))
            }
            value={emailVerification.code}
            maxLength={6}
            className="w-full"
            pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup>
               <InputOTPSlot className="h-[56px] w-[56px] text-xl" index={0} />
               <InputOTPSlot className="h-[56px] w-[56px] text-xl" index={1} />
               <InputOTPSlot className="h-[56px] w-[56px] text-xl" index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
               <InputOTPSlot className="h-[56px] w-[56px] text-xl" index={3} />
               <InputOTPSlot className="h-[56px] w-[56px] text-xl" index={4} />
               <InputOTPSlot className="h-[56px] w-[56px] text-xl" index={5} />
            </InputOTPGroup>
         </InputOTP>

         <SubmitButton
            onClick={verifyEmail}
            disabled={
               emailVerification.code.length !== 6 ||
               emailVerification.loading ||
               isResending
            }
            text="verify"
            loading={emailVerification.loading}
         />

         <div className="flex items-start gap-2 text-sm  bg-mainBg p-3 rounded-md w-full ">
            <AlertCircle className="h-[22px] w-[22px] text-red-500 flex-shrink-0 mt-0.5" />
            <p>
               Please check your spam or junk folder if you don't see the
               verification email in your inbox.
            </p>
         </div>
         <p>
            Didn&apos;t receive the code?{" "}
            <button
               type="button"
               disabled={emailVerification.loading || isResending}
               className="cursor-pointer text-theme hover:underline"
               onClick={handleResendEmail}>
               {isResending ? "Resending..." : "Resend"}
            </button>
         </p>
      </div>
   )
}

export default Verification
