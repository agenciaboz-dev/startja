import React, { useEffect, useState } from "react"
import { Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"
import { indicador_pagamento, forma_pagamento } from "../AddInvoiceModal/formas_pagamento"
import { InstallmentsList } from "../../Lists/InstallmentsList"
import { InstallmentsListHeader } from "../../Lists/InstallmentsList/InstallmentsListHeader"

interface PaymentBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const PaymentBox: React.FC<PaymentBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [installmentsPay, setInstallmentsPay] = useState(false)
    const [installmentsNumber, setInstallmentsNumber] = useState(1)
    const [installmentsArray, setInstallmentsArray] = useState<{ id: number }[]>([])

    useEffect(() => {
        if (formik.values.formas_pagamento.indicador_pagamento === 1) {
            setInstallmentsPay(true)

            const newInstallmentsArray = Array.from({ length: installmentsNumber }, (_, index) => ({
                id: index + 1,
            }))

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
                <Grid item xs={12}>
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
                            type="number"
                            inputProps={{ min: 1, max: 120 }}
                            value={installmentsNumber}
                            onChange={handleInstallmentsChange}
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
                        <InstallmentsList installmentsArray={installmentsArray} />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
