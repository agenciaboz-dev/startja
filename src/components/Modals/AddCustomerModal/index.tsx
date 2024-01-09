import React, { useEffect, useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    useMediaQuery,
    MenuItem,
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { PermissionsCard } from "../../PermissionsCard"
import { useFormik } from "formik"
import { NewUser } from "../../../definitions/userOperations"
import { useIo } from "../../../hooks/useIo"

interface AddCustomerModalProps {
    open: boolean
    onClose: () => void
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const todayDate = new Date()
    const formattedDate = todayDate.toISOString().split("T")[0]

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
        { id: 26, value: "TO", label: "Tocantins" },
    ]

    const formik = useFormik<NewUser>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            register_date: formattedDate,
            phone: "",
            document: "",
            city: "",
            state: "",
            district: "",
            number: 0,
            adjunct: "",
            street: "",
            cep: "",
            regimeTributario: 0,
            inscricaoEstadual: "",
            isento: false,
            certificateId: "",
        },
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            io.emit("user:signup", values)
        },
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        io.on("user:signup:success", (customer: Customer) => {
            io.emit("user:list")
            setLoading(false)
            onClose()
        })
        io.on("user:signup:failed", ({ error }) => {
            setLoading(false)
            console.log(error)
        })

        return () => {
            io.off("user:signup:success")
            io.off("user:signup:failed")
        }
    }, [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center",
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "90vw",
                    width: "fit-content",
                },
            }}
        >
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <DialogTitle>Novo Cliente</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                />

                <DialogContent>
                    <Box
                        sx={{
                            flex: 1,
                            height: "fit-content",
                            gap: "2vw",
                            flexDirection: isMobile ? "column" : "",
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        required
                                        label="CPF/CNPJ"
                                        fullWidth
                                        value={formik.values.document}
                                        name="document"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        required
                                        label="Nome completo"
                                        fullWidth
                                        value={formik.values.name}
                                        name="name"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        label="Regime tributário"
                                        fullWidth
                                        value={formik.values.regimeTributario}
                                        name="regimeTributario"
                                        select
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={1}>1 – Simples Nacional</MenuItem>
                                        <MenuItem value={2}>2 – Simples Nacional – excesso de sublimite de receita bruta</MenuItem>
                                        <MenuItem value={3}>3 – Regime Normal</MenuItem>
                                    </TextField>
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
                                    <TextField
                                        required
                                        label="E-mail"
                                        fullWidth
                                        value={formik.values.email}
                                        name="email"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Telefone"
                                        fullWidth
                                        value={formik.values.phone}
                                        name="phone"
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

                            <FormControlLabel
                                control={<Checkbox checked={formik.values.isento} name="isento" onChange={formik.handleChange} />}
                                label="Não contribuinte / isento"
                                sx={{ textAlign: "center" }}
                            />

                            <h3>Endereço</h3>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        label="Rua"
                                        fullWidth
                                        value={formik.values.street}
                                        name="street"
                                        onChange={formik.handleChange}
                                    />
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
                                    <TextField
                                        label="Complemento"
                                        fullWidth
                                        value={formik.values.adjunct}
                                        name="adjunct"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required label="CEP" fullWidth value={formik.values.cep} name="cep" onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Bairro"
                                        fullWidth
                                        value={formik.values.district}
                                        name="district"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Cidade"
                                        fullWidth
                                        value={formik.values.city}
                                        name="city"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Estado"
                                        fullWidth
                                        value={formik.values.state}
                                        name="state"
                                        onChange={formik.handleChange}
                                    >
                                        {estados.map((estado) => (
                                            <MenuItem key={estado.id} value={estado.value}>
                                                {estado.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box>
                            <hr
                                style={{
                                    height: "100%",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
                            <Box
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: isMobile ? "start" : "center",
                                    flexDirection: isMobile ? "column" : "",
                                    gap: isMobile ? "4vw" : "",
                                }}
                            >
                                <h3>Permissões</h3>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        gap: isMobile ? "4vw" : "1vw",
                                        flexDirection: isMobile ? "column-reverse" : "",
                                        width: isMobile ? "100%" : "fit-content",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            color: "white",
                                            borderRadius: "20px",
                                            textTransform: "unset",
                                        }}
                                    >
                                        Salvar Predefinição
                                    </Button>
                                    <TextField
                                        label="Predefinição"
                                        sx={{
                                            width: isMobile ? "100%" : "10vw",
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: isMobile ? "5vw" : "1vw",
                                    marginTop: isMobile ? "5vw" : "1vw",
                                }}
                            >
                                <h4>Responsável pelo Uso</h4>
                                <p>
                                    O "Responsável pelo uso" é o representante legal da conta StartJá, com acesso total, podendo adicionar, editar e
                                    remover acessos e configurações.
                                </p>
                                <p>O Administrador responsável será o responsável legal por padrão, mas você pode atribuir ao seu cliente.</p>
                            </Box>

                            {/* <FormControlLabel control={<ToggleSwitch />} label="Atribuir cliente como responsável" /> */}

                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField label="E-mail do Responsável" fullWidth />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField label="Telefone do Responsável" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Nome do Responsável" fullWidth />
                                </Grid>
                            </Grid>

                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: isMobile ? "4vw" : "2vw",
                                    marginTop: isMobile ? "5vw" : "2vw",
                                }}
                            >
                                <PermissionsCard header="Visão Geral" />
                                <PermissionsCard header="Emissão de Nota Fiscal" />
                                <PermissionsCard header="Cadastros Gerais" />
                                <PermissionsCard header="Relatórios" />
                                {/* <PermissionsCard header="Livro Caixa" /> */}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        margin: isMobile ? "0" : "0.5vw",
                        padding: isMobile ? "5vw" : "",
                    }}
                >
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        {loading ? <CircularProgress size="1.5rem" color="inherit" /> : "Adicionar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddCustomerModal
