declare interface Product {
    id: number
    name: string
    ncm: string
    icmsOrigin: string

    rules: regraTributacao[]
    produtosNota: ProdutoNotaFiscal[]
}