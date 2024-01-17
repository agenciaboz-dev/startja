declare interface ProdutoNotaFiscal {
    id: number
    productQnty: number
    unidade: string
    unitaryValue: number

    produto: Product
    produtoId: number

    nota: notaFiscal
    notaId: number
}
