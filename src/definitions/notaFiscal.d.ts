declare interface notaFiscal {
    id: number
    series: number
    generalInfo: string
    emissionDate?: string
    emissionTime?: string
    paymentCondition: string
    paymentType: string
    qtdParcelas: number
    valorParcelas: number
    vencimentoParcelas: string
    freteType: string
    freteValue?: number
    freteInsurance?: number
    vehiclePlates: string
    vehicleUf: string
    shippingCompany: string
    transportedProductQuantity: string
    transportedProductType: string
    bruteWeightKg: string
    liquidWeightKg: string
    totalValue: number
    totalProductValue: number

    products: ProdutoNotaFiscal[]
    rules: regraTributacao[]

    companyId: number
    company: Company

    propertyId: number
    property: Property

    natureId: number
    nature: Natureza
}
