import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

interface AddTaxationRuleModalProps {
    open: boolean
    onClose: () => void
}

const AddTaxationRuleModal: React.FC<AddTaxationRuleModalProps> = ({ open, onClose }) => {
    const pStyles = { minWidth: "fit-content" }
    const selectStyles = { maxWidth: "10vw" }

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
                    minWidth: "60vw",
                    width: "fit-content",
                },
            }}
        >
            <DialogTitle>Adicionar Regra de Tributação</DialogTitle>
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
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "1vw",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            height: "fit-content",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "baseline",
                            gap: "0.5vw",
                        }}
                    >
                        <p style={pStyles}>Quando sair de</p>
                        <TextField select label="UF" variant="standard" size="small" fullWidth sx={selectStyles} />
                        <p style={pStyles}>para</p>
                        <TextField select label="UF" variant="standard" fullWidth sx={selectStyles} />
                        <p style={pStyles}>, e quando for</p>
                        <TextField select label="Produto" variant="standard" fullWidth sx={selectStyles} />
                        <p>:</p>
                    </Box>

                    <p>Use a regra de tributação a seguir:</p>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Situação tributária ICMS" fullWidth />
                        </Grid>

                        <Grid item xs={9}>
                            <TextField label="CFOP" fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Benefício fiscal" fullWidth />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField label="Percentual base de cálculo" fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Alíquota" fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Percentual de deferimento" fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Informações adicionais" fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    width: "100%",
                                    gap: "0.5vw",
                                }}
                            >
                                <p>PIS</p>
                                <TextField label="CST" fullWidth />
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    width: "100%",
                                    gap: "0.5vw",
                                }}
                            >
                                <p>COFINS</p>
                                <TextField label="CST" fullWidth />
                            </Box>
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

export default AddTaxationRuleModal
