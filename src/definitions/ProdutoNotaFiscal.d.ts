declare interface ProdutoNotaFiscal {
    id: number
    productQnty: number
    unidade: string
    unitaryValue: number
    informacoes_adicionais_item: string

    produto: Product
    produtoId: number

    nota: notaFiscal
    notaId: number
    tax_rules: regraTributacao
}
