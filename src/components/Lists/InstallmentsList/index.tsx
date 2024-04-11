import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { InstallmentRow } from "./InstallmentRow"
import { FormikErrors } from "formik"
import { InstallmentData } from "../../../definitions/Installments"

interface InstallmentsListProps {
    installmentsArray: InstallmentData[]
    setInstallmentsArray: React.Dispatch<React.SetStateAction<InstallmentData[]>>
    setTotalError: React.Dispatch<React.SetStateAction<boolean>>
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const InstallmentsList: React.FC<InstallmentsListProps> = ({ installmentsArray, formik, setInstallmentsArray, setTotalError }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const onValueChange = (id: number, new_value: number) => {
        const installments = [...installmentsArray]
        installments[id - 1] = { id, expiry: installments[id - 1].expiry, value: new_value.toFixed(2) }
        setInstallmentsArray(installments)
    }

    useEffect(() => {
        const total = Number(installmentsArray.reduce((total, item) => (total += Number(item.value)), 0).toFixed(2))
        console.log({ total_somado: total, total_nota: formik.values.valor.total })

        if (total != formik.values.valor.total) {
            setTotalError(true)
            console.log("cu")
        } else {
            console.log("valor certo")
            setTotalError(false)
        }
    }, [installmentsArray])

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
                    onValueChange={onValueChange}
                />
            ))}
        </Box>
    )
}
