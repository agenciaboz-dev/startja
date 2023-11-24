const isCustomer = (user: any): user is Customer => {
    return (user as Customer).register_date !== undefined
}

export const getUserType = (user: Customer | Admin | null) => {
    if (!user) return null
    if (isCustomer(user)) return "customer"
    return "admin"
}
