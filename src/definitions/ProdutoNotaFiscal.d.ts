declare interface ProdutoNotaFiscal {
    id: number
    unidadeComercial: string
    productQnty: number
    unitaryComercialValue: number
    unitaryTributableValue: number
    buyerPresence: string

    produto: Product
    produtoId: number

    nota: notaFiscal
    notaId: number
}
