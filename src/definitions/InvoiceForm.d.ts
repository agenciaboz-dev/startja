declare interface FocusNFeInvoiceData {
    numero: number
    serie: number
    natureza_operacao: string
    tipo_documento: number
    local_destino: number
    finalidade_emissao: number
    consumidor_final: number
    presenca_comprador: number
    informacoes_adicionais_contribuinte: string
    emitente: {
        cnpj?: string
        cpf?: string
        nome: string
        nome_fantasia: string
        logradouro: string
        numero: number
        bairro: string
        municipio: string
        uf: string
        inscricao_estadual: string
        regime_tributario: number
    }

    destinatario: {
        nome: string
        cnpj?: string
        cpf?: string
        inscricao_estadual: string | null
        telefone: number
        logradouro: string
        numero: number
        bairro: string
        municipio: string
        uf: string
        indicador_inscricao_estadual: number
    }

    valor: {
        produtos: number
        total: number
    }

    produtos: InvoiceProduct[]
}

declare interface FocusNFeInvoiceForm extends FocusNFeInvoiceData {
    numero: string
    serie: string
    emitente: {
        cnpj?: string
        cpf?: string
        nome: string
        nome_fantasia: string
        logradouro: string
        numero: string
        bairro: string
        municipio: string
        uf: string
        inscricao_estadual: string
        regime_tributario: number
    }

    destinatario: {
        nome: string
        cnpj?: string
        cpf?: string
        inscricao_estadual: string | null
        telefone: string
        logradouro: string
        numero: string
        bairro: string
        municipio: string
        uf: string
        indicador_inscricao_estadual: number
    }

    formas_pagamento: {
        indicador_pagamento: number
        forma_pagamento: string
    }

    transporte: {
        modalidade_frete: number
        transportadora: string
        veiculo_placa: string
        veiculo_uf: string
        valor_frete: number
        valor_seguro: number

        volumes: {
            volumes_quantidade: string
            volumes_especie: string
            peso_bruto: string
            peso_liquido: string
        }
    }
}

declare interface InvoiceProduct {
    id: string
    codigo_externo: string
    name: string
    cfop: number
    unidade_comercial: string
    unidade_tributavel: string
    quantidade: number
    valor_unitario_comercial: number
    valor_unitario_tributavel: number
    ncm: string
    icms_origem: number

    informacoes_adicionais_item: string

    icms_situacao_tributaria: string
    cofins_situacao_tributaria: string
    pis_situacao_tributaria: string
    icms_modalidade_base_calculo: number

    aliquota?: number
    cest?: number
    codigo_beneficio_fiscal?: string
    icms_aliquota_st?: number
    icms_reducao_base_calculo?: number
    icms_valor_desonerado?: number
    icms_origem?: number
    icms_percentual_diferimento?: number
}
