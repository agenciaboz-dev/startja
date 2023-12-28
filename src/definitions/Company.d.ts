declare interface Company {
    id: number
    type: string
    name: string
    businessName: string
    document: string
    inscricaoEstadual: string
    indicadorEstadual: string
    city: string
    state: string
    district: string
    street: string
    adjunct?: string
    number: string
    cep: string
    email: string
    phone: string

    customer: Customer
    notas: notaFiscal[]
}