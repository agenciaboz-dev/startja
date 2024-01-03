import React, { useEffect, useState } from "react"
import { Box, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"

interface RecipientBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const RecipientBox: React.FC<RecipientBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [pessoaFisica, setPessoaFisica] = useState(true)

    useEffect(() => {
        formik.setFieldValue("destinatario.cpf", "")
        formik.setFieldValue("destinatario.cnpj", "")
    }, [pessoaFisica])

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
                // border: "1px solid red",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 8}>
                    <TextField
                        fullWidth
                        label="Nome"
                        value={formik.values.destinatario.nome}
                        name="destinatario.nome"
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 4}>
                    <TextField
                        fullWidth
                        label="Telefone"
                        value={formik.values.destinatario.telefone}
                        name="destinatario.telefone"
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 8}>
                    <TextField
                        fullWidth
                        label="Logradouro"
                        value={formik.values.destinatario.logradouro}
                        name="destinatario.logradouro"
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 4}>
                    <TextField
                        fullWidth
                        label="Número"
                        value={formik.values.destinatario.numero}
                        name="destinatario.numero"
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 4}>
                    <TextField
                        fullWidth
                        label="Bairro"
                        value={formik.values.destinatario.bairro}
                        name="destinatario.bairro"
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 4}>
                    <TextField
                        fullWidth
                        label="Município"
                        value={formik.values.destinatario.municipio}
                        name="destinatario.municipio"
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 4}>
                    <TextField
                        fullWidth
                        label="Estado"
                        value={formik.values.destinatario.uf}
                        name="destinatario.uf"
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Inscrição estadual"
                        value={formik.values.destinatario.inscricao_estadual}
                        name="destinatario.inscricao_estadual"
                        onChange={formik.handleChange}
                        required
                        disabled={formik.values.destinatario.indicador_inscricao_estadual != 1}
                    />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Indicador de inscrição estadual"
                        value={formik.values.destinatario.indicador_inscricao_estadual}
                        name="destinatario.indicador_inscricao_estadual"
                        onChange={formik.handleChange}
                        select
                    >
                        <MenuItem value={1}>Contribuinte ICMS</MenuItem>
                        <MenuItem value={2}>Contribuinte isento de Inscrição no cadastro de Contribuintes do ICMS</MenuItem>
                        <MenuItem value={9}>
                            Não Contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes do ICMS
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <RadioGroup
                        value={pessoaFisica}
                        onChange={(_, value) => setPessoaFisica(value == "true")}
                        sx={{ flexDirection: "row", gap: "25%" }}
                    >
                        <FormControlLabel label="Pessoa fisica" control={<Radio value={true} />} />
                        <FormControlLabel label="Pessoa jurídica" control={<Radio value={false} />} />
                    </RadioGroup>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label={pessoaFisica ? "CPF" : "CNPJ"}
                        value={formik.values.destinatario[pessoaFisica ? "cpf" : "cnpj"]}
                        name={`destinatario.${pessoaFisica ? "cpf" : "cnpj"}`}
                        onChange={formik.handleChange}
                        required
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
