import React, { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem, Autocomplete } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useFormik } from "formik"
import { estados } from "../../../tools/estadosBrasil"
import { useProduct } from "../../../hooks/useProduct"
import { TaxRulesForm } from "../../../definitions/TaxRulesForm"
import { useSnackbar } from "burgos-snackbar"
import { TaxValues } from "../../TaxValues"
import icms_situacao_tributaria_values from "../AddInvoiceModal/icms_situacao_tributaria"
import { uid } from "uid"

interface AddTaxationRuleModalProps {
    open: boolean
    onClose: () => void
    addTaxRule: (rule: TaxRulesForm) => void
    current_rule?: TaxRulesForm
}

const random_id = uid()

const AddTaxationRuleModal: React.FC<AddTaxationRuleModalProps> = ({ open, onClose, addTaxRule, current_rule }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const pStyles = { minWidth: "fit-content" }
    const selectStyles = { maxWidth: isMobile ? "100%" : "10vw" }
    const product = useProduct()
    const { snackbar } = useSnackbar()

    const [selectedProducts, setSelectedProducts] = useState<Product[]>(current_rule?.products || [])
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>(current_rule?.destino.split(", ") || [])

    const formik = useFormik<TaxRulesForm>({
        initialValues: current_rule || {
            id: random_id,
            cfop: 0,
            icms_modalidade_base_calculo: 0,
            cofins_situacao_tributaria: "01",
            icms_situacao_tributaria: "00",
            pis_situacao_tributaria: "01",

            origem: "",
            destino: "",

            products: [],
        },
        onSubmit(values, formikHelpers) {
            if (!selectedProducts.length) return

            const additional_fields = icms_situacao_tributaria_values.find((item) => item.value == values.icms_situacao_tributaria)?.fields || []
            const data: TaxRulesForm = {
                ...values,
                cfop: Number(values.cfop),
                icms_origem: selectedProducts[0].icmsOrigin,
                products: selectedProducts,
                destino: selectedDestinations.join(", "),
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
        enableReinitialize: true,
    })

    const handleDestinationsChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // @ts-ignore
        const value = event.target.value as string[]
        setSelectedDestinations(value)
        console.log(value)
    }

    useEffect(() => {
        formik.setFieldValue("cfop", formik.values.origem == formik.values.destino ? 5101 : 6101)
    }, [formik.values.origem, formik.values.destino])

    useEffect(() => {
        setSelectedProducts(current_rule?.products || [])
        setSelectedDestinations(current_rule?.destino.split(", ") || [])
    }, [current_rule])

    useEffect(() => {
        if (!!product.list.length && !current_rule) formik.setFieldValue("product_id", product.list[0].id)
        if (current_rule) console.log(current_rule)
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
                <DialogTitle>{current_rule ? "Editar Regra de Tributação" : "Adicionar Regra de Tributação"}</DialogTitle>
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
                                value={selectedDestinations}
                                onChange={(event) => handleDestinationsChange(event)}
                                SelectProps={{
                                    renderValue: (selected: string[]) =>
                                        estados
                                            .filter((item) => selected.includes(item.value))
                                            .map((item) => item.value)
                                            .join(", "),
                                    multiple: true,
                                    MenuProps: { MenuListProps: { sx: { width: "100%" } } },
                                }}
                                sx={selectStyles}
                                name="destino"
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
                                isOptionEqualToValue={(option, value) => option.id == value.id}
                                multiple
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Produto"
                                        variant="standard"
                                        sx={{
                                            minWidth: "20vw",
                                        }}
                                    />
                                )}
                                value={selectedProducts}
                                onChange={(_, value) => setSelectedProducts(value)}
                            />
                        </Box>

                        <p>Use a regra de tributação a seguir:</p>

                        <TaxValues formik={formik} />
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
                            marginRight: isMobile ? "" : "auto",
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
                        {current_rule ? "Salvar" : "Adicionar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddTaxationRuleModal
