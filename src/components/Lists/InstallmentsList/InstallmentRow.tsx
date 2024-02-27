import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import { colors } from "../../../style/colors"

interface InstallmentRowProps {
    installmentNumber: number
    installmentValue: number
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const InstallmentRow: React.FC<InstallmentRowProps> = ({ installmentNumber, installmentValue, formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const cellStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }

    const valor_total = formik.values.valor.total
    // const valor_parcela = valor_total / formik.values.

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
                padding: "0.5vw 0",
                ":hover": {
                    backgroundColor: colors.background2,
                },
            }}
        >
            <Box
                sx={{
                    justifyContent: "space-between",
                    flex: 1,
                    gap: isMobile ? "10vw" : "",
                }}
            >
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 1,
                    }}
                >
                    <p>{installmentNumber}</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 1,
                    }}
                >
                    <p>R$ {installmentValue}</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 1,
                    }}
                >
                    <p>06/02/2025</p>
                </Box>
            </Box>
        </Box>
    )
}
