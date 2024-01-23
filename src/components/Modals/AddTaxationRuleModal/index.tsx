import React, { useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem, Autocomplete } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useFormik } from "formik"
import icms_situacao_tributaria_values from "../AddInvoiceModal/icms_situacao_tributaria"
import pis_situacao_tributaria from "../AddInvoiceModal/pis_situacao_tributaria"
import cofins_options from "../AddInvoiceModal/cofins_situacao_tributaria"
import { useNumberMask } from "burgos-masks"
import MaskedInput from "../../MaskedInput"
import { estados } from "../../../tools/estadosBrasil"
import { useProduct } from "../../../hooks/useProduct"
import { TaxRulesForm } from "../../../definitions/TaxRulesForm"
import { useSnackbar } from "burgos-snackbar"

interface AddTaxationRuleModalProps {
    open: boolean
    onClose: () => void
    addTaxRule: (rule: TaxRulesForm) => void
}

const AddTaxationRuleModal: React.FC<AddTaxationRuleModalProps> = ({ open, onClose, addTaxRule }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const pStyles = { minWidth: "fit-content" }
    const selectStyles = { maxWidth: isMobile ? "100%" : "10vw" }
    const number_mask = useNumberMask({ allowDecimal: true, decimalLimit: 2 })
    const product = useProduct()
    const { snackbar } = useSnackbar()

    const formik = useFormik<TaxRulesForm>({
        initialValues: {
            aliquota: 10,
            cfop: 5102,
            icms_modalidade_base_calculo: 0,
            cofins_situacao_tributaria: "01",
            icms_situacao_tributaria: "00",
            pis_situacao_tributaria: "01",

            origem: "",
            destino: "",
            product_id: 0
        },
        onSubmit(values, formikHelpers) {
            if (values.cfop.toString().length != 4) {
                snackbar({ severity: "warning", text: "cfop inválido" })
                return
            }
            console.log(values)
            const data: TaxRulesForm = { ...values, aliquota: Number(values.aliquota), cfop: Number(values.cfop) }
            addTaxRule(data)
            onClose()
            formik.resetForm()
        },
        enableReinitialize: true
    })

    useEffect(() => {
        if (!!product.list.length) formik.setFieldValue("product_id", product.list[0].id)
    }, [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center",
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "80vw",
                    width: "fit-content",
                },
            }}
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar Regra de Tributação</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                />

                <DialogContent>
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                height: "fit-content",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1vw",
                                flexDirection: isMobile ? "column" : "",
                            }}
                        >
                            <p style={pStyles}>Quando sair de</p>
                            <TextField
                                select
                                label="UF"
                                variant="standard"
                                size="small"
                                name="origem"
                                onChange={formik.handleChange}
                                fullWidth
                                required
                                sx={selectStyles}
                                value={formik.values.origem}
                            >
                                <MenuItem value="" sx={{ display: "none" }}></MenuItem>
                                {estados.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <p style={pStyles}>para</p>
                            <TextField
                                select
                                label="UF"
                                variant="standard"
                                required
                                fullWidth
                                sx={selectStyles}
                                onChange={formik.handleChange}
                                name="destino"
                                value={formik.values.destino}
                            >
                                <MenuItem value="" sx={{ display: "none" }}></MenuItem>
                                {estados.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <p style={pStyles}> e quando for</p>
                            <Autocomplete
                                disablePortal
                                options={product.list}
                                getOptionLabel={(option) => `${option.codigo_externo} - ${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Produto"
                                        variant="standard"
                                        name="product_id"
                                        sx={{
                                            minWidth: "20vw",
                                        }}
                                    />
                                )}
                                value={product.list.find((item) => item.id == formik.values.product_id) || product.list[0]}
                                onChange={(_, value) => {
                                    if (value) formik.setFieldValue("product_id", value.id)
                                }}
                            />
                        </Box>

                        <p>Use a regra de tributação a seguir:</p>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="CFOP"
                                    name="cfop"
                                    value={formik.values.cfop}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        // @ts-ignore
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: [/\d/, /\d/, /\d/, /\d/], inputMode: "numeric" },
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <h3>ICMS</h3>
                        <Grid container spacing={2}>
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
                                    InputProps={{
                                        // @ts-ignore
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: number_mask, inputMode: "numeric" },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                </DialogContent>

                <DialogActions
                    sx={{
                        margin: "0.5vw",
                    }}
                >
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        Adicionar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddTaxationRuleModal
