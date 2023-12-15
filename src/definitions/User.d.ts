declare interface User {
    id: number
    name: string
    email: string
    password: string
}

declare interface Admin extends User {}

declare interface Customer extends User {
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
}

declare interface LoginValues {
    login: string
    password: string
}