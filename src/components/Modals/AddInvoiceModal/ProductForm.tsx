import React, { useState } from "react"
import { Autocomplete, Box, Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Tab, Tabs, TextField, useMediaQuery } from "@mui/material"
import { useProduct } from "../../../hooks/useProduct"
import { FormikErrors, useFormik } from "formik"
import { colors } from "../../../style/colors"
import cofins_options from "./cofins_situacao_tributaria"
import icms_origem_values from "./icms_origem"
import icms_situacao_tributaria_values from "./icms_situacao_tributaria"
import pis_situacao_tributaria from "./pis_situacao_tributaria"
import { PricingBox } from "./PricingBox"

interface ProductFormProps {
    addProduct: (product: InvoiceProduct) => void
    focusNFEInvoiceFormik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const ProductForm: React.FC<ProductFormProps> = ({ addProduct, focusNFEInvoiceFormik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { list } = useProduct()

    const [productFormDisplay, setProductFormDisplay] = useState("produto")
    const [currentProduct, setCurrentProduct] = useState<Product>(list[0])

    const formik = useFormik<InvoiceProduct>({
        initialValues: {
            aliquota: 10,
            cfop: 5102,
            cofins_situacao_tributaria: "01",
            icms_modalidade_base_calculo: 0,
            icms_origem: list[0].icmsOrigin,
            icms_situacao_tributaria: "00",
            id: list[0].id.toString(),
            codigo_externo: list[0].codigo_externo,
            name: list[0].name,
            ncm: list[0].ncm,
            pis_situacao_tributaria: "01",
            quantidade: 1,
            unidade_comercial: "un",
            unidade_tributavel: "un",
            valor_unitario_comercial: 0,
            valor_unitario_tributavel: 0,
        },
        onSubmit: (values) => {
            addProduct({ ...values, unidade_tributavel: values.unidade_comercial, valor_unitario_tributavel: values.valor_unitario_comercial })
            formik.resetForm()
            setProductFormDisplay("produto")
            setCurrentProduct(list[0])
        },
        enableReinitialize: true,
    })

    const activeTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderBottom: `2px solid ${colors.primary}`,
        color: `${colors.primary}`,
        fontWeight: "bold",
    }
    const inactiveTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        backgroundColor: `${colors.background}`,
    }
    const tabLabelBoxStyles = { alignItems: "center" }

    const changeProduct = (product: Product | null) => {
        if (!product) return

        setCurrentProduct(product)
        formik.setFieldValue("id", product.id)
        formik.setFieldValue("name", product.name)
        formik.setFieldValue("ncm", product.ncm)
        formik.setFieldValue("codigo_externo", product.codigo_externo)
    }

    return (
        <Box
            sx={{
                flex: 1,
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                height: "100%",
                maxWidth: "49%",
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
                            <Box sx={tabLabelBoxStyles}>
                                {!isMobile && <Radio checked={productFormDisplay === "produto"} />}
                                <p>Produto</p>
                            </Box>
                        }
                        sx={productFormDisplay === "produto" ? activeTabStyle : inactiveTabStyle}
                    />
                    <Tab
                        value={"tributação"}
                        label={
                            <Box sx={tabLabelBoxStyles}>
                                {!isMobile && <Radio checked={productFormDisplay === "tributação"} />}
                                <p>Tributação</p>
                            </Box>
                        }
                        sx={productFormDisplay === "tributação" ? activeTabStyle : inactiveTabStyle}
                    />
                    <Tab
                        value={"outrosDados"}
                        label={
                            <Box sx={tabLabelBoxStyles}>
                                {!isMobile && <Radio checked={productFormDisplay === "outrosDados"} />}
                                <p>Outros dados</p>
                            </Box>
                        }
                        sx={productFormDisplay === "outrosDados" ? activeTabStyle : inactiveTabStyle}
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
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Quantidade"
                                fullWidth
                                type="number"
                                name="quantidade"
                                value={formik.values.quantidade}
                                onChange={formik.handleChange}
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
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Valor total"
                                fullWidth
                                disabled
                                value={formik.values.quantidade * formik.values.valor_unitario_comercial}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Informações adicionais do produto" fullWidth />
                        </Grid>
                    </Grid>
                    <h4>Integração com pedido de compra</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField label="Ordem de compra" fullWidth />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField label="Nº do item" fullWidth />
                        </Grid>
                    </Grid>
                </Box>
            )}
            {productFormDisplay === "tributação" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="CFOP" name="cfop" value={formik.values.cfop} onChange={formik.handleChange} />
                        </Grid>
                    </Grid>
                    <h3>ICMS</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Origem do ICMS"
                                value={formik.values.icms_origem}
                                name="icms_origem"
                                onChange={formik.handleChange}
                                select
                                disabled
                            >
                                {icms_origem_values.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.value} - {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Modalidade para base de cálculo do ICMS"
                                value={formik.values.icms_modalidade_base_calculo}
                                name="icms_modalidade_base_calculo"
                                onChange={formik.handleChange}
                                select
                            >
                                <MenuItem value={0}>0 - margem de valor agregado (%)</MenuItem>
                                <MenuItem value={1}>1 - pauta (valor)</MenuItem>
                                <MenuItem value={2}>2 - preço tabelado máximo (valor)</MenuItem>
                                <MenuItem value={3}>3 - valor da operação</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Alíquota ICMS"
                                name="aliquota"
                                value={formik.values.aliquota}
                                onChange={formik.handleChange}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Situação Tributária do ICMS"
                                value={formik.values.icms_situacao_tributaria}
                                name="icms_situacao_tributaria"
                                onChange={formik.handleChange}
                                select
                            >
                                {icms_situacao_tributaria_values.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.value} - {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <h3>PIS</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Situação tributária do PIS"
                                value={formik.values.pis_situacao_tributaria}
                                name="pis_situacao_tributaria"
                                onChange={formik.handleChange}
                                select
                            >
                                {pis_situacao_tributaria.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.value} - {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <h3>COFINS</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Situação tributária do COFINS"
                                select
                                value={formik.values.cofins_situacao_tributaria}
                                name="cofins_situacao_tributaria"
                                onChange={formik.handleChange}
                            >
                                {cofins_options.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.value} - {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            )}
            {productFormDisplay === "outrosDados" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <RadioGroup
                                value={focusNFEInvoiceFormik.values.tipo_documento}
                                onChange={(_, value) => focusNFEInvoiceFormik.setFieldValue("tipo_documento", Number(value))}
                                sx={{ flexDirection: isMobile ? "column" : "row", gap: isMobile ? "" : "5vw" }}
                            >
                                <FormControlLabel label="Nota de entrada" control={<Radio value={0} />} />
                                <FormControlLabel label="Nota de saída" control={<Radio value={1} />} />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Finalidade de emissão"
                                name="finalidade_emissao"
                                value={focusNFEInvoiceFormik.values.finalidade_emissao}
                                onChange={focusNFEInvoiceFormik.handleChange}
                                select
                            >
                                <MenuItem value={1}>Normal</MenuItem>
                                <MenuItem value={2}>Complementar</MenuItem>
                                <MenuItem value={3}>Nota de ajuste</MenuItem>
                                <MenuItem value={4}>Devolução</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Local de destino"
                                name="local_destino"
                                value={focusNFEInvoiceFormik.values.local_destino}
                                onChange={focusNFEInvoiceFormik.handleChange}
                                select
                            >
                                <MenuItem value={1}>Operação Interna</MenuItem>
                                <MenuItem value={2}>Operação interestadual</MenuItem>
                                <MenuItem value={3}>Operação no exterior</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Presença do Comprador"
                                name="presenca_comprador"
                                value={focusNFEInvoiceFormik.values.presenca_comprador}
                                onChange={focusNFEInvoiceFormik.handleChange}
                                select
                            >
                                <MenuItem value={0}>Não se aplica</MenuItem>
                                <MenuItem value={1}>Operação presencial</MenuItem>
                                <MenuItem value={2}>Operação não presencial, pela Internet</MenuItem>
                                <MenuItem value={3}>Operação não presencial, Teleatendimento</MenuItem>
                                <MenuItem value={4}>NFC-e em operação com entrega em domicílio</MenuItem>
                                <MenuItem value={9}>Operação não presencial, outros</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <PricingBox formik={focusNFEInvoiceFormik} />
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
