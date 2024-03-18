declare interface Natureza {
    id: number
    operation: string
    type: number
    finality: number
    motive: string
    active: boolean
    hidden_by: string

    user_id?: number
    user?: User

    rules: regraTributacao[]
    notas: notaFiscal[]
}
