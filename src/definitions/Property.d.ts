declare interface Property {
    id: number
    name: string
    ie: string
    nifr: string
    cep: string
    city: string
    state: string
    street: string
    number: string
    adjunct: string
    district: string
    exploration: string
    declarant: string
    nfe_series: string
    nfe_number: string
    active: boolean

    user: User
    notas: notaFiscal[]
}
