declare interface ProdutoNotaFiscal {
    id: number
    unidadeComercial: string
    unidadeTributavel: string
    productQnty: number
    unitaryComercialValue: number
    unitaryTributableValue: number

    produto: Product
    produtoId: number

    nota: notaFiscal
    notaId: number
}
