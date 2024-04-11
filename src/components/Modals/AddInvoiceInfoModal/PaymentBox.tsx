import React, { useEffect, useState } from "react"
import { Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"
import { indicador_pagamento, forma_pagamento } from "../AddInvoiceModal/formas_pagamento"
import { InstallmentsList } from "../../Lists/InstallmentsList"
import { InstallmentsListHeader } from "../../Lists/InstallmentsList/InstallmentsListHeader"
import { addMonths } from "date-fns"
import { InstallmentData } from "../../../definitions/Installments"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import MaskedInput from "../../MaskedInput"
import { useNumberMask } from "burgos-masks"

interface PaymentBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const PaymentBox: React.FC<PaymentBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const number_mask = useNumberMask({
        allowDecimal: true,
        allowLeadingZeroes: false,
        allowNegative: false,
        decimalLimit: 2,
        thousandsSeparatorSymbol: "",
        decimalSymbol: ".",
    })

    const [installmentsPay, setInstallmentsPay] = useState(false)
    const [installmentsNumber, setInstallmentsNumber] = useState(1)
    const [installmentsArray, setInstallmentsArray] = useState<InstallmentData[]>([])

    const valor_total = formik.values.valor.total
    const [totalError, setTotalError] = useState(false)

    useEffect(() => {
        if (formik.values.formas_pagamento.indicador_pagamento === 1) {
            setInstallmentsPay(true)

            let currentDate = new Date()

            const newInstallmentsArray = Array.from({ length: installmentsNumber }, (_, index) => {
                let expiryDate = addMonths(currentDate, index + 1)
                let expiry = [
                    ("0" + expiryDate.getDate()).slice(-2), // Add leading zero to day if necessary
                    ("0" + (expiryDate.getMonth() + 1)).slice(-2), // Add leading zero to month if necessary (months are 0-indexed)
                    expiryDate.getFullYear(),
                ].join("/")
                return {
                    id: index + 1,
                    value: (valor_total / installmentsNumber).toFixed(2),
                    expiry: expiry,
                }
            })

            setInstallmentsArray(newInstallmentsArray)
        } else {
            setInstallmentsPay(false)
            setInstallmentsNumber(1)
            setInstallmentsArray([])
        }
    }, [formik.values.formas_pagamento.indicador_pagamento, installmentsNumber])

    const handleInstallmentsChange = (event: any) => {
        const value = event.target.value
        if (/^\d+$/.test(value)) {
            const intValue = parseInt(value, 10)
            if (intValue >= 1 && intValue <= 120) {
                setInstallmentsNumber(intValue)
            }
        }
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <h3>Detalhes do pagamento</h3>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Tipo de pagamento"
                        select
                        required
                        value={formik.values.formas_pagamento.forma_pagamento}
                        onChange={formik.handleChange}
                        name="formas_pagamento.forma_pagamento"
                    >
                        <MenuItem value={"00"} sx={{ display: "none" }}></MenuItem>
                        {forma_pagamento.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Box sx={{ fontSize: "1.7rem", alignItems: "center", gap: "0.5vw" }}>
                            Valor total da nota: R$ {valor_total}
                            {totalError ? <CloseIcon color="error" /> : <CheckIcon color="primary" />}
                        </Box>
                        {totalError && (
                            <p style={{ color: "red" }}>
                                O valor da soma das parcelas deve corresponder ao valor total da nota. Valor somado: R$
                                {installmentsArray.reduce((total, item) => (total += Number(item.value)), 0).toFixed(2)}
                            </p>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={installmentsPay ? 6 : 12}>
                    <TextField
                        fullWidth
                        label="Condição de pagamento"
                        select
                        required
                        value={formik.values.formas_pagamento.indicador_pagamento}
                        onChange={formik.handleChange}
                        name="formas_pagamento.indicador_pagamento"
                    >
                        {indicador_pagamento.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {installmentsPay && (
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Quantidade de parcelas"
                            inputProps={{ min: 1, max: 120 }}
                            value={installmentsNumber}
                            onChange={handleInstallmentsChange}
                            InputProps={{ inputComponent: MaskedInput, inputProps: { mask: number_mask, inputMode: "numeric" } }}
                        />
                    </Grid>
                )}
            </Grid>
            {installmentsPay && (
                <Box
                    sx={{
                        flex: 1,
                        overflow: isMobile ? "scroll" : "",
                        padding: isMobile ? "1vw 5vw" : "",
                        margin: isMobile ? "0 -5vw" : "",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            flexDirection: "column",
                            padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                            width: isMobile ? "fit-content" : "100%",
                        }}
                    >
                        <InstallmentsListHeader />
                        <InstallmentsList
                            installmentsArray={installmentsArray}
                            formik={formik}
                            setInstallmentsArray={setInstallmentsArray}
                            setTotalError={setTotalError}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
