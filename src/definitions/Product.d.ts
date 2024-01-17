declare interface Product {
    id: number
    name: string
    codigo_externo: string
    ncm: string
    icmsOrigin: number

    rules: regraTributacao[]
    produtosNota: ProdutoNotaFiscal[]
}