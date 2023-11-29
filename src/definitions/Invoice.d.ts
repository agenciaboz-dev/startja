declare interface Invoice {
    id: number
    emission: string
    series: string
    nfe: string
    clientSupplier: string
    issuer: string
    value: string
    situation: string
    dateTime?: string
    paymentCondition: string
    paymentType: string
    freteType: string
    vehiclePlates: string
    vehicleUf: string
    shippingCompany: string
    productQnty: string
    productType: string
    bruteWeightKg: string
    liquidWeightKg: string

    products: Product[]
    property: Property
    nature: Nature
}