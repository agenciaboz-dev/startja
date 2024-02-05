declare interface Action {
    id: number
    title: string
    icon: React.ReactElement
    download?: string
    href?: string
    onClick?: () => void
}
