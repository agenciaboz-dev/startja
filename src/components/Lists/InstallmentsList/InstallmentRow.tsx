import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import { colors } from "../../../style/colors"

interface InstallmentRowProps {
    installmentNumber: number
    installmentValue: string
    installmentExpiry: string
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const InstallmentRow: React.FC<InstallmentRowProps> = ({ installmentNumber, installmentValue, installmentExpiry, formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const cellStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }

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
                    <p>{installmentExpiry}</p>
                </Box>
            </Box>
        </Box>
    )
}
