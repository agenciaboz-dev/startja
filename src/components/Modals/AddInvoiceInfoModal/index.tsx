import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Grid,
    useMediaQuery,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { PricingBox } from "../AddInvoiceModal/PricingBox"
import { PaymentBox } from "../AddInvoiceModal/paymentBox"
import { FormikErrors } from "formik"

interface AddInvoiceInfoModalProps {
    open: boolean
    onClose: () => void
    focusNFEInvoiceFormik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

const AddInvoiceInfoModal: React.FC<AddInvoiceInfoModalProps> = ({ open, onClose, focusNFEInvoiceFormik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

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
            <DialogTitle>Adicionar informações</DialogTitle>
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
                        width: "100%",
                        flexDirection: isMobile ? "column" : "",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <RadioGroup
                            value={focusNFEInvoiceFormik.values.tipo_documento}
                            onChange={(_, value) => focusNFEInvoiceFormik.setFieldValue("tipo_documento", Number(value))}
                            sx={{ flexDirection: isMobile ? "column" : "row", gap: isMobile ? "" : "5vw" }}
                        >
                            <FormControlLabel label="Nota de entrada" control={<Radio value={0} />} />
                            <FormControlLabel label="Nota de saída" control={<Radio value={1} />} />
                        </RadioGroup>
                        <PaymentBox formik={focusNFEInvoiceFormik} />
                        <PricingBox formik={focusNFEInvoiceFormik} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Local de destino"
                                    name="local_destino"
                                    value={focusNFEInvoiceFormik.values.local_destino}
                                    onChange={focusNFEInvoiceFormik.handleChange}
                                    select
                                >
                                    <MenuItem value={1}>1 - Operação Interna</MenuItem>
                                    <MenuItem value={2}>2 - Operação interestadual</MenuItem>
                                    <MenuItem value={3}>3 - Operação no exterior</MenuItem>
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
                                    <MenuItem value={0}>0 - Não se aplica</MenuItem>
                                    <MenuItem value={1}>1 - Operação presencial</MenuItem>
                                    <MenuItem value={2}>2 - Operação não presencial, pela Internet</MenuItem>
                                    <MenuItem value={3}>3 - Operação não presencial, Teleatendimento</MenuItem>
                                    <MenuItem value={4}>4 - NFC-e em operação com entrega em domicílio</MenuItem>
                                    <MenuItem value={5}>5 - Operação presencial, fora do estabelecimento</MenuItem>
                                    <MenuItem value={9}>9 - Operação não presencial, outros</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Informações adicionais da nota"
                                    name="informacoes_adicionais_contribuinte"
                                    value={focusNFEInvoiceFormik.values.informacoes_adicionais_contribuinte}
                                    onChange={focusNFEInvoiceFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    margin: isMobile ? "0" : "0.5vw",
                    padding: isMobile ? "5vw" : "",
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
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddInvoiceInfoModal
