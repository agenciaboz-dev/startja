export const cofins_situacao_tributaria_values = [
    {
        value: "01",
        label: "Operação tributável: base de cálculo = valor da operação (alíquota normal - cumulativo/não cumulativo)",
        fields: [
            { field: "cofins_base_calculo", label: "Percentual base de cálculo", type: "number" },
            { field: "cofins_aliquota_porcentual", label: "Alíquota (em percentual)", type: "number" },
            { field: "cofins_aliquota_valor", label: "Valor alíquota", type: "number" },
        ],
    },

    {
        value: "02",
        label: "Operação tributável: base de cálculo = valor da operação (alíquota diferenciada)",
        fields: [
            { field: "cofins_base_calculo", label: "Percentual base de cálculo", type: "number" },
            { field: "cofins_aliquota_porcentual", label: "Alíquota (em percentual)", type: "number" },
            { field: "cofins_aliquota_valor", label: "Valor alíquota", type: "number" },
        ],
    },

    {
        value: "03",
        label: "Operação tributável: base de cálculo = quantidade vendida × alíquota por unidade de produto",
        fields: [
            { field: "cofins_quantidade_vendida", label: "Quantidade base de cálculo", type: "number" },
            { field: "cofins_aliquota_valor", label: "Alíquota (em reais)", type: "number" },
            { field: "cofins_valor", label: "Valor", type: "number" },
        ],
    },

    { value: "04", label: "Operação tributável: tributação monofásica (alíquota zero)" },

    { value: "05", label: "Operação tributável: substituição tributária" },

    { value: "06", label: "Operação tributável: alíquota zero" },

    { value: "07", label: "Operação isenta da contribuição" },

    { value: "08", label: "Operação sem incidência da contribuição" },

    { value: "09", label: "Operação com suspensão da contribuição" },

    {
        value: "49",
        label: "Outras operações de saída",
        fields: [
            { field: "cofins_base_calculo", label: "Percentual base de cálculo", type: "number" },
            { field: "cofins_aliquota_porcentual", label: "Alíquota (em percentual)", type: "number" },
            { field: "cofins_aliquota_valor", label: "Valor alíquota", type: "number" },
        ],
    },

    { value: "50", label: "Operação com direito a crédito: vinculada exclusivamente a receita tributada no mercado interno" },

    { value: "51", label: "Operação com direito a crédito: vinculada exclusivamente a receita não tributada no mercado interno" },

    { value: "52", label: "Operação com direito a crédito: vinculada exclusivamente a receita de exportação" },

    { value: "53", label: "Operação com direito a crédito: vinculada a receitas tributadas e não-tributadas no mercado interno" },

    { value: "54", label: "Operação com direito a crédito: vinculada a receitas tributadas no mercado interno e de exportação" },

    { value: "55", label: "Operação com direito a crédito: vinculada a receitas não-tributadas no mercado interno e de exprtação" },

    { value: "56", label: "Operação com direito a crédito: vinculada a receitas tributadas e não-tributadas no mercado interno e de exportação" },

    { value: "60", label: "Crédito presumido: operação de aquisição vinculada exclusivamente a receita tributada no mercado interno" },

    { value: "61", label: "Crédito presumido: operação de aquisição vinculada exclusivamente a receita não-tributada no mercado interno" },

    { value: "62", label: "Crédito presumido: operação de aquisição vinculada exclusivamente a receita de exportação" },

    { value: "63", label: "Crédito presumido: operação de aquisição vinculada a receitas tributadas e não-tributadas no mercado interno" },

    { value: "64", label: "Crédito presumido: operação de aquisição vinculada a receitas tributadas no mercado interno e de exportação" },

    { value: "65", label: "Crédito presumido: operação de aquisição vinculada a receitas não-tributadas no mercado interno e de exportação" },

    {
        value: "66",
        label: "Crédito presumido: operação de aquisição vinculada a receitas tributadas e não-tributadas no mercado interno e de exportação",
    },

    { value: "67", label: "Crédito presumido: outras operações" },

    { value: "70", label: "Operação de aquisição sem direito a crédito" },

    { value: "71", label: "Operação de aquisição com isenção" },

    { value: "72", label: "Operação de aquisição com suspensão" },

    { value: "73", label: "Operação de aquisição a alíquota zero" },

    { value: "74", label: "Operação de aquisição sem incidência da contribuição" },

    { value: "75", label: "Operação de aquisição por substituição tributária" },

    {
        value: "98",
        label: "Outras operações de entrada",
        fields: [
            { field: "cofins_base_calculo", label: "Percentual base de cálculo", type: "number" },
            { field: "cofins_aliquota_porcentual", label: "Alíquota (em percentual)", type: "number" },
            { field: "cofins_aliquota_valor", label: "Valor alíquota", type: "number" },
        ],
    },

    {
        value: "99",
        label: "Outras operações",
        fields: [
            { field: "cofins_base_calculo", label: "Percentual base de cálculo", type: "number" },
            { field: "cofins_aliquota_porcentual", label: "Alíquota (em percentual)", type: "number" },
            { field: "cofins_aliquota_valor", label: "Valor alíquota", type: "number" },
        ],
    },
]

export default cofins_situacao_tributaria_values
