import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useFormik } from "formik"
import icms_situacao_tributaria_values from "../AddInvoiceModal/icms_situacao_tributaria"
import pis_situacao_tributaria from "../AddInvoiceModal/pis_situacao_tributaria"
import cofins_options from "../AddInvoiceModal/cofins_situacao_tributaria"
import { useNumberMask } from "burgos-masks"
import MaskedInput from "../../MaskedInput"

interface AddTaxationRuleModalProps {
    open: boolean
    onClose: () => void
}

const AddTaxationRuleModal: React.FC<AddTaxationRuleModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const pStyles = { minWidth: "fit-content" }
    const selectStyles = { maxWidth: isMobile ? "100%" : "10vw" }
    const number_mask = useNumberMask({})

    const formik = useFormik({
        initialValues: {
            aliquota: 10,
            cfop: 5102,
            cofins_situacao_tributaria: "01",
            icms_modalidade_base_calculo: 0,
            icms_situacao_tributaria: "00",
            pis_situacao_tributaria: "01"
        },
        onSubmit(values, formikHelpers) {
            console.log(values)
        },
        enableReinitialize: true
    })

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center"
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "80vw",
                    width: "fit-content"
                }
            }}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar Regra de Tributação</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        cursor: "pointer"
                    }}
                    onClick={onClose}
                />

                <DialogContent>
                    <Box
                        sx={{
                            alignItems: "center",
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                            width: "100%"
                        }}>
                        <Box
                            sx={{
                                height: "fit-content",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "baseline",
                                gap: "0.5vw",
                                flexDirection: isMobile ? "column" : ""
                            }}>
                            <p style={pStyles}>Quando sair de</p>
                            <TextField select label="UF" variant="standard" size="small" fullWidth sx={selectStyles} value={1}>
                                <MenuItem value={1}>eita</MenuItem>
                            </TextField>
                            <p style={pStyles}>para</p>
                            <TextField select label="UF" variant="standard" fullWidth sx={selectStyles} value={1}>
                                <MenuItem value={1}>eita</MenuItem>
                            </TextField>
                            <p style={pStyles}> e quando for</p>
                            <TextField select label="Produto" variant="standard" fullWidth sx={selectStyles} value={1}>
                                <MenuItem value={1}>eita</MenuItem>
                            </TextField>
                        </Box>

                        <p>Use a regra de tributação a seguir:</p>

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
                                    label="Modalidade para base de cálculo do ICMS"
                                    value={formik.values.icms_modalidade_base_calculo}
                                    name="icms_modalidade_base_calculo"
                                    onChange={formik.handleChange}
                                    select>
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
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: number_mask, inputMode: "numeric" }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    fullWidth
                                    label="Situação Tributária do ICMS"
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
                                    select>
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
                                    onChange={formik.handleChange}>
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
                        margin: "0.5vw"
                    }}>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        Adicionar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddTaxationRuleModal
