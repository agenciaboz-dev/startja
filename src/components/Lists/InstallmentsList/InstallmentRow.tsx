import React, { useEffect, useState } from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { colors } from "../../../style/colors"
import { FormikErrors } from "formik"
import MaskedInput from "../../MaskedInput"
import { useNumberMask } from "burgos-masks"

interface InstallmentRowProps {
    installmentNumber: number
    installmentValue: string
    installmentExpiry: string
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
    onValueChange: (id: number, new_value: number) => void
}

export const InstallmentRow: React.FC<InstallmentRowProps> = ({ installmentNumber, installmentValue, installmentExpiry, formik, onValueChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const number_mask = useNumberMask({
        allowDecimal: true,
        decimalLimit: 2,
        allowLeadingZeroes: false,
        allowNegative: false,
        decimalSymbol: ".",
        thousandsSeparatorSymbol: "",
    })

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
                    <TextField
                        value={installmentValue}
                        onChange={(e) => onValueChange(installmentNumber, Number(e.target.value))}
                        InputProps={{
                            startAdornment: <>R$</>,
                            sx: { gap: 1 },
                            inputComponent: MaskedInput,
                            inputProps: { mask: number_mask, inputMode: "numeric" },
                        }}
                    />
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
