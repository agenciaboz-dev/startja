import {
    Admin,
    Customer,
    DigitalCertificate,
    Product,
    Company,
    Natureza,
    regraTributacao,
    Property,
    ProdutoNotaFiscal,
    notaFiscal,
    Accounts,
} from "@prisma/client"
import { type } from "os"

export declare interface LoginForm {
    login: string
    password: string
}

export declare interface NewUser {
    name: string
    email: string
    password: string
    register_date: string
    phone: string
    document: string
    city: string
    state: string
    district: string
    number: string
    adjunct: string
    street: string
    cep: string
    businessName: string
    regimeTributario: string
    inscricaoEstadual: string
    isento: boolean

    certificateId?: number
    certificate?: DigitalCertificate
    companies?: Company[]
}

export declare interface NewCompany {
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
    number: string
    cep: string
    email: string
    phone: string

    customerId: number
    customer?: Customer
    notas?: notaFiscal[]
}

export declare interface NewProduct {
    name: string
    ncm: string
    rules?: regraTributacao[]
    produtosNota?: ProdutoNotaFiscal[]
}

export declare interface NewNatureza {
    operation: string
    type: string
    finality: string
    motive: string

    // rules: { id: number }[]
    rules?: regraTributacao[]
    notas?: notaFiscal[]
}

export declare interface NewregraTributacao {
    uf: string
    aliquota: number
    cfop: number
    percentageBaseCalculo: number
    deferralPercentage: string
    additionalInfo: string
    fiscalBenefit: string
    icmsOrigin: number
    icmsSituation: string
    pisSituation: string
    cofinsSituation: string

    notas?: notaFiscal[]
    natures?: Natureza[]
    products?: Product[]
}

export declare interface NewProperty {
    ie: string
    nifr: string
    cep: string
    city: string
    state: string
    street: string
    number: string
    adjunct: string
    district: string
    exploration: string
    declarant: string

    notas: notaFiscal[]
}

export declare interface NewnotaFiscal {
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

    products?: ProdutoNotaFiscal[]
    rules?: regraTributacao[]

    companyId?: number
    company?: Company

    propertyId?: number
    property?: Property

    natureId?: number
    nature?: Natureza
}

export declare interface NewAccount {
    internal: boolean
    name: string
    agency: string
    accNumber: string
    bankName: string
}
