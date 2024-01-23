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
    Checkbox,
    RadioGroup,
    Radio,
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { NewCompany } from "../../../definitions/userOperations"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import MaskedInput from "../../MaskedInput"
import { useDocumentMask } from "burgos-masks"
import { useValidateCPF } from "../../../hooks/useValidateCPF"
import { useValidateCNPJ } from "../../../hooks/useValidateCNPJ"
import { estados } from "../../../tools/estadosBrasil"

interface AddCompanyModalProps {
    open: boolean
    onClose: () => void
    setCompany?: (company: Company) => void
    currentCompany?: Company
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose, setCompany, currentCompany }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const document_mask = useDocumentMask()
    const io = useIo()
    const validateCPF = useValidateCPF()
    const validateCNPJ = useValidateCNPJ()
    const { user } = useUser()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    function isCNPJ(value: any) {
        return value.length === 18
    }

    function isNational(value: any) {
        return value == "nacional"
    }

    const formik = useFormik<NewCompany>({
        initialValues: currentCompany || {
            type: "nacional",
            name: "",
            document: "",
            indicadorEstadual: "",
            inscricaoEstadual: "",
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
            customerId: user?.id || 0,
        },
        onSubmit: (values) => {
            if (loading) return

            if (!validateCNPJ(values.document.replace(/\D/g, "")) && !validateCPF(values.document.replace(/\D/g, ""))) {
                snackbar({ severity: "warning", text: "insira um cpf ou cnpj " })
                return
            }

            if (values.type == "exterior") {
                values.document = ""
                values.indicadorEstadual = ""
                values.inscricaoEstadual = ""
            }

            if (!validateCNPJ(values.document) || values.businessName == "") {
                values.businessName = values.name
            }

            if (values.indicadorEstadual != "1") {
                values.inscricaoEstadual = ""
            }

            console.log(values)
            setLoading(true)
            io.emit(currentCompany ? "company:update" : "company:create", values, currentCompany?.id)
        },
        enableReinitialize: true,
    })

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
                justifyContent: "center",
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "90vw",
                },
            }}
        >
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar Pessoa ou Empresa</DialogTitle>
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
                            gap: isMobile ? "10vw" : "2vw",
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
                            <h3>Informações básicas</h3>
                            <RadioGroup aria-label="Tipo" name="type" value={formik.values.type} onChange={formik.handleChange} row>
                                <FormControlLabel value="nacional" control={<Radio />} label="Nacional" />
                                <FormControlLabel value="exterior" control={<Radio />} label="Exterior" />
                            </RadioGroup>
                            <Grid container spacing={2}>
                                {formik.values.type == "nacional" && (
                                    <Grid item xs={isMobile ? 12 : 4}>
                                        <TextField
                                            required
                                            label="CPF / CNPJ"
                                            fullWidth
                                            value={formik.values.document}
                                            name="document"
                                            onChange={formik.handleChange}
                                            InputProps={{
                                                inputComponent: MaskedInput,
                                                inputProps: { mask: document_mask, inputMode: "numeric" },
                                            }}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={isMobile || formik.values.type != "nacional" ? 12 : !isCNPJ(formik.values.document) ? 8 : 4}>
                                    <TextField
                                        required
                                        label="Nome"
                                        fullWidth
                                        value={formik.values.name}
                                        name="name"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                {isCNPJ(formik.values.document) && isNational(formik.values.type) && (
                                    <Grid item xs={isMobile ? 12 : 4}>
                                        <TextField
                                            label="Nome Fantasia"
                                            fullWidth
                                            value={formik.values.businessName}
                                            name="businessName"
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            {isNational(formik.values.type) && (
                                <Grid container spacing={2}>
                                    <Grid item xs={isMobile ? 12 : formik.values.indicadorEstadual == "1" ? 6 : 12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Indicador de inscrição estadual"
                                            value={formik.values.indicadorEstadual}
                                            name="indicadorEstadual"
                                            onChange={formik.handleChange}
                                            select
                                        >
                                            <MenuItem value={1}>1 - Contribuinte ICMS (informar a IE do destinatário)</MenuItem>
                                            <MenuItem value={2}>2 - Contribuinte isento de Inscrição no cadastro de Contribuintes do ICMS</MenuItem>
                                            <MenuItem value={9}>
                                                9 - Não Contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes do ICMS
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
                                    {formik.values.indicadorEstadual == "1" && (
                                        <Grid item xs={isMobile ? 12 : 6}>
                                            <TextField
                                                required
                                                label="Inscrição estadual"
                                                fullWidth
                                                value={formik.values.inscricaoEstadual}
                                                name="inscricaoEstadual"
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            )}
                            <Grid container spacing={2}>
                                <Grid item>
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
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
                            <h3>Endereço</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 4}>
                                    <TextField
                                        required
                                        label="Rua"
                                        fullWidth
                                        value={formik.values.street}
                                        name="street"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 2}>
                                    <TextField
                                        required
                                        label="Número"
                                        fullWidth
                                        value={formik.values.number}
                                        name="number"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 2}>
                                    <TextField
                                        label="Complemento"
                                        fullWidth
                                        value={formik.values.adjunct}
                                        name="adjunct"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 4}>
                                    <TextField
                                        required
                                        label="Bairro"
                                        fullWidth
                                        value={formik.values.district}
                                        name="district"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            {isNational(formik.values.type) && (
                                <Grid container spacing={2}>
                                    <Grid item xs={isMobile ? 12 : 4}>
                                        <TextField
                                            required
                                            label="CEP"
                                            fullWidth
                                            value={formik.values.cep}
                                            name="cep"
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 4}>
                                        <TextField
                                            required
                                            label="Cidade"
                                            fullWidth
                                            value={formik.values.city}
                                            name="city"
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 4}>
                                        <TextField
                                            required
                                            label="Estado"
                                            fullWidth
                                            value={formik.values.state}
                                            name="state"
                                            onChange={formik.handleChange}
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
                            )}
                            {!isNational(formik.values.type) && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField required label="País" fullWidth />
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
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
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        {loading ? <CircularProgress size="1.5rem" color="inherit" /> : currentCompany ? "salvar" : "Adicionar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddCompanyModal
