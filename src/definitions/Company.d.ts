declare interface Company {
    id: number
    type: string
    name: string
    document: string
    inscricaoEstadual?: string
    indicadorEstadual: number
    city: string
    state: string
    district: string
    street: string
    adjunct: string
    number: number
    cep: string
    email?: string
    phone?: number

    customerId: number
    customer: Customer
    notas: notaFiscal[]
}