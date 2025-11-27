import Loader from "../svg/Loader"
import { Button } from "../ui/button"

type Props = {
   loading: boolean
   disabled?: boolean
   text?: string
   type?: "submit" | "button"
   onClick?: () => void
}
const SubmitButton = ({
   disabled,
   loading,
   text = "Continuer",
   type = "submit",
   onClick,
}: Props) => {
   return (
      <Button
         type={type}
         className="flex-center bg-theme z-10 mt-3 w-full rounded-md py-3 font-semibold text-white"
         disabled={disabled ?? loading}
         onClick={onClick ? onClick : undefined}
      >
         {loading ? <Loader /> : text}
      </Button>
   )
}

export default SubmitButton
