import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import AddTaxationRuleModal from "../AddTaxationRuleModal"
import { AddedTaxationRulesListHeader } from "../../../../src/components/Lists/AddedTaxationRulesList/AddedTaxationRulesListHeader"
import { AddedTaxationRuleRowsList } from "../../../../src/components/Lists/AddedTaxationRulesList"
import { colors } from "../../../style/colors"

interface AddNatureModalProps {
    open: boolean
    onClose: () => void
}

const AddNatureModal: React.FC<AddNatureModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [isAddTaxationRuleModalOpen, setAddTaxationRuleModalOpen] = useState(false)
    const [selectedOperation, setSelectedOperation] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedFinality, setSelectedFinality] = useState("")

    const openTaxationRuleModal = () => {
        setAddTaxationRuleModalOpen(true)
    }

    const handleOperationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedOperation = event.target.value
        setSelectedOperation(selectedOperation)

        if (
            selectedOperation === "Compra de mercadorias" ||
            selectedOperation === "Retorno de mercadoria" ||
            selectedOperation === "Transferência de entrada"
        ) {
            setSelectedType("Entrada")
            setSelectedFinality("Normal")
        } else if (selectedOperation === "Devolução de venda") {
            setSelectedType("Entrada")
            setSelectedFinality("Devolução")
        } else if (selectedOperation === "Remessa de mercadoria" || selectedOperation === "Transferência de saída" || selectedOperation === "Venda") {
            setSelectedType("Saída")
            setSelectedFinality("Normal")
        } else if (selectedOperation === "Devolução de compra") {
            setSelectedType("Saída")
            setSelectedFinality("Devolução")
        } else if (selectedOperation === "Anulação de valores") {
            setSelectedType("Saída")
            setSelectedFinality("Ajuste")
        }
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
                            <TextField label="Operação" select fullWidth onChange={handleOperationChange} value={selectedOperation}>
                                <MenuItem value="Compra de mercadorias">Compra de mercadorias</MenuItem>
                                <MenuItem value="Devolução de compra">Devolução de compra</MenuItem>
                                <MenuItem value="Devolução de venda">Devolução de venda</MenuItem>
                                <MenuItem value="Remessa de mercadoria">Remessa de mercadoria</MenuItem>
                                <MenuItem value="Retorno de mercadoria">Retorno de mercadoria</MenuItem>
                                <MenuItem value="Transferência de entrada">Transferência de entrada</MenuItem>
                                <MenuItem value="Transferência de saída">Transferência de saída</MenuItem>
                                <MenuItem value="Anulação de valores">Anulação de valores</MenuItem>
                                <MenuItem value="Venda">Venda</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 4}>
                            <TextField
                                label="Tipo"
                                select
                                fullWidth
                                value={selectedType}
                                disabled
                                sx={{
                                    backgroundColor: colors.background,
                                }}
                            >
                                <MenuItem value="Entrada">Entrada</MenuItem>
                                <MenuItem value="Saída">Saída</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 4}>
                            <TextField
                                label="Finalidade"
                                select
                                fullWidth
                                value={selectedFinality}
                                disabled
                                sx={{
                                    backgroundColor: colors.background,
                                }}
                            >
                                <MenuItem value="Normal">Normal</MenuItem>
                                <MenuItem value="Devolução">Devolução</MenuItem>
                                <MenuItem value="Ajuste">Ajuste</MenuItem>
                            </TextField>
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
