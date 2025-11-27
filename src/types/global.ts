export type ApiResponse<T = any> = {
   success: boolean
   message: string
   data: T
   error?: string
}

export type ServerResponse = {
   status: number
   message: string
   data: any
}

export type Theme = "light" | "dark" | "system"

export type SidebarItem = {
   label: string
   path: `/${string}`
   icon: React.ElementType<React.SVGProps<SVGSVGElement>>
}
