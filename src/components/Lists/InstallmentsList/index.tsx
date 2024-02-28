import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { InstallmentRow } from "./InstallmentRow"

interface InstallmentsListProps {
    installmentsArray: { id: number; value: string; expiry: string }[]
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const InstallmentsList: React.FC<InstallmentsListProps> = ({ installmentsArray, formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
                // overflowY: "auto",
            }}
        >
            {installmentsArray.map((installment) => (
                <InstallmentRow
                    key={installment.id}
                    installmentNumber={installment.id}
                    installmentValue={installment.value}
                    installmentExpiry={installment.expiry}
                    formik={formik}
                />
            ))}
        </Box>
    )
}
