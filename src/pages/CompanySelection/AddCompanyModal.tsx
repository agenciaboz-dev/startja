import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, CircularProgress } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useIo } from "../../../src/hooks/useIo"
import { useFormik } from "formik"
import { NewCompany } from "../../../src/definitions/userOperations"

interface AddCompanyModalProps {
    open: boolean
    onClose: () => void
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose }) => {
    const io = useIo()

    const formik = useFormik<NewCompany>({
        initialValues: {
            type: "",
            name: "",
            document: "",
            iine: "",
            city: "",
            state: "",
            district: "",
            street: "",
            adjunct: "",
            number: "",
            cep: "",
            email: "",
            phone: "",
            customerId: 2,
        },
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            io.emit("company:create", values)
        },
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        io.on("company:creation:success", (company: Company) => {
            console.log("Empresa criada com sucesso: ", company)
            io.emit("company:list")
            setLoading(false)
            onClose()
        })
        io.on("company:creation:error", ({ error }) => {
            setLoading(false)
            console.log(error)
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
                    borderRadius: "15px",
                    minWidth: "70vw",
                },
            }}
        >
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar Empresa</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: "1vw",
                        right: "1vw",
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                />
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField required label="Tipo" fullWidth value={formik.values.type} name="type" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="Nome" fullWidth value={formik.values.name} name="name" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                required
                                label="Documento"
                                fullWidth
                                value={formik.values.document}
                                name="document"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="IINE" fullWidth value={formik.values.iine} name="iine" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="Cidade" fullWidth value={formik.values.city} name="city" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="Estado" fullWidth value={formik.values.state} name="state" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                required
                                label="Bairro"
                                fullWidth
                                value={formik.values.district}
                                name="district"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="Rua" fullWidth value={formik.values.street} name="street" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                required
                                label="Complemento"
                                fullWidth
                                value={formik.values.adjunct}
                                name="adjunct"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="Número" fullWidth value={formik.values.number} name="number" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="CEP" fullWidth value={formik.values.cep} name="cep" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="E-mail" fullWidth value={formik.values.email} name="email" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required label="Telefone" fullWidth value={formik.values.phone} name="phone" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                required
                                label="ID de proprietário(a)"
                                fullWidth
                                value={formik.values.customerId}
                                name="customerId"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{
                        margin: "0.5vw",
                    }}
                >
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "15px",
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
                            borderRadius: "15px",
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

export default AddCompanyModal
