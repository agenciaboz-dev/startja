declare interface SidebarItem {
    id: number
    name: string
    path: string
    icon: React.ReactElement
    onClick: (data?: any) => void

    admin?: boolean
    subItens?: SidebarItem[]
}
