import React from "react"
import { Box, Grid, TextField, useMediaQuery } from "@mui/material"

interface PricingBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const PricingBox: React.FC<PricingBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
                // border: "1px solid blue",
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
