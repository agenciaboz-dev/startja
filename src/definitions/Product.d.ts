declare interface Product {
    id: number
    name: string
    codigo_externo: string
    ncm: string
    icmsOrigin: number
    active: boolean

    rules: regraTributacao[]
    produtosNota: ProdutoNotaFiscal[]
    user_id?: number
}