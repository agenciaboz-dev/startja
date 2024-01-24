declare interface regraTributacao {
    id: number

    aliquota: number
    cfop: number
    icms_modalidade_base_calculo: number
    cofins_situacao_tributaria: string
    icms_situacao_tributaria: string
    pis_situacao_tributaria: string

    origem: string
    destino: string

    product_id: number
    product: Product

    natureza_id: number
}
