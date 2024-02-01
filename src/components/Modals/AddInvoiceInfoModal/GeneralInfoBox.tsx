import React from "react"
import { Box, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"

interface GeneralInfoBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const GeneralInfoBox: React.FC<GeneralInfoBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <RadioGroup
                value={formik.values.tipo_documento}
                onChange={(_, value) => formik.setFieldValue("tipo_documento", Number(value))}
                sx={{ flexDirection: isMobile ? "column" : "row", gap: isMobile ? "" : "5vw" }}
            >
                <FormControlLabel label="Nota de entrada" control={<Radio value={0} />} />
                <FormControlLabel label="Nota de saída" control={<Radio value={1} />} />
            </RadioGroup>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Local de destino"
                        name="local_destino"
                        value={formik.values.local_destino}
                        onChange={formik.handleChange}
                        select
                    >
                        <MenuItem value={1}>1 - Operação Interna</MenuItem>
                        <MenuItem value={2}>2 - Operação interestadual</MenuItem>
                        <MenuItem value={3}>3 - Operação no exterior</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Presença do Comprador"
                        name="presenca_comprador"
                        value={formik.values.presenca_comprador}
                        onChange={formik.handleChange}
                        select
                    >
                        <MenuItem value={0}>0 - Não se aplica</MenuItem>
                        <MenuItem value={1}>1 - Operação presencial</MenuItem>
                        <MenuItem value={2}>2 - Operação não presencial, pela Internet</MenuItem>
                        <MenuItem value={3}>3 - Operação não presencial, Teleatendimento</MenuItem>
                        <MenuItem value={4}>4 - NFC-e em operação com entrega em domicílio</MenuItem>
                        <MenuItem value={5}>5 - Operação presencial, fora do estabelecimento</MenuItem>
                        <MenuItem value={9}>9 - Operação não presencial, outros</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Informações adicionais da nota"
                        name="informacoes_adicionais_contribuinte"
                        value={formik.values.informacoes_adicionais_contribuinte}
                        onChange={formik.handleChange}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
