export const icms_situacao_tributaria_values = [
    {
        value: "00",
        label: "Tributada integralmente",
        fields: [{ field: "aliquota", type: "number" }],
    },

    {
        value: "10",
        label: "Tributada e com cobrança do ICMS por substituição tributária",
        fields: [
            { field: "cest", type: "number" },
            { field: "codigo_beneficio_fiscal", type: "text" },
            // valor unitário da pauta
            { field: "aliquota", type: "number" },
            { field: "icms_aliquota_st", type: "number" },
        ],
    },

    {
        value: "20",
        label: "Tributada com redução de base de cálculo",
        fields: [
            { field: "codigo_beneficio_fiscal", type: "text" },
            { field: "icms_reducao_base_calculo", type: "number" },
            { field: "aliquota", type: "number" },
        ],
    },

    { value: "30", label: "Isenta ou não tributada e com cobrança do ICMS por substituição tributária" },

    { value: "40", label: "Isenta" },

    { value: "41", label: "Não tributada" },

    { value: "50", label: "Suspensão" },

    { value: "51", label: "Diferimento (a exigência do preenchimento das informações do ICMS diferido fica a critério de cada UF)" },

    { value: "60", label: "Cobrado anteriormente por substituição tributária" },

    { value: "70", label: "Tributada com redução de base de cálculo e com cobrança do ICMS por substituição tributária" },

    { value: "90", label: "Outras(regime Normal)" },

    { value: "101", label: "Ttributada pelo Simples Nacional com permissão de crédito" },

    { value: "102", label: "Tributada pelo Simples Nacional sem permissão de crédito" },

    { value: "103", label: "Isenção do ICMS no Simples Nacional para faixa de receita bruta" },

    { value: "201", label: "Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por substituição tributária" },

    { value: "202", label: "Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por substituição tributária" },

    { value: "203", label: "Isenção do ICMS nos Simples Nacional para faixa de receita bruta e com cobrança do ICMS por substituição tributária" },

    { value: "300", label: "Imune" },

    { value: "400", label: "Não tributada pelo Simples Nacional" },

    { value: "500", label: "ICMS cobrado anteriormente por substituição tributária (substituído) ou por antecipação" },

    { value: "900", label: "Outras (regime Simples Nacional)" },
]

export default icms_situacao_tributaria_values
