import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    CircularProgress,
    useMediaQuery,
    MenuItem,
    Box,
    FormControlLabel,
    Checkbox
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { NewCompany } from "../../../definitions/userOperations"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"

interface AddCompanyModalProps {
    open: boolean
    onClose: () => void
    setCompany?: (company: Company) => void
    currentCompany?: Company
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose, setCompany, currentCompany }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const { user } = useUser()
    const { snackbar } = useSnackbar()

    const estados = [
        { id: 1, value: "AC", label: "Acre" },
        { id: 2, value: "AL", label: "Alagoas" },
        { id: 3, value: "AP", label: "Amapá" },
        { id: 4, value: "AM", label: "Amazonas" },
        { id: 5, value: "BA", label: "Bahia" },
        { id: 5, value: "CE", label: "Ceará" },
        { id: 6, value: "DF", label: "Distrito Federal" },
        { id: 7, value: "ES", label: "Espírito Santo" },
        { id: 8, value: "GO", label: "Goiás" },
        { id: 9, value: "MA", label: "Maranhão" },
        { id: 10, value: "MT", label: "Mato Grosso" },
        { id: 11, value: "MS", label: "Mato Grosso do Sul" },
        { id: 12, value: "MG", label: "Minas Gerais" },
        { id: 13, value: "PA", label: "Pará" },
        { id: 14, value: "PB", label: "Paraíba" },
        { id: 15, value: "PR", label: "Paraná" },
        { id: 16, value: "PE", label: "Pernambuco" },
        { id: 17, value: "PI", label: "Piauí" },
        { id: 18, value: "RJ", label: "Rio de Janeiro" },
        { id: 19, value: "RN", label: "Rio Grande do Norte" },
        { id: 20, value: "RS", label: "Rio Grande do Sul" },
        { id: 21, value: "RO", label: "Rondônia" },
        { id: 22, value: "RR", label: "Roraima" },
        { id: 23, value: "SC", label: "Santa Catarina" },
        { id: 24, value: "SP", label: "São Paulo" },
        { id: 25, value: "SE", label: "Sergipe" },
        { id: 26, value: "TO", label: "Tocantins" }
    ]

    const formik = useFormik<NewCompany>({
        initialValues: currentCompany || {
            type: "nacional",
            name: "",
            document: "",
            inscricaoEstadual: "",
            indicadorEstadual: "1",
            city: "",
            state: "",
            district: "",
            street: "",
            adjunct: "",
            number: "",
            cep: "",
            email: "",
            phone: "",
            businessName: "",
            final_consumer: false,
            customerId: user?.id || 0
        },
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            io.emit(currentCompany ? "company:update" : "company:create", values, currentCompany?.id)
        },
        enableReinitialize: true
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // console.log(formik.values)

        if (Number(formik.values.indicadorEstadual) == 9) {
            formik.setFieldValue("final_consumer", true)
        }
    }, [formik.values])

    useEffect(() => {
        io.on("company:creation:success", (company: Company) => {
            console.log("Empresa criada com sucesso: ", company)
            io.emit("company:list")
            setLoading(false)
            onClose()
            if (setCompany) {
                setCompany(company)
            }
            formik.resetForm()
        })
        io.on("company:creation:error", ({ error }) => {
            setLoading(false)
            console.log(error)

            if (error.name === "PrismaClientKnownRequestError") {
                snackbar({ severity: "error", text: `erro ao criar empresa: ${error.meta.target}` })
            }
        })

        return () => {
            io.off("company:creation:success")
            io.off("company:creation:error")
        }
    }, [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center"
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "90vw"
                }
            }}>
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar Pessoa ou Empresa</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        cursor: "pointer"
                    }}
                    onClick={onClose}
                />
                <DialogContent>
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: isMobile ? "10vw" : "2vw"
                        }}>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw"
                            }}>
                            <h3>Dados de Identificação</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        required
                                        label="Nome"
                                        fullWidth
                                        value={formik.values.name}
                                        name="name"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        required
                                        label="Nome Fantasia"
                                        fullWidth
                                        value={formik.values.businessName}
                                        name="businessName"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        required
                                        label="Tipo"
                                        fullWidth
                                        value={formik.values.type}
                                        name="type"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        required
                                        label="Documento"
                                        fullWidth
                                        value={formik.values.document}
                                        name="document"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        required
                                        label="Número de inscrição estadual"
                                        fullWidth
                                        value={formik.values.inscricaoEstadual}
                                        name="inscricaoEstadual"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        fullWidth
                                        label="Indicador de inscrição estadual"
                                        value={formik.values.indicadorEstadual}
                                        name="indicadorEstadual"
                                        onChange={formik.handleChange}
                                        select>
                                        <MenuItem value={1}>Contribuinte ICMS</MenuItem>
                                        <MenuItem value={2}>Contribuinte isento de Inscrição no cadastro de Contribuintes do ICMS</MenuItem>
                                        <MenuItem value={9}>
                                            Não Contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes do ICMS
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <FormControlLabel
                                    label="Consumidor final"
                                    control={
                                        <Checkbox
                                            checked={!!formik.values.final_consumer}
                                            name="final_consumer"
                                            onChange={(_, checked) => formik.setFieldValue("final_consumer", checked)}
                                            disabled={Number(formik.values.indicadorEstadual) == 9}
                                        />
                                    }
                                />
                            </Grid>
                        </Box>
                        <hr />
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw"
                            }}>
                            <h3>Contato</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        required
                                        label="E-mail"
                                        fullWidth
                                        value={formik.values.email}
                                        name="email"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        required
                                        label="Telefone"
                                        fullWidth
                                        value={formik.values.phone}
                                        name="phone"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <hr />
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw"
                            }}>
                            <h3>Endereço</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        required
                                        label="Rua"
                                        fullWidth
                                        value={formik.values.street}
                                        name="street"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        required
                                        label="Número"
                                        fullWidth
                                        value={formik.values.number}
                                        name="number"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        label="Complemento"
                                        fullWidth
                                        value={formik.values.adjunct}
                                        name="adjunct"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField required label="CEP" fullWidth value={formik.values.cep} name="cep" onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        required
                                        label="Bairro"
                                        fullWidth
                                        value={formik.values.district}
                                        name="district"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        required
                                        label="Cidade"
                                        fullWidth
                                        value={formik.values.city}
                                        name="city"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 3}>
                                    <TextField
                                        required
                                        label="Estado"
                                        fullWidth
                                        value={formik.values.state}
                                        name="state"
                                        onChange={formik.handleChange}
                                        select>
                                        {estados.map((estado) => (
                                            <MenuItem key={estado.id} value={estado.value}>
                                                {estado.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        margin: isMobile ? "0" : "0.5vw",
                        padding: isMobile ? "5vw" : ""
                    }}>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        {loading ? <CircularProgress size="1.5rem" color="inherit" /> : currentCompany ? "salvar" : "Adicionar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddCompanyModal
