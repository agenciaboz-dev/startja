import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Autocomplete, Box, Button, Grid, MenuItem, Radio, Tab, Tabs, TextField, useMediaQuery } from "@mui/material"
import { useProduct } from "../../../hooks/useProduct"
import { FormikErrors, useFormik } from "formik"
import { tabStyles } from "../../../style/tabStyles"
import { useCurrencyMask, useNumberMask } from "burgos-masks"
import MaskedInput from "../../MaskedInput"
import { unmaskCurrency, unmaskNumber } from "../../../tools/unmaskNumber"
import { TaxValues } from "../../TaxValues"
import { useSnackbar } from "burgos-snackbar"
import icms_situacao_tributaria_values from "./icms_situacao_tributaria"

interface ProductFormProps {
    addProduct: (product: InvoiceProduct) => void
    focusNFEInvoiceFormik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
    nature: Natureza | null
}

export const ProductForm: React.FC<ProductFormProps> = ({ addProduct, focusNFEInvoiceFormik, nature }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const number_mask = useNumberMask({})
    const products = useProduct()
    const { snackbar } = useSnackbar()

    const [productFormDisplay, setProductFormDisplay] = useState("produto")
    const [list, setList] = useState<Product[]>([])
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

    const formik = useFormik<InvoiceProduct>({
        initialValues: {
            cfop: 1101,
            cofins_situacao_tributaria: "01",
            icms_modalidade_base_calculo: 0,
            icms_origem: list.length ? list[0].icmsOrigin : 0,
            icms_situacao_tributaria: "00",
            id: list.length ? list[0].id.toString() : "",
            codigo_externo: list.length ? list[0].codigo_externo : "",
            name: list.length ? list[0].name : "",
            ncm: list.length ? list[0].ncm : "",
            pis_situacao_tributaria: "01",
            // @ts-ignore
            quantidade: "",
            unidade_comercial: "un",
            unidade_tributavel: "un",
            // @ts-ignore
            valor_unitario_comercial: "",
            valor_unitario_tributavel: 0,
            informacoes_adicionais_item: "",
        },
        onSubmit: (values) => {
            if (!values.quantidade) {
                snackbar({ severity: "error", text: "insira a quantidade" })
                return
            }
            if (!values.quantidade) {
                snackbar({ severity: "error", text: "insira o valor unitário" })
                return
            }
            const data = {
                ...values,
                unidade_tributavel: values.unidade_comercial,
                cfop: unmaskCurrency(values.cfop.toString()),
                quantidade: unmaskNumber(values.quantidade),
                valor_unitario_comercial: unmaskCurrency(values.valor_unitario_comercial.toString()),
                valor_unitario_tributavel: unmaskCurrency(values.valor_unitario_comercial.toString()),
            }
            console.log(data)
            addProduct(data)
            formik.resetForm()
            setProductFormDisplay("produto")
            setCurrentProduct(list[0])
        },
        enableReinitialize: true,
    })

    const tax_formik = useMemo(
        () => ({
            ...formik,
            values: {
                ...formik.values,
                origem: focusNFEInvoiceFormik.values.emitente.uf,
                destino: focusNFEInvoiceFormik.values.destinatario.uf,

                products: [],
            },
        }),
        [formik]
    )

    const changeProduct = (product: Product | null) => {
        if (!product) return

        setCurrentProduct(product)
        formik.setFieldValue("id", product.id)
        formik.setFieldValue("name", product.name)
        formik.setFieldValue("ncm", product.ncm)
        formik.setFieldValue("codigo_externo", product.codigo_externo)
    }

    const checkTaxRules = useCallback(() => {
        console.log({ natureza_operação: nature })
        console.log({ Estado: focusNFEInvoiceFormik.values.emitente.uf })
        const tax_rule = nature?.rules.find((rule) => {
         
            const origem = rule.origem == focusNFEInvoiceFormik.values.emitente.uf
            const destino = rule.destino.split(", ").includes(focusNFEInvoiceFormik.values.destinatario.uf)
            const produto = rule.products.find((item) => item.id == currentProduct?.id)
            console.log({ aqui: origem, destino, produto, currentProduct })
            console.log({ ORIGEM_REGRA: rule.origem, EMITENTE: focusNFEInvoiceFormik.values.emitente.uf })
            return origem && destino && produto
        })
        console.log({ tax_rule })

        if (tax_rule) {
            Object.entries(tax_rule).map(([param, value]) => {
                if (["id", "product", "product_id", "origem", "destino"].includes(param)) return
                formik.setFieldValue(param, value)
            })
        }
    }, [currentProduct, nature])

    useEffect(() => {
        const available_products = nature?.rules.flatMap((rule) => rule.products)
        let filtered_products: Product[] = []
        available_products?.map((item) => {
            if (!item || filtered_products.find((product) => product.id == item.id)) return
            filtered_products.push(item)
        })
        setList(filtered_products)
        setCurrentProduct(null)
    }, [nature])

    useEffect(() => {
        const fields = icms_situacao_tributaria_values
            .find((st) => st.value == formik.values.icms_situacao_tributaria)!
            .fields?.map((field) => field.field)

        icms_situacao_tributaria_values
            .map((item) => item.fields?.map((item) => item.field))
            .flatMap((item) => item)
            .map((item) => {
                if (!item) return
                if (fields?.includes(item)) return

                formik.setFieldValue(item, null)
            })
    }, [formik.values.icms_situacao_tributaria])

    useEffect(() => {
        checkTaxRules()
    }, [currentProduct, nature, focusNFEInvoiceFormik.values.emitente.uf, focusNFEInvoiceFormik.values.destinatario.uf])

    return (
        <Box
            sx={{
                flex: 1,
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                height: "100%",
                maxWidth: isMobile ? "100%" : "49%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Tabs
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ width: "100%" }}
                    onChange={(_, value) => setProductFormDisplay(value)}
                    value={productFormDisplay}
                >
                    <Tab
                        value={"produto"}
                        label={
                            <Box sx={tabStyles.label}>
                                {!isMobile && <Radio checked={productFormDisplay === "produto"} />}
                                <p>Produto</p>
                            </Box>
                        }
                        sx={productFormDisplay === "produto" ? tabStyles.active : tabStyles.inactive}
                    />
                    <Tab
                        value={"tributação"}
                        disabled={!formik.values.quantidade || !formik.values.valor_unitario_comercial || !currentProduct}
                        label={
                            <Box sx={tabStyles.label}>
                                {!isMobile && <Radio checked={productFormDisplay === "tributação"} />}
                                <p>Tributação</p>
                            </Box>
                        }
                        sx={productFormDisplay === "tributação" ? tabStyles.active : tabStyles.inactive}
                    />
                </Tabs>
            </Box>
            {productFormDisplay === "produto" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                options={list}
                                getOptionLabel={(option) => `${option.codigo_externo} - ${option.name}`}
                                renderInput={(params) => <TextField {...params} label="Produto" />}
                                value={currentProduct}
                                onChange={(_, value) => changeProduct(value)}
                                isOptionEqualToValue={(option, value) => option.id == value.id}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Quantidade"
                                fullWidth
                                name="quantidade"
                                value={formik.values.quantidade}
                                onChange={formik.handleChange}
                                // @ts-ignore
                                InputProps={{
                                    inputComponent: MaskedInput,
                                    inputProps: {
                                        mask: useNumberMask({ allowDecimal: true, decimalLimit: 6 }),
                                        inputMode: "numeric",
                                    },
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Unidade"
                                fullWidth
                                name="unidade_comercial"
                                value={formik.values.unidade_comercial}
                                onChange={formik.handleChange}
                                select
                            >
                                <MenuItem value="un">unidade(s)</MenuItem>
                                <MenuItem value="bdj">bandeja(s)</MenuItem>
                                <MenuItem value="cx">caixa(s)</MenuItem>
                                <MenuItem value="dz">dúzia(s)</MenuItem>
                                <MenuItem value="g">grama(s)</MenuItem>
                                <MenuItem value="L">litro(s)</MenuItem>
                                <MenuItem value="saca">saca(s)</MenuItem>
                                <MenuItem value="Kg">Kg</MenuItem>
                                <MenuItem value="Ton">Ton</MenuItem>
                                <MenuItem value="Cb">Cb</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Valor unitário"
                                fullWidth
                                name="valor_unitario_comercial"
                                value={formik.values.valor_unitario_comercial}
                                onChange={formik.handleChange}
                                // @ts-ignore
                                InputProps={{
                                    inputComponent: MaskedInput,
                                    inputProps: { mask: useCurrencyMask({ decimalLimit: 6 }), inputMode: "numeric" },
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Valor total"
                                fullWidth
                                value={Number(
                                    (
                                        unmaskNumber(formik.values.quantidade) *
                                        unmaskCurrency(formik.values.valor_unitario_comercial)
                                    ).toFixed(2)
                                )}
                                InputProps={{ startAdornment: <>R$</>, sx: { gap: "0.3rem" } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Informações adicionais do produto"
                                fullWidth
                                name="informacoes_adicionais_item"
                                value={formik.values.informacoes_adicionais_item}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                    {/* <h3>Integração com pedido de compra</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Ordem de compra" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Nº do item" fullWidth />
                            </Grid>
                        </Grid> */}
                </Box>
            )}
            {productFormDisplay === "tributação" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                    }}
                >
                    <TaxValues formik={tax_formik} product_formik={formik} isInvoice />
                </Box>
            )}
            <Button
                variant="contained"
                onClick={formik.submitForm}
                sx={{
                    alignSelf: "end",
                    borderRadius: "20px",
                    textTransform: "unset",
                    marginTop: "auto",
                }}
            >
                Adicionar produto
            </Button>
        </Box>
    )
}
