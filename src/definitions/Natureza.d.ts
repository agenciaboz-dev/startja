declare interface Natureza {
    id: number
    operation: string
    type: number
    finality: string
    motive: string
    emissionFinality: number
    active: boolean

    rules: regraTributacao[]
    notas: notaFiscal[]
}
