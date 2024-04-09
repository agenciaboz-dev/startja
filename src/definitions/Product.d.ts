declare interface Product {
    id: number
    name: string
    codigo_externo: string
    ncm: string
    icmsOrigin: number
    active: boolean
    hidden_by: string

    rules: regraTributacao[]
    produtosNota: ProdutoNotaFiscal[]
    user_id?: number
}