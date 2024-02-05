import React from "react"
import { Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"
import { indicador_pagamento, forma_pagamento } from "../AddInvoiceModal/formas_pagamento"

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
                    <TextField
                        fullWidth
                        label="Condição de pagamento"
                        select
                        required
                        // value={formik.values.condicaoPagamento}
                        onChange={formik.handleChange}
                        name="condicaoPagamento"
                    >
                        {indicador_pagamento.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Tipo de pagamento"
                        select
                        required
                        // value={formik.values.tipoPagamento}
                        onChange={formik.handleChange}
                        name="tipoPagamento"
                    >
                        {forma_pagamento.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    )
}
