declare interface regraTributacao {
    id: number
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

    notas: notaFiscal[]
    natures: Natureza[]
    products: Product[]
}
