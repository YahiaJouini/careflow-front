import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { cn } from "../../lib/utils"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"

type InputFieldProps = {
   type?: "text" | "email" | "tel" | "date" | "password"
   value: string
   label?: string
   icon?: React.ReactNode
   placeholder?: string
   onBlur: () => void
   onChange: (val: string) => void
   className?: string
   hasError: boolean
}

const InputField = ({ type = "text", ...props }: InputFieldProps) => {
   const [showPassword, setShowPassword] = useState(false)
   const { hasError, ...rest } = props
   const handlePasswordDisplay = () => {
      if (type !== "password") return null
      if (props.value === "") return null

      return showPassword ? (
         <EyeOff onClick={() => setShowPassword(false)} className="h-5 w-5" />
      ) : (
         <Eye onClick={() => setShowPassword(true)} className="h-5 w-5" />
      )
   }
   const handleDisplay = () => {
      return (
         <div className="relative">
            <input
               {...rest}
               type={showPassword && type === "password" ? "text" : type}
               onChange={(e) => props.onChange(e.target.value)}
               className={cn(
                  "bg-input text-mainText w-full rounded-md px-5 py-3 text-[15px] transition-all outline-none placeholder:text-sm focus:bg-none focus:pl-[22px] focus:ring-0",
                  props.className,
                  props.icon && "pl-10 focus:pl-[42px]",
               )}
            />
            {props.icon && (
               <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
                  {props.icon}
               </div>
            )}
            <button
               type="button"
               className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
            >
               {handlePasswordDisplay()}
            </button>
         </div>
      )
   }

   return (
      <div className="relative flex w-full flex-col gap-0.5">
         <FormItem>
            {props.label && (
               <FormLabel className="text-sm font-medium !text-inherit">
                  {props.label}
               </FormLabel>
            )}
            <FormControl>{handleDisplay()}</FormControl>

            {hasError && (
               <FormMessage className="absolute -top-0 right-0 text-[13px] text-red-400">
                  This field has an error
               </FormMessage>
            )}
         </FormItem>
      </div>
   )
}

export default InputField
