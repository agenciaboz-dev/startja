declare interface TaxRulesForm {
    id: string | number
    cfop: number
    cofins_situacao_tributaria: string
    icms_modalidade_base_calculo: number
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

    pis_base_calculo?: number
    pis_aliquota_porcentual?: number
    pis_aliquota_valor?: number
    pis_valor?: number
    pis_quantidade_vendida?: number

    cofins_base_calculo?: number
    cofins_aliquota_porcentual?: number
    cofins_aliquota_valor?: number
    cofins_valor?: number
    cofins_quantidade_vendida?: number

    origem: string
    destino: string

    products: Product[]
}
