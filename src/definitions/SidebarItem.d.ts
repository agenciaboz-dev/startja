declare interface SidebarItem {
    id: number
    name: string
    path: string
    icon: React.ReactElement
    onClick: (data?: any) => void
    disabled?: boolean

    admin?: boolean
    subItens?: SidebarItem[]
}
