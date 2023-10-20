declare interface User {
    id: number
    name: string
    email: string
    password: string
    
}

declare interface Customer extends User {
    register_date: String
    phone: String
    cpf: String
    city: String
    state: String
}

interface LoginForm {
    login: string
    password: string
}