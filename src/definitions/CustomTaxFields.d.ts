declare interface CustomTaxFields {
    field: string
    label: string
    type?: "number" | "text"
    select?: boolean
    options?: { value: number | string; label: string }[]
    disabled?: boolean
    formula?: string
    xs?: number
    hr?: boolean
}
