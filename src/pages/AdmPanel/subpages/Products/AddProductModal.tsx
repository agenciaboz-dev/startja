import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useIo } from "../../../../hooks/useIo"

interface AddProductModalProps {
    open: boolean
    onClose: () => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
    const [productName, setProductName] = useState("")
    const [ncm, setNcm] = useState("")
    const io = useIo()

    const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value)
    }

    const handleNcmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNcm(event.target.value)
    }

    const handleAddProduct = async () => {
        io.emit("product:create", { name: productName, ncm: ncm })
    }

    useEffect(() => {
        io.on("product:creation:successful", (result) => {
            console.log("Product created successfully:", result)
            onClose()
        })
        io.on("product:creation:error", (error) => {
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
                    borderRadius: "30px",
                    paddingTop: "1rem",
                    minWidth: "60vw",
                },
            }}
        >
            <DialogTitle>Adicionar Produto</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: "2rem",
                    right: "1rem",
                    cursor: "pointer",
                }}
                onClick={onClose}
            />

            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Nome do produto" fullWidth value={productName} onChange={handleProductNameChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="NCM - Classificação" fullWidth value={ncm} onChange={handleNcmChange} />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions
                sx={{
                    margin: "0.5rem",
                }}
            >
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="contained"
                    sx={{
                        borderRadius: "30px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleAddProduct}
                    color="primary"
                    variant="contained"
                    sx={{
                        borderRadius: "30px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProductModal
