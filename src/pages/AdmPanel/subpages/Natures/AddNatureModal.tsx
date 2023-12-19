import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { NaturesListHeader } from "../../../../components/NaturesList/NaturesListHeader"
import { NaturesList } from "../../../../components/NaturesList"
import AddTaxationRuleModal from "./AddTaxationRuleModal"
import { AddedTaxationRulesListHeader } from "../../../../components/AddedTaxationRulesList/AddedTaxationRulesListHeader"
import { AddedTaxationRuleRowsList } from "../../../../components/AddedTaxationRulesList"

interface AddNatureModalProps {
    open: boolean
    onClose: () => void
}

const AddNatureModal: React.FC<AddNatureModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [isAddTaxationRuleModalOpen, setAddTaxationRuleModalOpen] = useState(false)
    const openTaxationRuleModal = () => {
        setAddTaxationRuleModalOpen(true)
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
                    minWidth: "90vw",
                    width: "fit-content",
                },
            }}
        >
            <DialogTitle>Adicionar natureza da operação</DialogTitle>
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
                        <Grid item xs={isMobile ? 12 : 4}>
                            <TextField label="Operação" fullWidth />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 4}>
                            <TextField label="Tipo" fullWidth />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 4}>
                            <TextField label="Finalidade" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Natureza da operação (motivo)" placeholder="Busque pelo nome do produto ou NCM" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Finalidade de emissão" select fullWidth>
                                <MenuItem value="1">1 – Normal</MenuItem>
                                <MenuItem value="2">2 – Complementar</MenuItem>
                                <MenuItem value="3">3 – Nota de ajuste</MenuItem>
                                <MenuItem value="4">4 – Devolução</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            justifyContent: "space-between",
                        }}
                    >
                        <p>Regras de tributação adicionadas</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "20px",
                                textTransform: "unset",
                            }}
                            onClick={openTaxationRuleModal}
                        >
                            Adicionar Regra
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            overflow: isMobile ? "scroll" : "",
                            padding: isMobile ? "1vw 5vw" : "",
                            margin: isMobile ? "0 -5vw" : "",
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                boxShadow: "0 2px 2px 2px #d1d1d1",
                                backgroundColor: "white",
                                borderRadius: "20px",
                                flexDirection: "column",
                                padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                                width: isMobile ? "fit-content" : "100%",
                            }}
                        >
                            <AddedTaxationRulesListHeader />
                            <AddedTaxationRuleRowsList />
                        </Box>
                    </Box>
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
            <AddTaxationRuleModal open={isAddTaxationRuleModalOpen} onClose={() => setAddTaxationRuleModalOpen(false)} />
        </Dialog>
    )
}

export default AddNatureModal
