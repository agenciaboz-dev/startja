import React from "react"
import { Box, Checkbox, FormControlLabel, Grid, MenuItem, TextField, Tooltip, useMediaQuery } from "@mui/material"
import { NewUser } from "../../../definitions/userOperations"
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react"
import { toolTipStyle } from "../../../style/toolTipStyle"

interface InfoContainerProps {
    formik: {
        values: NewUser
        handleChange: (e: React.ChangeEvent<any>) => void
    }

    file?: ExtFile
    setFile: React.Dispatch<React.SetStateAction<ExtFile | undefined>>
}

export const InfoContainer: React.FC<InfoContainerProps> = ({ formik, file, setFile }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const updateFiles = (incommingFiles: ExtFile[]) => {
        setFile(incommingFiles[0])
    }

    const removeFile = (id: string | number | undefined) => {
        setFile(undefined)
    }

    const estados = [
        { value: "AC", label: "Acre" },
        { value: "AL", label: "Alagoas" },
        { value: "AP", label: "Amapá" },
        { value: "AM", label: "Amazonas" },
        { value: "BA", label: "Bahia" },
        { value: "CE", label: "Ceará" },
        { value: "DF", label: "Distrito Federal" },
        { value: "ES", label: "Espírito Santo" },
        { value: "GO", label: "Goiás" },
        { value: "MA", label: "Maranhão" },
        { value: "MT", label: "Mato Grosso" },
        { value: "MS", label: "Mato Grosso do Sul" },
        { value: "MG", label: "Minas Gerais" },
        { value: "PA", label: "Pará" },
        { value: "PB", label: "Paraíba" },
        { value: "PR", label: "Paraná" },
        { value: "PE", label: "Pernambuco" },
        { value: "PI", label: "Piauí" },
        { value: "RJ", label: "Rio de Janeiro" },
        { value: "RN", label: "Rio Grande do Norte" },
        { value: "RS", label: "Rio Grande do Sul" },
        { value: "RO", label: "Rondônia" },
        { value: "RR", label: "Roraima" },
        { value: "SC", label: "Santa Catarina" },
        { value: "SP", label: "São Paulo" },
        { value: "SE", label: "Sergipe" },
        { value: "TO", label: "Tocantins" },
    ]

    return (
        <Box
            sx={{
                flex: 1,
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField required label="CPF/CNPJ" fullWidth value={formik.values.document} name="document" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        required
                        label="Regime tributário"
                        fullWidth
                        value={formik.values.regimeTributario}
                        name="regimeTributario"
                        select
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={0} sx={{ display: "none" }}></MenuItem>
                        <MenuItem value={1}>1 – Simples Nacional</MenuItem>
                        <MenuItem value={2}>2 – Simples Nacional – excesso de sublimite de receita bruta</MenuItem>
                        <MenuItem value={3}>3 – Regime Normal</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField required label="Nome completo" fullWidth value={formik.values.name} name="name" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Nome fantasia"
                        fullWidth
                        value={formik.values.businessName}
                        name="businessName"
                        onChange={formik.handleChange}
                        required={formik.values.document.replace(/\D/g, "").length == 14}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Senha provisória"
                        fullWidth
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                    />
                </Grid>
            </Grid>

            <h3>Contato</h3>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField required label="E-mail" fullWidth value={formik.values.email} name="email" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required label="Telefone" fullWidth value={formik.values.phone} name="phone" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Inscrição municipal"
                        fullWidth
                        value={formik.values.inscricao_municipal}
                        name="inscricao_municipal"
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Inscrição estadual"
                        fullWidth
                        value={formik.values.inscricaoEstadual}
                        name="inscricaoEstadual"
                        onChange={formik.handleChange}
                    />
                </Grid>
            </Grid>

            <h3>Endereço</h3>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField required label="Rua" fullWidth value={formik.values.street} name="street" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        label="Número"
                        fullWidth
                        value={formik.values.number}
                        name="number"
                        type="number"
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Complemento" fullWidth value={formik.values.adjunct} name="adjunct" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required label="CEP" fullWidth value={formik.values.cep} name="cep" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required label="Bairro" fullWidth value={formik.values.district} name="district" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required label="Cidade" fullWidth value={formik.values.city} name="city" onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required label="Estado" fullWidth value={formik.values.state} name="state" onChange={formik.handleChange} select>
                        {estados.map((estado) => (
                            <MenuItem key={estado.value} value={estado.value}>
                                {estado.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <h3>Detalhes</h3>

            <Box
                sx={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "50%",
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox checked={formik.values.isento} name="isento" onChange={formik.handleChange} />}
                        label="Não contribuinte / isento"
                        sx={{ textAlign: "center" }}
                    />
                    <Tooltip title={<Box sx={toolTipStyle}>Informa se empresa será habilitada para discriminar impostos de NFe e NFCe.</Box>}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={formik.values.discrimina_impostos} name="discrimina_impostos" onChange={formik.handleChange} />
                            }
                            label="discrimina_impostos"
                            sx={{ textAlign: "center" }}
                        />
                    </Tooltip>
                    <Tooltip title={<Box sx={toolTipStyle}>Informa se empresa será habilitada para enviar email ao destinatário em produção</Box>}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.enviar_email_destinatario}
                                    name="enviar_email_destinatario"
                                    onChange={formik.handleChange}
                                />
                            }
                            label="enviar_email_destinatario"
                            sx={{ textAlign: "center" }}
                        />
                    </Tooltip>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "50%",
                    }}
                >
                    <Tooltip
                        title={
                            <Box sx={toolTipStyle}>Informa se empresa será habilitada para emissão de NFe – Nota Fiscal Eletrônica modelo 55.</Box>
                        }
                    >
                        <FormControlLabel
                            control={<Checkbox checked={formik.values.habilita_nfe} name="habilita_nfe" onChange={formik.handleChange} />}
                            label="habilita_nfe"
                            sx={{ textAlign: "center" }}
                        />
                    </Tooltip>
                    <Tooltip
                        title={
                            <Box sx={toolTipStyle}>
                                Informa se empresa será habilitada para emissão de NFCe – Nota Fiscal ao Consumidor Eletrônica modelo 65
                            </Box>
                        }
                    >
                        <FormControlLabel
                            control={<Checkbox checked={formik.values.habilita_nfce} name="habilita_nfce" onChange={formik.handleChange} />}
                            label="habilita_nfce"
                            sx={{ textAlign: "center" }}
                            disabled
                        />
                    </Tooltip>
                </Box>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 6}>
                    <Tooltip title={<Box sx={toolTipStyle}>Próximo número da NFe a ser emitida. Depois, será incrementado automaticamente.</Box>}>
                        <TextField
                            required
                            label="proximo_numero_nfe"
                            value={formik.values.proximo_numero_nfe}
                            name="proximo_numero_nfe"
                            onChange={formik.handleChange}
                            fullWidth
                            type="number"
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                    <Tooltip title={<Box sx={toolTipStyle}>Série da NFe a ser emitida. Valor padrão: 1</Box>}>
                        <TextField
                            required
                            label="serie_nfe"
                            value={formik.values.serie_nfe}
                            name="serie_nfe"
                            onChange={formik.handleChange}
                            fullWidth
                            type="number"
                        />
                    </Tooltip>
                </Grid>
            </Grid>

            <h3>Certificado</h3>

            <Dropzone
                onChange={updateFiles}
                value={file ? [file] : []}
                maxFiles={1}
                accept=".pfx"
                footerConfig={{ customMessage: "certificado .pfx" }}
                label="Clique ou arraste o arquivo aqui"
            >
                {file && <FileMosaic key={file.id} {...file} onDelete={removeFile} info={true} />}
            </Dropzone>
            <TextField
                required
                label="Senha do certificado"
                value={formik.values.certificate_password}
                name="certificate_password"
                onChange={formik.handleChange}
                fullWidth
            />
        </Box>
    )
}
