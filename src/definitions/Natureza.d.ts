declare interface Natureza {
    id: number
    operation: string
    type: number
    finality: number
    motive: string
    active: boolean

    user_id?: number
    user?: User

    rules: regraTributacao[]
    notas: notaFiscal[]
}
