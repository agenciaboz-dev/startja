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
import { useFormik } from "formik"
import { NewUser } from "../../../definitions/userOperations"
import { useIo } from "../../../hooks/useIo"
import { PermissionsContainer } from "./PermissionsContainer"
import { InfoContainer } from "./InfoContainer"
import { ExtFile } from "@files-ui/react"
import { useSnackbar } from "burgos-snackbar"

interface AddCustomerModalProps {
    open: boolean
    onClose: () => void
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { snackbar } = useSnackbar()
    const io = useIo()
    const todayDate = new Date()
    const formattedDate = todayDate.toISOString().split("T")[0]

    const [certificateFile, setCertificateFile] = React.useState<ExtFile>()

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
            businessName: "",
            discrimina_impostos: true,
            enviar_email_destinatario: true,
            habilita_nfce: false,
            habilita_nfe: true,
            inscricao_municipal: "",
            proximo_numero_nfe: 1,
            serie_nfe: 1,
            certificate: null,
            certificate_password: ""
        },
        onSubmit: (values) => {
            if (!certificateFile) {
                alert("certificado")
                return
            }
            console.log(values)
            setLoading(true)
            io.emit("user:signup", values)
        }
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (certificateFile) {
            console.log(certificateFile)
            formik.setFieldValue("certificate", certificateFile.file)
        }
    }, [certificateFile])

    useEffect(() => {
        io.on("user:signup:success", (customer: User) => {
            io.emit("user:list")
            setLoading(false)
            onClose()
        })
        io.on("user:signup:failed", ({ error }) => {
            setLoading(false)
            console.log(error)
            snackbar({ severity: "error", text: `erro ao cadastrar usuário: ${error}` })
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
                            gap: isMobile ? "10vw" : "2vw",
                            flexDirection: isMobile ? "column" : "",
                        }}
                    >
                        <InfoContainer formik={formik} file={certificateFile} setFile={setCertificateFile} />

                        <Box>
                            <hr
                                style={{
                                    flex: 1,
                                }}
                            />
                        </Box>

                        <PermissionsContainer />
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
