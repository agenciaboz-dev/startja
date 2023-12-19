import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { ToggleSwitch } from "../../../../components/ToggleSwitch"

interface AddInvoiceInfoModalProps {
    open: boolean
    onClose: () => void
}

const AddInvoiceInfoModal: React.FC<AddInvoiceInfoModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
                    minWidth: "80vw",
                    width: "fit-content",
                },
            }}
        >
            <DialogTitle>Adicionar Informações</DialogTitle>
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
                        width: "100%",
                        gap: isMobile ? "5vw" : "2vw",
                        flexDirection: isMobile ? "column" : "",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <p>Informações gerais</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Informações complementares" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Presença do Comprador" select fullWidth>
                                    <MenuItem value="0">0 – Não se aplica (por exemplo, para a Nota Fiscal complementar ou de ajuste)</MenuItem>
                                    <MenuItem value="1">1 – Operação presencial</MenuItem>
                                    <MenuItem value="2">2 – Operação não presencial, pela Internet</MenuItem>
                                    <MenuItem value="3">3 – Operação não presencial, Teleatendimento</MenuItem>
                                    <MenuItem value="4">4 – NFC-e em operação com entrega em domicílio</MenuItem>
                                    <MenuItem value="9">9 – Operação não presencial, outros.</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                    }}
                                >
                                    <ToggleSwitch toggleSwitchCallback={handleSwitchToggle} checked={informTime} />
                                    <p>Informar data e hora de saída</p>
                                </Box>
                            </Grid>
                        </Grid>
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
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Condição de pagamento" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Tipo de pagamento" fullWidth />
                            </Grid>
                        </Grid>
                        <p>Adicionar faturas</p>
                        <Grid container spacing={2}>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField label="Quantidade de parcelas" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField label="Valor" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField label="Vencimento" fullWidth />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <hr
                            style={{
                                flex: 1,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <p>Transporte e frete</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Tipo de frete" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Valor do frete" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Valor do seguro" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Placa do veículo" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="UF do veículo" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Transportadora" fullWidth />
                            </Grid>
                        </Grid>
                        <p>Volumes do transporte</p>
                        <Grid container spacing={2}>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Quantidade dos produtos transportados" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Espécie dos produtos transportados" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Peso bruto (Kg)" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField label="Peso líquido (Kg)" fullWidth />
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
