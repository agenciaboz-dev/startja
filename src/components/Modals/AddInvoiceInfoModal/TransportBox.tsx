import React, { useEffect, useState } from "react"
import { Autocomplete, Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"
import { useUser } from "../../../hooks/useUser"

interface TransportBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const TransportBox: React.FC<TransportBoxProps> = ({ formik }) => {
    const { user } = useUser()
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [selectedShippingCompany, setSelectedShippingCompany] = useState<Company | null>(null)

    useEffect(() => {
        if (selectedShippingCompany) {
            formik.setFieldValue("transporte.transportadora", selectedShippingCompany.name)
        } else {
            setSelectedShippingCompany(
                user?.companies.find((company) => company.name == formik.values.transporte.transportadora) || null
            )
        }
    }, [selectedShippingCompany])

    useEffect(() => {
        console.log(formik.values)
    }, [formik.values])

    return user ? (
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
                        label="Modalidade do frete"
                        name="transporte.modalidade_frete"
                        value={formik.values.transporte.modalidade_frete}
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
                {formik.values.transporte.modalidade_frete == 0 && (
                    <Grid item xs={isMobile ? 12 : 6}>
                        <Autocomplete
                            disablePortal
                            options={user.companies}
                            getOptionLabel={(option: Company) => `${option.name}`}
                            isOptionEqualToValue={(option: Company, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField {...params} label="Transportadora" name="transporte.transportadora" />
                            )}
                            value={selectedShippingCompany}
                            onChange={(_, value) => setSelectedShippingCompany(value)}
                        />
                        {/* <TextField
                            fullWidth
                            label="Transportadora"
                            name="transporte.transportadora"
                            value={formik.values.transporte.transportadora}
                            onChange={formik.handleChange}
                            required
                        /> */}
                    </Grid>
                )}
                {formik.values.transporte.modalidade_frete == 0 && (
                    <Grid item xs={isMobile ? 12 : 6}>
                        <TextField
                            fullWidth
                            label="Valor do frete"
                            name="transporte.valor_frete"
                            value={formik.values.transporte.valor_frete}
                            onChange={formik.handleChange}
                            required
                            type="number"
                        />
                    </Grid>
                )}
                {formik.values.transporte.modalidade_frete == 0 && (
                    <Grid item xs={isMobile ? 12 : 6}>
                        <TextField
                            fullWidth
                            label="Valor do seguro"
                            name="transporte.valor_seguro"
                            value={formik.values.transporte.valor_seguro}
                            onChange={formik.handleChange}
                            required
                            type="number"
                        />
                    </Grid>
                )}
            </Grid>

            {formik.values.transporte.modalidade_frete == 0 && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: "1vw",
                    }}
                >
                    <h3>Dados do Veículo</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={isMobile ? 12 : formik.values.emitente.uf != formik.values.destinatario.uf ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Placa do veículo"
                                name="transporte.veiculo_placa"
                                value={formik.values.transporte.veiculo_placa}
                                onChange={formik.handleChange}
                                required
                            />
                        </Grid>
                        {formik.values.emitente.uf == formik.values.destinatario.uf && (
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    fullWidth
                                    label="UF do veículo"
                                    name="transporte.veiculo_uf"
                                    value={formik.values.transporte.veiculo_uf}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )}

            {(formik.values.transporte.modalidade_frete == 0 || formik.values.transporte.modalidade_frete == 9) && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: "1vw",
                    }}
                >
                    <h3>Volumes do transporte</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Quantidade dos produtos transportados"
                                name="transporte.volumes.volumes_quantidade"
                                value={formik.values.transporte.volumes.volumes_quantidade}
                                onChange={formik.handleChange}
                                required={formik.values.transporte.modalidade_frete == 9 ? false : true}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Espécie dos produtos transportados"
                                name="transporte.volumes.volumes_especie"
                                value={formik.values.transporte.volumes.volumes_especie}
                                onChange={formik.handleChange}
                                required={formik.values.transporte.modalidade_frete == 9 ? false : true}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Peso bruto (kg)"
                                name="transporte.volumes.peso_bruto"
                                value={formik.values.transporte.volumes.peso_bruto}
                                onChange={formik.handleChange}
                                required={formik.values.transporte.modalidade_frete == 9 ? false : true}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Peso líquido (kg)"
                                name="transporte.volumes.peso_liquido"
                                value={formik.values.transporte.volumes.peso_liquido}
                                onChange={formik.handleChange}
                                required={formik.values.transporte.modalidade_frete == 9 ? false : true}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    ) : null
}
