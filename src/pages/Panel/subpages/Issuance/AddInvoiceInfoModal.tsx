import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { ToggleSwitch } from "../../../../components/ToggleSwitch"

interface AddInvoiceInfoModalProps {
    open: boolean
    onClose: () => void
}

const AddInvoiceInfoModal: React.FC<AddInvoiceInfoModalProps> = ({ open, onClose }) => {
    const [informTime, setInformTime] = useState(false)

    const handleSwitchToggle = () => {
        setInformTime(!informTime)
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
                    borderRadius: "20px",
                    paddingTop: "1vw",
                    minWidth: "80vw",
                    width: "fit-content",
                },
            }}
        >
            <DialogTitle>Adicionar Informações</DialogTitle>
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
                        width: "100%",
                        gap: "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <p>Informações gerais</p>
                        <TextField label="Digite as informações complementares" fullWidth />
                        <Box
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <ToggleSwitch toggleSwitchCallback={handleSwitchToggle} checked={informTime} />
                            <p>Informar data e hora de saída</p>
                        </Box>
                        {informTime && (
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField label="Data de saída" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Hora de saída" fullWidth />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        <p>Pagamento</p>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Condições de pagamento" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Tipo de pagamento" fullWidth />
                            </Grid>
                        </Grid>
                        <p>Adicionar faturas</p>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField label="Quantidade de parcelas" fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Valor" fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Vencimento" fullWidth />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <hr
                            style={{
                                height: "100%",
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <p>Transporte e frete</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Tipo de frete" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Placa do veículo" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="UF do veículo" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Transportadora" fullWidth />
                            </Grid>
                        </Grid>
                        <p>Volumes do transporte</p>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Quantidade dos produtos transportados" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Espécie dos produtos transportados" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Quantidade de parcelas" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Valor" fullWidth />
                            </Grid>
                        </Grid>
                    </Box>
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
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddInvoiceInfoModal
