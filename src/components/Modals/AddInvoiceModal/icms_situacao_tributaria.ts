export const icms_situacao_tributaria_values: {
    value: string
    label: string
    fields?: CustomTaxFields[]
}[] = [
    {
        value: "00",
        label: "Tributada integralmente",
        fields: [
            { field: "aliquota", label: "Alíquota ICMS", type: "number", xs: 6 },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number",
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
        ],
    },

    {
        value: "10",
        label: "Tributada e com cobrança do ICMS por substituição tributária",
        fields: [
            { field: "cest", label: "CEST", type: "number", xs: 6 },
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text", xs: 6 },
            {
                field: "icms_modalidade_base_calculo",
                label: "Modalidade para Base de Cálculo do ICMS",
                type: "text",
                disabled: true,
                formula: "1",
                xs: 6,
            },
            { field: "valor_unitario_pauta", label: "Valor unitário da pauta", type: "text", xs: 6 },
            // valor unitário da pauta não encontrado no NotaFiscalXML.html, tirar essa dúvida
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo ICMS",
                type: "text",
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 4,
            },
            { field: "aliquota", label: "Alíquota ICMS", type: "number", xs: 4 },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number",
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {formik.values.icms_base_calculo}",
                xs: 4,
            },
            {
                field: "icms_base_calculo_st",
                label: "Base de Cálculo ICMS-ST",
                type: "text",
                disabled: true,
                // formula: no sistema anterior, parece ser {product_formik.values.quantidade} * {formik.values.valor_unitario_pauta}, é preciso tirar a dúvida
                xs: 4,
            },
            { field: "icms_aliquota_st", label: "Alíquota ICMS-ST", type: "number", xs: 4 },
            {
                field: "icms_valor_st",
                label: "Valor do ICMS-ST",
                type: "number",
                disabled: true,
                // formula: "({formik.values.icms_aliquota_st} / 100) * {formik.values.icms_base_calculo_st} - {formik.values.icms_valor}",
                // esta fórmula foi inferida observando o sistema anterior, não é certeza, necessário tirar a dúvida
                xs: 4,
            },
        ],
    },

    {
        value: "20",
        label: "Tributada com redução de base de cálculo",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            { field: "icms_reducao_base_calculo", label: "Percentual de redução da base de cálculo", type: "number", xs: 6 },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo ICMS",
                type: "text",
                disabled: true,
                formula:
                    "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.icms_reducao_base_calculo} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            { field: "aliquota", label: "Alíquota ICMS", type: "number", xs: 6 },
            {
                field: "icms_valor",
                label: "Valor do ICMS da operação",
                type: "text",
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {formik.icms_base_calculo}",
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number",
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {formik.icms_base_calculo}",
            },
            // os dois campos acima estão iguais, mas os dois constam no sistema anterior, perguntar para o cliente se podemos remover um deles
        ],
    },

    { value: "30", label: "Isenta ou não tributada e com cobrança do ICMS por substituição tributária" },

    {
        value: "40",
        label: "Isenta",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            { field: "icms_valor_desonerado", label: "Valor do ICMS desonerado", type: "number" },
        ],
    },

    {
        value: "41",
        label: "Não tributada",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            { field: "icms_valor_desonerado", label: "Valor do ICMS desonerado", type: "number" },
        ],
    },

    {
        value: "50",
        label: "Suspensão",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            { field: "icms_valor_desonerado", label: "Valor do ICMS desonerado", type: "number" },
        ],
    },

    {
        value: "51",
        label: "Diferimento (a exigência do preenchimento das informações do ICMS diferido fica a critério de cada UF)",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            { field: "icms_reducao_base_calculo", label: "Percentual de redução da base de cálculo", type: "number", xs: 6 },
            {
                field: "icms_base_calculo",
                label: "Base de Cálculo ICMS",
                type: "text",
                disabled: true,
                formula: "{product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade} - ({formik.icms_reducao_base_calculo} / 100) * {product_formik.values.valor_unitario_comercial} * {product_formik.values.quantidade}",
                xs: 6,
            },
            { field: "aliquota", label: "Alíquota ICMS", type: "number", xs: 6 },
            {
                field: "icms_valor_operacao",
                label: "Valor do ICMS da operação",
                type: "text",
                disabled: true,
                formula: "({formik.values.aliquota} / 100) * {formik.icms_base_calculo}",
                xs: 6,
            },
            { field: "icms_percentual_diferimento", label: "Percentual de diferimento", type: "number", xs: 6 },
            {
                field: "icms_valor_diferido",
                label: "Valor do ICMS diferido",
                type: "number",
                disabled: true,
                formula: "({formik.values.icms_percentual_diferimento} / 100) * {formik.icms_valor_operacao}",
                xs: 6,
            },
            {
                field: "icms_valor",
                label: "Valor do ICMS",
                type: "number",
                disabled: true,
                formula: "{formik.icms_valor_operacao} - {formik.icms_valor_diferido}",
            },
        ],
    },

    {
        value: "60",
        label: "Cobrado anteriormente por substituição tributária",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            // {
            //     field: "icms_origem",
            //     label: "Origem da Mercadoria",
            //     select: true,
            //     options: [
            //         { value: 0, label: "Nacional - Exceto as indicadas nos códigos 3, 4, 5 e 8" },
            //         { value: 1, label: "Estrangeira - Importação direta, exceto a indicada no código 6" },
            //         { value: 2, label: "Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7" },
            //         { value: 3, label: "Nacional - Mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%" },
            //         {
            //             value: 4,
            //             label: "Nacional - Produção feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes",
            //         },
            //         { value: 5, label: "Nacional - Mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%" },
            //         { value: 6, label: "Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural" },
            //         { value: 7, label: "Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural" },
            //         { value: 8, label: "Nacional - Mercadoria ou bem com Conteúdo de Importação superior a 70%" },
            //     ],
            // },
            { field: "cest", label: "CEST", type: "number" },
        ],
    },

    { value: "70", label: "Tributada com redução de base de cálculo e com cobrança do ICMS por substituição tributária" },

    {
        value: "90",
        label: "Outras (regime Normal)",
        fields: [
            { field: "codigo_beneficio_fiscal", label: "Benefício fiscal", type: "text" },
            // {
            //     field: "icms_origem",
            //     label: "Origem da Mercadoria",
            //     select: true,
            //     options: [
            //         { value: 0, label: "Nacional - Exceto as indicadas nos códigos 3, 4, 5 e 8" },
            //         { value: 1, label: "Estrangeira - Importação direta, exceto a indicada no código 6" },
            //         { value: 2, label: "Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7" },
            //         { value: 3, label: "Nacional - Mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%" },
            //         {
            //             value: 4,
            //             label: "Nacional - Produção feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes",
            //         },
            //         { value: 5, label: "Nacional - Mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%" },
            //         { value: 6, label: "Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural" },
            //         { value: 7, label: "Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural" },
            //         { value: 8, label: "Nacional - Mercadoria ou bem com Conteúdo de Importação superior a 70%" },
            //     ],
            // },
        ],
    },

    { value: "101", label: "Tributada pelo Simples Nacional com permissão de crédito" },

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
