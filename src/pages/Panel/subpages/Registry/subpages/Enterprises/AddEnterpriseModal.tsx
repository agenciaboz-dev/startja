import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Grid, Tab, Tabs, Radio } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

interface AddEnterpriseModalProps {
    open: boolean
    onClose: () => void
}

const AddEnterpriseModal: React.FC<AddEnterpriseModalProps> = ({ open, onClose }) => {
    const [rightSideDisplay, setRightSideDisplay] = useState("produto")

    const [isAddEnterpriseInfoModalOpen, setAddEnterpriseInfoModalOpen] = useState(false)
    const openEnterpriseInfoModal = () => {
        setAddEnterpriseInfoModalOpen(true)
    }

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
                    paddingTop: "1vw",
                    minWidth: "60vw",
                },
            }}
        >
            <DialogTitle>Adicionar nova pessoa ou empresa</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: "2vw",
                    right: "1vw",
                    cursor: "pointer",
                }}
                onClick={onClose}
            />

            <DialogContent>
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "100%",
                        gap: "1vw",
                    }}
                >
                    <Box
                        sx={{
                            justifyContent: "space-between",
                            width: "25%",
                        }}
                    >
                        <Box
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Radio />
                            <p>Nacional</p>
                        </Box>
                        <Box
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Radio />
                            <p>Exterior</p>
                        </Box>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="CPF / CNPJ" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Nome" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Indicador de inscrição estadual" fullWidth />
                        </Grid>
                    </Grid>

                    <h4>Endereço</h4>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="CEP" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Cidade/UF" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Rua" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Número" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Complemento" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Bairro" fullWidth />
                        </Grid>
                    </Grid>

                    <h4>Informar contato (opcional)</h4>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="E-mail" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Telefone" fullWidth />
                        </Grid>
                    </Grid>
                </Box>
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
                        borderRadius: "30px",
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

export default AddEnterpriseModal
