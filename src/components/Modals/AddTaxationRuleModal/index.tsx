import React, { useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem, Autocomplete } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useFormik } from "formik"
import { estados } from "../../../tools/estadosBrasil"
import { useProduct } from "../../../hooks/useProduct"
import { TaxRulesForm } from "../../../definitions/TaxRulesForm"
import { useSnackbar } from "burgos-snackbar"
import { TaxValues } from "../../TaxValues"
import icms_situacao_tributaria_values from "../AddInvoiceModal/icms_situacao_tributaria"

interface AddTaxationRuleModalProps {
    open: boolean
    onClose: () => void
    addTaxRule: (rule: TaxRulesForm) => void
}

const AddTaxationRuleModal: React.FC<AddTaxationRuleModalProps> = ({ open, onClose, addTaxRule }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const pStyles = { minWidth: "fit-content" }
    const selectStyles = { maxWidth: isMobile ? "100%" : "10vw" }
    const product = useProduct()
    const { snackbar } = useSnackbar()

    const formik = useFormik<TaxRulesForm>({
        initialValues: {
            cfop: 0,
            icms_modalidade_base_calculo: 0,
            cofins_situacao_tributaria: "01",
            icms_situacao_tributaria: "00",
            pis_situacao_tributaria: "01",

            origem: "",
            destino: "",
            product_id: 0
        },
        onSubmit(values, formikHelpers) {
            const additional_fields = icms_situacao_tributaria_values.find((item) => item.value == values.icms_situacao_tributaria)?.fields || []
            const data: TaxRulesForm = {
                ...values,
                cfop: Number(values.cfop)
            }
            additional_fields.map((field) => {
                // @ts-ignore
                data[field.field] = values[field.field]
            })

            console.log(data)
            addTaxRule(data)
            onClose()
            formik.resetForm()
        },
        enableReinitialize: true
    })

    useEffect(() => {
        if (formik.values.product_id) {
            const icms_origem = product.list.find((item) => item.id == formik.values.product_id)!.icmsOrigin
            formik.setFieldValue("icms_origem", icms_origem)
        }
    }, [formik.values.product_id])

    useEffect(() => {
        formik.setFieldValue("cfop", formik.values.origem == formik.values.destino ? 5101 : 6101)
    }, [formik.values.origem, formik.values.destino])

    useEffect(() => {
        if (!!product.list.length) formik.setFieldValue("product_id", product.list[0].id)
    }, [])

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
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                            width: "100%"
                        }}>
                        <Box
                            sx={{
                                height: "fit-content",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1vw",
                                flexDirection: isMobile ? "column" : ""
                            }}>
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
                                value={formik.values.origem}>
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
                                value={formik.values.destino}>
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
                                            minWidth: "20vw"
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

                        <TaxValues formik={formik} />
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
