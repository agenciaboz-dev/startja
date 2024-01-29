declare interface Natureza {
    id: number
    operation: string
    type: number
    finality: number
    motive: string
    active: boolean

    rules: regraTributacao[]
    notas: notaFiscal[]
}
