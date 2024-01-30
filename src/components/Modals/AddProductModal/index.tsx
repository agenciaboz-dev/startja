import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, CircularProgress, useMediaQuery, MenuItem } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { NewProduct } from "../../../definitions/userOperations"
import { useProduct } from "../../../hooks/useProduct"
import { useSnackbar } from "burgos-snackbar"

interface AddProductModalProps {
    open: boolean
    onClose: () => void
    current_product?: Product
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose, current_product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const { addProduct } = useProduct()
    const { snackbar } = useSnackbar()

    const formik = useFormik<NewProduct>({
        initialValues: current_product || {
            name: "",
            ncm: "",
            codigo_externo: "",
            icmsOrigin: 0,

            rules: [],
        },
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            io.emit(current_product ? "product:update" : "product:create", values, current_product?.id)
        },
        enableReinitialize: true,
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        io.on("product:creation:successful", (product: Product) => {
            console.log("Produto criado com sucesso: ", product)
            addProduct(product)
            setLoading(false)
            snackbar({ severity: "success", text: "produto criado com sucesso" })
            onClose()
        })

        io.on("product:creation:error", ({ error }) => {
            setLoading(false)
            console.log(error)
        })

        return () => {
            io.off("product:creation:successful")
            io.off("product:creation:error")
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
                <DialogTitle>Adicionar Produto</DialogTitle>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Nome do produto"
                                fullWidth
                                value={formik.values.name}
                                name="name"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                required
                                label="Código de produto"
                                fullWidth
                                value={formik.values.codigo_externo}
                                name="codigo_externo"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField required label="NCM" fullWidth value={formik.values.ncm} name="ncm" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Origem do ICMS"
                                fullWidth
                                value={formik.values.icmsOrigin}
                                name="icmsOrigin"
                                onChange={formik.handleChange}
                                select
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value={0}>0 – Nacional - Exceto as indicadas nos códigos 3, 4, 5 e 8</MenuItem>
                                <MenuItem value={1}>1 – Estrangeira - Importação direta, exceto a indicada no código 6</MenuItem>
                                <MenuItem value={2}>2 – Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</MenuItem>
                                <MenuItem value={3}>
                                    3 – Nacional - Mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%
                                </MenuItem>
                                <MenuItem value={4}>
                                    4 – Nacional - Produção feita em conformidade com os processos produtivos básicos de que tratam as legislações
                                    citadas nos Ajustes
                                </MenuItem>
                                <MenuItem value={5}>5 – Nacional - Mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</MenuItem>
                                <MenuItem value={6}>
                                    6 – Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural
                                </MenuItem>
                                <MenuItem value={7}>
                                    7 – Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural
                                </MenuItem>
                                <MenuItem value={8}>8 – Nacional - Mercadoria ou bem com Conteúdo de Importação superior a 70%</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
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
                        {loading ? <CircularProgress size="1.5rem" color="inherit" /> : current_product ? "Salvar" : "Adicionar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddProductModal
