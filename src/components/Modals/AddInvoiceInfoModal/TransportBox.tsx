import React from "react"
import { Box, Grid, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"

interface TransportBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const TransportBox: React.FC<TransportBoxProps> = ({ formik }) => {
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
                        label="Frete"
                        name="valor.frete"
                        value={formik.values.valor.frete}
                        onChange={formik.handleChange}
                        required
                        type="number"
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Seguro"
                        name="valor.seguro"
                        value={formik.values.valor.seguro}
                        onChange={formik.handleChange}
                        required
                        type="number"
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
