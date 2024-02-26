import React from "react"
import { Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"

interface TransportBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const TransportBox: React.FC<TransportBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <h3>Detalhes do frete</h3>

            <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Tipo de frete"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                        select
                    >
                        <MenuItem value={0}>0 - Frete por conta do remetente</MenuItem>
                        <MenuItem value={1}>1 - Frete por conta do destinatário</MenuItem>
                        <MenuItem value={2}>2 - Frete por conta de terceiros</MenuItem>
                        <MenuItem value={3}>3 - Transporte próprio por conta do remetente</MenuItem>
                        <MenuItem value={4}>4 - Transporte próprio por conta do destinatário</MenuItem>
                        <MenuItem value={9}>9 - Sem frete</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Transportadora"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                        // type="number"
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Placa do veículo"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                        // type="number"
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="UF do veículo"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                        // type="number"
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Valor do frete"
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
                        label="Valor do seguro"
                        name="valor.seguro"
                        value={formik.values.valor.seguro}
                        onChange={formik.handleChange}
                        required
                        type="number"
                    />
                </Grid>
            </Grid>

            <h3>Volumes do transporte</h3>

            <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Quantidade dos produtos transportados"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                        type="number"
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Espécie dos produtos transportados"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Peso bruto (kg)"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                        type="number"
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Peso líquido (kg)"
                        name="valor.placeholder"
                        // value={formik.values.valor.placeholder}
                        onChange={formik.handleChange}
                        required
                        type="number"
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
