declare interface regraTributacao {
    id: number

    cfop: number
    icms_modalidade_base_calculo: number
    cofins_situacao_tributaria: string
    icms_situacao_tributaria: string
    pis_situacao_tributaria: string

    aliquota?: number
    cest?: number
    codigo_beneficio_fiscal?: string
    icms_aliquota_st?: number
    icms_reducao_base_calculo?: number
    icms_valor_desonerado?: number
    icms_origem?: number
    icms_percentual_diferimento?: number

    origem: string
    destino: string

    products: Product[]

    natureza_id: number
}
