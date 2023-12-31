declare interface notaFiscal {
    id: number
    emissionDatetime: string
    numero: number
    serie: number
    natureza_operacao: string
    tipo_documento: number
    local_destino: number
    finalidade_emissao: number
    consumidor_final: number
    presenca_comprador: number

    emitente_id: number
    emitente: User
    destinatario_id: number
    destinatario: Company

    valor_frete: number
    valor_seguro: number
    valor_produtos: number
    valor_total: number

    status?: string
    chave?: string
    protocolo?: string
    url_xml?: string
    url_pdf?: string
    mensagem_sefaz?: string

    products: ProdutoNotaFiscal[]
}
