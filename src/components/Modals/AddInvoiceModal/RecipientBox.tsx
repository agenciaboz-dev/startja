import React, { useEffect, useState } from "react"
import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from "@mui/material"
import { FormikErrors } from "formik"

interface RecipientBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const RecipientBox: React.FC<RecipientBoxProps> = ({ formik }) => {
    const [pessoaFisica, setPessoaFisica] = useState(true)

    useEffect(() => {
        formik.setFieldValue("destinatario.cpf", "")
        formik.setFieldValue("destinatario.cnpj", "")
    }, [pessoaFisica])

    return (
        <Box sx={{ flexDirection: "column", border: "1px solid red", gap: "1vw" }}>
            <TextField label="bairro" value={formik.values.destinatario.bairro} name="destinatario.bairro" onChange={formik.handleChange} required />
            <TextField
                label="indicador inscrição estadual"
                value={formik.values.destinatario.indicador_inscricao_estadual}
                name="destinatario.indicador_inscricao_estadual"
                onChange={formik.handleChange}
                select>
                <MenuItem value={1}>Contribuinte ICMS</MenuItem>
                <MenuItem value={2}>Contribuinte isento de Inscrição no cadastro de Contribuintes do ICMS</MenuItem>
                <MenuItem value={9}>Não Contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes do ICMS</MenuItem>
            </TextField>

            <TextField
                label="inscrição estadual"
                value={formik.values.destinatario.inscricao_estadual}
                name="destinatario.inscricao_estadual"
                onChange={formik.handleChange}
                required
                disabled={formik.values.destinatario.indicador_inscricao_estadual != 1}
            />
            <TextField
                label="logradouro"
                value={formik.values.destinatario.logradouro}
                name="destinatario.logradouro"
                onChange={formik.handleChange}
                required
            />
            <TextField
                label="municipio"
                value={formik.values.destinatario.municipio}
                name="destinatario.municipio"
                onChange={formik.handleChange}
                required
            />
            <TextField label="nome" value={formik.values.destinatario.nome} name="destinatario.nome" onChange={formik.handleChange} required />
            <TextField label="numero" value={formik.values.destinatario.numero} name="destinatario.numero" onChange={formik.handleChange} required />
            <TextField
                label="telefone"
                value={formik.values.destinatario.telefone}
                name="destinatario.telefone"
                onChange={formik.handleChange}
                required
            />
            <TextField label="uf" value={formik.values.destinatario.uf} name="destinatario.uf" onChange={formik.handleChange} required />

            <RadioGroup value={pessoaFisica} onChange={(_, value) => setPessoaFisica(value == "true")} sx={{ flexDirection: "row" }}>
                <FormControlLabel label="pessoa fisica" control={<Radio value={true} />} />
                <FormControlLabel label="pessoa juridica" control={<Radio value={false} />} />
            </RadioGroup>

            <TextField
                label={pessoaFisica ? "cpf" : "cnpj"}
                value={formik.values.destinatario[pessoaFisica ? "cpf" : "cnpj"]}
                name={`destinatario.${pessoaFisica ? "cpf" : "cnpj"}`}
                onChange={formik.handleChange}
                required
            />
        </Box>
    )
}
