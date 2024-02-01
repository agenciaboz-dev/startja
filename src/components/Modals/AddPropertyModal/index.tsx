import React, { useEffect, useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Grid,
    useMediaQuery,
    CircularProgress,
    MenuItem,
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useFormik } from "formik"
import { NewProperty } from "../../../definitions/userOperations"
import { useUser } from "../../../hooks/useUser"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface AddPropertyModalProps {
    open: boolean
    onClose: () => void
    setProperty?: (property: Property) => void
    currentProperty?: Property
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ open, onClose, setProperty, currentProperty }) => {
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
        { id: 26, value: "TO", label: "Tocantins" },
    ]

    if (!user) return null

    const [loading, setLoading] = useState(false)

    const formik = useFormik<NewProperty>({
        initialValues: currentProperty || {
            user_id: user.id,
            name: "",
            adjunct: "",
            cep: "",
            city: "",
            declarant: "",
            district: "",
            exploration: "",
            ie: "",
            nfe_number: "",
            nfe_series: "",
            nifr: "",
            number: "",
            state: "",
            street: "",
        },
        onSubmit: (values) => {
            if (loading) return

            setLoading(true)
            io.emit(currentProperty ? "property:update" : "property:create", values, currentProperty?.id)
        },
        enableReinitialize: true,
    })

    useEffect(() => {
        io.on("property:creation:success", (property: Property) => {
            setLoading(false)
            if (setProperty) {
                setProperty(property)
            }
            onClose()
            formik.resetForm()
        })

        io.on("property:creation:failed", ({ error }) => {
            setLoading(false)
            console.log(error)

            if (error.name === "PrismaClientKnownRequestError") {
                snackbar({ severity: "error", text: `Erro ao criar propriedade: ${error.meta.target}` })
            }
        })

        return () => {
            io.off("property:creation:success")
            io.off("property:creation:failed")
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
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <DialogTitle>Adicionar propriedade</DialogTitle>
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
                            flexDirection: "column",
                            width: "100%",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <h3>Dados de Identificação</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    value={formik.values.name}
                                    name="name"
                                    label="Nome da propriedade"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    value={formik.values.ie}
                                    name="ie"
                                    label="IE vinculada à propriedade"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    value={formik.values.nifr}
                                    name="nifr"
                                    label="NIRF(CAFIR)"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    value={formik.values.nfe_number}
                                    name="nfe_number"
                                    label="Número"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    value={formik.values.nfe_series}
                                    name="nfe_series"
                                    label="Série"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <h3>Endereço</h3>

                        <Grid container spacing={2}>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField value={formik.values.street} name="street" label="Rua" fullWidth onChange={formik.handleChange} required />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3}>
                                <TextField
                                    value={formik.values.number}
                                    name="number"
                                    label="Número"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3}>
                                <TextField
                                    value={formik.values.adjunct}
                                    name="adjunct"
                                    label="Complemento"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3}>
                                <TextField value={formik.values.cep} name="cep" label="CEP" fullWidth onChange={formik.handleChange} required />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3}>
                                <TextField
                                    value={formik.values.district}
                                    name="district"
                                    label="Bairro"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3}>
                                <TextField value={formik.values.city} name="city" label="Cidade" fullWidth onChange={formik.handleChange} required />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3}>
                                <TextField
                                    value={formik.values.state}
                                    name="state"
                                    label="Estado"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                    select
                                >
                                    {estados.map((estado) => (
                                        <MenuItem key={estado.id} value={estado.value}>
                                            {estado.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <h3>Exploração</h3>

                        <Grid container spacing={2}>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    value={formik.values.exploration}
                                    name="exploration"
                                    label="Tipo de exploração"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    value={formik.values.declarant}
                                    name="declarant"
                                    label="Produtor rural declarante"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>
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
                            marginRight: isMobile ? "" : "auto",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : currentProperty ? "Salvar" : "Cadastrar propriedade"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddPropertyModal
