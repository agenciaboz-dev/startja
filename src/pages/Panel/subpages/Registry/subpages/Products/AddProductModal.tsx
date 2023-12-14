import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Grid, useMediaQuery } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

interface AddProductModalProps {
    open: boolean
    onClose: () => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
                    minWidth: "60vw",
                },
            }}
        >
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
                        <TextField label="Nome do produto" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="NCM - Classificação" fullWidth />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions
                sx={{
                    padding: isMobile ? "5vw" : "0.5vw",
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
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
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
