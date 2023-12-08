import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, CircularProgress } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useIo } from "../../../../hooks/useIo"
import { useFormik } from "formik"
import { NewProduct } from "../../../../definitions/userOperations"

interface AddProductModalProps {
    open: boolean
    onClose: () => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
    // const [productName, setProductName] = useState("")
    // const [ncm, setNcm] = useState("")
    const io = useIo()

    const formik = useFormik<NewProduct>({
        initialValues: {
            name: "",
            ncm: "",
        },
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            io.emit("product:create", values)
        },
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        io.on("product:creation:successful", (product: Product) => {
            console.log("Produto criado com sucesso: ", product)
            io.emit("product:list")
            setLoading(false)
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

    // const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setProductName(event.target.value)
    // }

    // const handleNcmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNcm(event.target.value)
    // }

    // const handleAddProduct = async () => {
    //     io.emit("product:create", { name: productName, ncm: ncm })
    // }

    // useEffect(() => {
    //     io.on("product:creation:successful", (result) => {
    //         console.log("Product created successfully:", result)
    //         onClose()
    //     })
    //     io.on("product:creation:error", (error) => {
    //         console.log(error)
    //     })

    //     return () => {
    //         io.off("product:creation:successful")
    //         io.off("product:creation:error")
    //     }
    // }, [])

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
                    minWidth: "70vw",
                },
            }}
        >
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar Produto</DialogTitle>
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
                        <Grid item xs={12}>
                            {/* <TextField label="Nome do produto" fullWidth value={productName} onChange={handleProductNameChange} /> */}
                            <TextField
                                required
                                label="Nome do produto"
                                fullWidth
                                value={formik.values.name}
                                name="name"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <TextField label="NCM - Classificação" fullWidth value={ncm} onChange={handleNcmChange} /> */}
                            <TextField
                                required
                                label="NCM - Classificação"
                                fullWidth
                                value={formik.values.ncm}
                                name="ncm"
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
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        // onClick={handleAddProduct}
                        type="submit"
                        color="primary"
                        variant="contained"
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

export default AddProductModal
