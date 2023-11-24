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
    cpf: string
    city: string
    state: string

    companies: Company[]
    notas: Invoice[]
    certificate: DigitalCertificate
}

declare interface LoginValues {
    login: string
    password: string
}