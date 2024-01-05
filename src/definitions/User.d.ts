declare interface User {
    id: number
    name: string
    email: string
    password: string

    register_date: string
    phone: string
    document: string
    city: string
    state: string
    district: string
    number: number
    adjunct: string
    street: string
    cep: string
    businessName: string
    regimeTributario: number
    inscricaoEstadual: string
    isento: boolean

    certificateId: number
    certificate: DigitalCertificate
    companies: Company[]
    notas: notaFiscal[]
}

declare interface Admin {
    id: number
    name: string
    email: string
    password: string
}

declare interface LoginValues {
    email: string
    password: string
}