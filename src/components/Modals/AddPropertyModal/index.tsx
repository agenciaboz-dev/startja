import React, { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, CircularProgress } from "@mui/material"
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
            street: ""
        },
        onSubmit: (values) => {
            if (loading) return

            setLoading(true)
            io.emit(currentProperty ? "property:update" : "property:create", values, currentProperty?.id)
        },
        enableReinitialize: true
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
                snackbar({ severity: "error", text: `erro ao criar propriedade: ${error.meta.target}` })
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
                            gap: isMobile ? "5vw" : "2vw",
                        }}
                    >
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

                        <h4>Endereço</h4>

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
                                <TextField value={formik.values.state} name="state" label="UF" fullWidth onChange={formik.handleChange} required />
                            </Grid>
                        </Grid>

                        <h4>Exploração</h4>

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
