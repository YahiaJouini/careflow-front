type Props = {
   title: string
   subtitle?: string
}
export default function Header({ title, subtitle }: Props) {
   return (
      <div className="mb-8 text-center">
         <div className="flex flex-col items-center gap-1">
            <h1 className="mt-2 text-[26px] font-bold">{title}</h1>
            <p className="text-mainText/60">{subtitle}</p>
         </div>
      </div>
   )
}
