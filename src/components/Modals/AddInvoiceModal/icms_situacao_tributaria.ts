// Lembrar que campos iniciados em underline, como "_icms_exemplo_alguma_coisa", não existem na API da FocusNFE;
// e só existem aqui para serem usados aqui (internamente neste sistema)

export const icms_situacao_tributaria_values: {
    value: string
    label: string
    fields?: CustomTaxFields[]
}[] = [
    {
        value: "00",
        label: "Tributada integralmente",
        fields: [
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota",
                label: "Alíquota do ICMS",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
        ],
    },

    {
        value: "10",
        label: "Tributada e com cobrança do ICMS por substituição tributária",
        fields: [
            {
                field: "cest",
                label: "CEST",
                type: "number", // int[7]
                xs: 6,
            },
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text", xs: 6 },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS normal",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota",
                label: "Alíquota do ICMS normal",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS normal",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                hr: true,
            },
            {
                field: "icms_margem_valor_adicionado_st",
                label: "Percentual da MVA do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo_st",
                label: "Base de Cálculo do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100))",
                xs: 6,
            },
            {
                field: "icms_aliquota_st",
                label: "Alíquota do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor_st",
                label: "Valor do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: `({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100)) * ({formik.values.icms_aliquota_st} / 100)) - ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}`,
                xs: 6,
            },
        ],
    },

    {
        value: "20",
        label: "Tributada com redução de base de cálculo",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            {
                field: "_icms_base_calculo_antes_da_reducao",
                label: "Base de Cálculo do ICMS antes da redução",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_reducao_base_calculo",
                label: "Percentual de redução da base de cálculo",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS após a redução",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values.icms_reducao_base_calculo} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota",
                label: "Alíquota do ICMS",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota} / 100) * ({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values.icms_reducao_base_calculo} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade})",
            },
        ],
    },

    {
        value: "30",
        label: "Isenta ou não tributada e com cobrança do ICMS por substituição tributária",
        fields: [
            {
                field: "cest",
                label: "CEST",
                type: "number", // int[7]
                xs: 6,
            },
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text", xs: 6 },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS normal",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota",
                label: "Alíquota do ICMS normal",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "_icms_valor_antes_da_isencao",
                label: "Valor do ICMS normal antes da isenção",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
            { field: "_icms_percentual_isencao", label: "Percentual de isenção", type: "number", xs: 6 },
            {
                field: "_icms_valor_isentado",
                label: "Valor do ICMS isentado",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values._icms_percentual_isencao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS normal",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values._icms_percentual_isencao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                hr: true,
            },
            {
                field: "icms_margem_valor_adicionado_st",
                label: "Percentual da MVA do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo_st",
                label: "Base de Cálculo do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100))",
                xs: 6,
            },
            {
                field: "icms_aliquota_st",
                label: "Alíquota do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor_st",
                label: "Valor do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: `({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100)) * ({formik.values.icms_aliquota_st} / 100)) - (({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade})`,
                xs: 6,
            },
        ],
    },

    {
        value: "40",
        label: "Isenta",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            {
                field: "aliquota",
                label: "Alíquota do ICMS",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "_icms_valor_antes_da_isencao",
                label: "Valor do ICMS antes da isenção",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
            { field: "_icms_percentual_isencao", label: "Percentual de isenção", type: "number", xs: 6 },
            {
                field: "_icms_valor_isentado",
                label: "Valor do ICMS isentado",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values._icms_percentual_isencao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values._icms_percentual_isencao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
        ],
    },

    {
        value: "41",
        label: "Não tributada",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            {
                field: "aliquota",
                label: "Alíquota do ICMS",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "_icms_valor_antes_da_desoneracao",
                label: "Valor do ICMS antes da desoneração",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
            { field: "_icms_percentual_desoneracao", label: "Percentual de desoneração", type: "number", xs: 6 },
            {
                field: "icms_valor_desonerado",
                label: "Valor do ICMS desonerado",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values._icms_percentual_desoneracao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values._icms_percentual_desoneracao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
        ],
    },

    {
        value: "50",
        label: "Suspensão",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            {
                field: "aliquota",
                label: "Alíquota do ICMS",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "_icms_valor_antes_da_suspensao",
                label: "Valor do ICMS antes da suspensão",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
            { field: "_icms_percentual_suspensao", label: "Percentual de suspensão", type: "number", xs: 6 },
            {
                field: "_icms_valor_suspenso",
                label: "Valor do ICMS suspenso",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values._icms_percentual_suspensao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values._icms_percentual_suspensao} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
        ],
    },

    {
        value: "51",
        label: "Diferimento (a exigência do preenchimento das informações do ICMS diferido fica a critério de cada UF)",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            {
                field: "aliquota",
                label: "Alíquota do ICMS",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_valor_operacao",
                label: "Valor do ICMS antes do diferimento",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
            { field: "icms_percentual_diferimento", label: "Percentual de diferimento", type: "number", xs: 6 },
            {
                field: "icms_valor_diferido",
                label: "Valor do ICMS diferido",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.icms_percentual_diferimento} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values.icms_percentual_diferimento} / 100) * ({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
        ],
    },

    {
        value: "60",
        label: "Cobrado anteriormente por substituição tributária",
        fields: [
            {
                field: "cest",
                label: "CEST",
                type: "number", // int[7]
                xs: 6,
            },
            {
                field: "codigo_beneficio_fiscal",
                label: "Benefício fiscal",
                type: "text",
                xs: 6,
            },
        ],
    },

    {
        value: "70",
        label: "Tributada com redução de base de cálculo e com cobrança do ICMS por substituição tributária",
        fields: [
            {
                field: "cest",
                label: "CEST",
                type: "number", // int[7]
                xs: 6,
            },
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text", xs: 6 },
            {
                field: "_icms_base_calculo_antes_da_reducao",
                label: "Base de Cálculo do ICMS antes da redução",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "icms_reducao_base_calculo",
                label: "Percentual de redução da base de cálculo",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS após a redução",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values.icms_reducao_base_calculo} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota",
                label: "Alíquota do ICMS normal",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "_icms_valor_antes_da_reducao",
                label: "Valor do ICMS normal antes da redução",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * ({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade})",
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS normal",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota} / 100) * ({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.values.icms_reducao_base_calculo} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade})",
                hr: true,
            },
            {
                field: "icms_margem_valor_adicionado_st",
                label: "Percentual da MVA do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo_st",
                label: "Base de Cálculo do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}) * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100))",
                xs: 6,
            },
            {
                field: "icms_aliquota_st",
                label: "Alíquota do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor_st",
                label: "Valor do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: `(({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}) * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100)) * ({formik.values.icms_aliquota_st} / 100)) - ({formik.values.aliquota} / 100) * ({product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade})`,
                xs: 6,
            },
        ],
    },

    {
        value: "90",
        label: "Outras (regime Normal)",
        fields: [
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota",
                label: "Alíquota do ICMS",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
            },
        ],
    },

    { value: "101", label: "Tributada pelo Simples Nacional com permissão de crédito" },

    { value: "102", label: "Tributada pelo Simples Nacional sem permissão de crédito" },

    { value: "103", label: "Isenção do ICMS no Simples Nacional para faixa de receita bruta" },

    {
        value: "201",
        label: "Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por substituição tributária",
        fields: [
            {
                field: "cest",
                label: "CEST",
                type: "number", // int[7]
                xs: 6,
            },
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text", xs: 6 },
            {
                field: "_icms_base_calculo_simulado",
                label: "Base de Cálculo do ICMS normal simulado",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota_icms_simulado",
                label: "Alíquota do ICMS normal simulado",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor_simulado",
                label: "Valor do ICMS normal simulado",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota_icms_simulado} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                hr: true,
            },
            {
                field: "icms_margem_valor_adicionado_st",
                label: "Percentual da MVA do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo_st",
                label: "Base de Cálculo do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100))",
                xs: 6,
            },
            {
                field: "icms_aliquota_st",
                label: "Alíquota do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor_st",
                label: "Valor do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.icms_base_calculo_st} * ({formik.values.icms_aliquota_st} / 100)) - (({formik.values.aliquota_icms_simulado} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade})",
                xs: 6,
            },
        ],
    },

    {
        value: "202",
        label: "Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por substituição tributária",
        fields: [
            {
                field: "cest",
                label: "CEST",
                type: "number", // int[7]
                xs: 6,
            },
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text", xs: 6 },
            {
                field: "_icms_base_calculo_simulado",
                label: "Base de Cálculo do ICMS normal simulado",
                type: "number", // decimal[13.2]
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            {
                field: "aliquota_icms_simulado",
                label: "Alíquota do ICMS normal simulado",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor_simulado",
                label: "Valor do ICMS normal simulado",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.aliquota_icms_simulado} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                hr: true,
            },
            {
                field: "icms_margem_valor_adicionado_st",
                label: "Percentual da MVA do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_base_calculo_st",
                label: "Base de Cálculo do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} * (1 + ({formik.values.icms_margem_valor_adicionado_st} / 100))",
                xs: 6,
            },
            {
                field: "icms_aliquota_st",
                label: "Alíquota do ICMS-ST",
                type: "number", // decimal[3.2-4]
                xs: 6,
            },
            {
                field: "icms_valor_st",
                label: "Valor do ICMS-ST",
                type: "number", // decimal[13.2]
                disabled: true,
                formula:
                    "({formik.values.icms_base_calculo_st} * ({formik.values.icms_aliquota_st} / 100)) - (({formik.values.aliquota_icms_simulado} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade})",
                xs: 6,
            },
        ],
    },

    { value: "203", label: "Isenção do ICMS nos Simples Nacional para faixa de receita bruta e com cobrança do ICMS por substituição tributária" },

    { value: "300", label: "Imune" },

    { value: "400", label: "Não tributada pelo Simples Nacional" },

    { value: "500", label: "ICMS cobrado anteriormente por substituição tributária (substituído) ou por antecipação" },

    { value: "900", label: "Outras (regime Simples Nacional)" },
]

export default icms_situacao_tributaria_values
