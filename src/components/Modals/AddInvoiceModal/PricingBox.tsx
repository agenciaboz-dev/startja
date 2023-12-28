import React from "react"
import { Box, TextField } from "@mui/material"

interface PricingBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const PricingBox: React.FC<PricingBoxProps> = ({ formik }) => {
    return (
        <Box sx={{ flexDirection: "column", border: "1px solid blue", gap: "1vw" }}>
            <TextField label="frete" name="valor.frete" value={formik.values.valor.frete} onChange={formik.handleChange} required type="number" />
            <TextField label="seguro" name="valor.seguro" value={formik.values.valor.seguro} onChange={formik.handleChange} required type="number" />
        </Box>
    )
}
