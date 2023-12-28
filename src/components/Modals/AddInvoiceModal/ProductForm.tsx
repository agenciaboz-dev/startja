import React, { useState } from "react"
import { Autocomplete, Box, Button, Grid, MenuItem, Radio, Tab, Tabs, TextField, useMediaQuery } from "@mui/material"
import { useProduct } from "../../../hooks/useProduct"
import { useFormik } from "formik"
import { colors } from "../../../style/colors"
import cofins_options from "./cofins_situacao_tributaria"
import icms_origem_values from "./icms_origem"
import icms_situacao_tributaria_values from "./icms_situacao_tributaria"
import pis_situacao_tributaria from "./pis_situacao_tributaria"

interface ProductFormProps {
    addProduct: (product: InvoiceProduct) => void
}

export const ProductForm: React.FC<ProductFormProps> = ({ addProduct }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { list } = useProduct()

    const [rightSideDisplay, setRightSideDisplay] = useState("produto")
    const [currentProduct, setCurrentProduct] = useState<Product>(list[0])

    const formik = useFormik<InvoiceProduct>({
        initialValues: {
            aliquota: 0,
            cfop: 0,
            cofins_situacao_tributaria: "01",
            icms_modalidade_base_calculo: 0,
            icms_origem: 0,
            icms_situacao_tributaria: "00",
            id: "",
            name: "",
            ncm: "",
            pis_situacao_tributaria: "01",
            quantidade: 1,
            unidade_comercial: "un",
            unidade_tributavel: "un",
            valor_unitario_comercial: 0,
            valor_unitario_tributavel: 0
        },
        onSubmit: (values) => {
            addProduct(values)
            formik.resetForm()
            setRightSideDisplay("produto")
            setCurrentProduct(list[0])
        },
        enableReinitialize: true
    })

    const activeTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderBottom: `2px solid ${colors.primary}`,
        color: `${colors.primary}`,
        fontWeight: "bold"
    }
    const inactiveTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        backgroundColor: `${colors.background}`
    }
    const tabLabelBoxStyles = { alignItems: "center" }

    const changeProduct = (product: Product | null) => {
        if (!product) return

        setCurrentProduct(product)
        formik.setFieldValue("id", product.id)
        formik.setFieldValue("name", product.name)
        formik.setFieldValue("ncm", product.ncm)
    }

    return (
        <Box
            sx={{
                flex: 1,
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw"
            }}>
            <h3>Adicionar Produto</h3>

            <Box
                sx={{
                    width: "100%"
                }}>
                <Tabs
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ width: "100%" }}
                    onChange={(_, value) => setRightSideDisplay(value)}
                    value={rightSideDisplay}>
                    <Tab
                        value={"produto"}
                        label={
                            <Box sx={tabLabelBoxStyles}>
                                <Radio checked={rightSideDisplay === "produto"} />
                                <p>Produto</p>
                            </Box>
                        }
                        sx={rightSideDisplay === "produto" ? activeTabStyle : inactiveTabStyle}
                    />
                    <Tab
                        value={"tributação"}
                        label={
                            <Box sx={tabLabelBoxStyles}>
                                <Radio checked={rightSideDisplay === "tributação"} />
                                <p>Tributação</p>
                            </Box>
                        }
                        sx={rightSideDisplay === "tributação" ? activeTabStyle : inactiveTabStyle}
                    />
                </Tabs>
            </Box>
            {rightSideDisplay === "produto" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw"
                    }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                options={list}
                                getOptionLabel={(option) => `${option.ncm} - ${option.name}`}
                                renderInput={(params) => <TextField {...params} label="Produtos" />}
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
                                label="Unidade comercial"
                                fullWidth
                                name="unidade_comercial"
                                value={formik.values.unidade_comercial}
                                onChange={formik.handleChange}
                            />
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
                    <Button
                        variant="outlined"
                        sx={{
                            alignSelf: "end",
                            borderRadius: "20px",
                            textTransform: "unset"
                        }}>
                        Próximo
                    </Button>
                </Box>
            )}
            {rightSideDisplay === "tributação" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw"
                    }}>
                    <TextField
                        label="icms_modalidade_base_calculo"
                        value={formik.values.icms_modalidade_base_calculo}
                        name="icms_modalidade_base_calculo"
                        onChange={formik.handleChange}
                        select>
                        <MenuItem value={0}>0 - margem de valor agregado (%)</MenuItem>
                        <MenuItem value={1}>1 - pauta (valor)</MenuItem>
                        <MenuItem value={2}>2 - preço tabelado máximo (valor)</MenuItem>
                        <MenuItem value={3}>3 - valor da operação</MenuItem>
                    </TextField>
                    <TextField label="icms_origem" value={formik.values.icms_origem} name="icms_origem" onChange={formik.handleChange} select>
                        {icms_origem_values.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.value} - {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="icms_situacao_tributaria"
                        value={formik.values.icms_situacao_tributaria}
                        name="icms_situacao_tributaria"
                        onChange={formik.handleChange}
                        select>
                        {icms_situacao_tributaria_values.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.value} - {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="pis_situacao_tributaria"
                        value={formik.values.pis_situacao_tributaria}
                        name="pis_situacao_tributaria"
                        onChange={formik.handleChange}
                        select>
                        {pis_situacao_tributaria.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.value} - {item.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="CFOP" fullWidth name="cfop" value={formik.values.cfop} onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Situação tributária (CST)"
                                fullWidth
                                select
                                value={formik.values.cofins_situacao_tributaria}
                                name="cofins_situacao_tributaria"
                                onChange={formik.handleChange}>
                                {cofins_options.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.value} - {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Alíquota ICMS"
                                fullWidth
                                name="aliquota"
                                value={formik.values.aliquota}
                                onChange={formik.handleChange}
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={formik.submitForm}
                        sx={{
                            alignSelf: "end",
                            borderRadius: "20px",
                            textTransform: "unset"
                        }}>
                        Adicionar
                    </Button>
                </Box>
            )}
        </Box>
    )
}
