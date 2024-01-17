import { Admin, Customer, DigitalCertificate, Product, Company, Natureza, regraTributacao, Property, notaFiscal, Accounts } from "@prisma/client"
import { type } from "os"

export declare interface NewUser {
    name: string
    email: string
    password: string
    phone: string
    document: string
    city: string
    state: string
    district: string
    street: string
    adjunct: string
    number: number
    cep: string
    register_date: string
    regimeTributario: number
    inscricaoEstadual: string
    isento: boolean

    businessName: string
    discrimina_impostos: boolean
    enviar_email_destinatario: boolean
    inscricao_municipal: string
    habilita_nfe: boolean
    habilita_nfce: boolean
    proximo_numero_nfe: number
    serie_nfe: number

    certificate: File | null
    certificate_password: string
}

export declare interface NewCompany {
    type: string
    name: string
    document: string
    inscricaoEstadual: string
    indicadorEstadual: string
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
    businessName: string
    final_consumer: boolean
}

export declare interface NewProduct {
    name: string
    ncm: string
    codigo_externo: string
    icmsOrigin: number
    rules?: regraTributacao[]
}

export declare interface NewNature {
    operation: string
    type: string
    finality: string
    motive: string
    emissionFinality: string
    rules: { id: number }[]
}

export declare interface NewRule {
    uf: string
    aliquota: number
    cfop: number
    percentageBaseCalculo: number
    deferralPercentage: string
    additionalInfo: string
    icmsOrigin: number
    fiscalBenefit: string
    icmsSituation: string
    pisSituation: string
    cofinsSituation: string
    natures: Natureza[]
    products: Product[]
}

export declare interface NewProperty {
    name: string
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
    nfe_series: string
    nfe_number: string
    user_id?: number
}
  
  export declare interface NewNota {
      series: number
      generalInfo: string
      paymentCondition: string
      paymentType: string
      qtdParcelas: number
      valorParcelas: number
      vencimentoParcelas: string
      freteType: string
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
      company: Company
      property: Property
      nature: Natureza
  }
  
  export declare interface NewBankAccount {
      internal: boolean
      name: string
      agency: string
      accNumber: string
      bankName: string
  }
  
  export declare interface LoginForm {
      email: string
      password: string
  }
  
  export declare interface ProdutoNotaFiscal {
      unidadeComercial: string
      productQnty: number
      unitaryComercialValue: number
      unitaryTributableValue: number
      buyerPresence: string
      produtoId: number
      notaId: number
  }
  