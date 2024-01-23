import React from "react"
import { Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"

interface PaymentBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const PaymentBox: React.FC<PaymentBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField fullWidth label="Condição de pagamento" select required>
                        <MenuItem value={"vista"}>À vista</MenuItem>
                        <MenuItem value={"prazo"}>A prazo</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField fullWidth label="Tipo de pagamento" select required>
                        <MenuItem value={"pix"}>PIX</MenuItem>
                        <MenuItem value={"cartaoDeCredito"}>Cartão de crédito</MenuItem>
                        <MenuItem value={"cartaoDeDebito"}>Cartão de débito</MenuItem>
                        <MenuItem value={"dinheiro"}>Dinheiro</MenuItem>
                        <MenuItem value={"cheque"}>Cheque</MenuItem>
                        <MenuItem value={"boletoBancario"}>Boleto bancário</MenuItem>
                        <MenuItem value={"depositoBancario"}>Depósito bancário</MenuItem>
                        <MenuItem value={"transferenciaBancaria"}>Transferência bancária</MenuItem>
                        <MenuItem value={"semPagamento"}>Sem pagamento</MenuItem>
                        <MenuItem value={"outros"}>Outros</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    )
}
