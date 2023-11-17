declare interface User {
    id: number
    name: string
    email: string
    password: string
}

declare interface Admin extends User {}

declare interface Customer extends User {
    register_date: String
    phone: String
    cpf: String
    city: String
    state: String
}

declare interface LoginValues {
    email: string
    password: string
}