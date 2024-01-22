import React, { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, useMediaQuery, MenuItem } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import AddTaxationRuleModal from "../AddTaxationRuleModal"
import { AddedTaxationRulesListHeader } from "../../../../src/components/Lists/AddedTaxationRulesList/AddedTaxationRulesListHeader"
import { AddedTaxationRuleRowsList } from "../../../../src/components/Lists/AddedTaxationRulesList"
import { colors } from "../../../style/colors"
import { useFormik } from "formik"
import { NatureForm } from "../../../definitions/userOperations"

interface AddNatureModalProps {
    open: boolean
    onClose: () => void
    current_nature?: Natureza
}

const AddNatureModal: React.FC<AddNatureModalProps> = ({ open, onClose, current_nature }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [isAddTaxationRuleModalOpen, setAddTaxationRuleModalOpen] = useState(false)

    const formik = useFormik<NatureForm>({
        initialValues: current_nature || {
            emissionFinality: 1,
            finality: "",
            motive: "",
            operation: "",
            type: 0
        },
        onSubmit(values, formikHelpers) {
            console.log(values)
        },
        enableReinitialize: true
    })

    const openTaxationRuleModal = () => {
        setAddTaxationRuleModalOpen(true)
    }

    const handleOperationChange = (new_operation: string) => {
        const options = [
            { operation: "Compra de mercadorias", type: "Entrada", finality: "Normal" },
            { operation: "Retorno de mercadoria", type: "Entrada", finality: "Normal" },
            { operation: "Transferência de entrada", type: "Entrada", finality: "Normal" },
            { operation: "Devolução de venda", type: "Entrada", finality: "Devolução" },
            { operation: "Remessa de mercadoria", type: "Saída", finality: "Normal" },
            { operation: "Transferência de saída", type: "Saída", finality: "Normal" },
            { operation: "Venda", type: "Saída", finality: "Normal" },
            { operation: "Devolução de compra", type: "Saída", finality: "Devolução" },
            { operation: "Anulação de valores", type: "Saída", finality: "Ajuste" }
        ]

        const operation = options.find((item) => item.operation == new_operation)
        if (operation) {
            formik.setFieldValue("type", operation.type == "Entrada" ? 0 : 1)
            formik.setFieldValue("finality", operation.finality)
        }
    }

    useEffect(() => {
        if (formik.values.operation) {
            handleOperationChange(formik.values.operation)
        }
    }, [formik.values.operation])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center"
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "90vw",
                    width: "fit-content"
                }
            }}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar natureza da operação</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        cursor: "pointer"
                    }}
                    onClick={onClose}
                />

                <DialogContent>
                    <Box
                        sx={{
                            flexDirection: "column",
                            width: "100%",
                            gap: isMobile ? "5vw" : "2vw"
                        }}>
                        <Grid container spacing={2}>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField
                                    label="Operação"
                                    select
                                    name="operation"
                                    fullWidth
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.operation}>
                                    <MenuItem value="" sx={{ display: "none" }}></MenuItem>
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
                                    value={formik.values.type}
                                    disabled
                                    sx={{
                                        backgroundColor: colors.background
                                    }}>
                                    <MenuItem value={0}>Entrada</MenuItem>
                                    <MenuItem value={1}>Saída</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField
                                    label="Finalidade"
                                    select
                                    fullWidth
                                    value={formik.values.finality}
                                    disabled
                                    sx={{
                                        backgroundColor: colors.background
                                    }}>
                                    <MenuItem value="Normal">Normal</MenuItem>
                                    <MenuItem value="Devolução">Devolução</MenuItem>
                                    <MenuItem value="Ajuste">Ajuste</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Natureza da operação (motivo)"
                                    placeholder="Busque pelo nome do produto ou NCM"
                                    name="motive"
                                    value={formik.values.motive}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Finalidade de emissão"
                                    name="emissionFinality"
                                    select
                                    fullWidth
                                    value={formik.values.emissionFinality}
                                    onChange={formik.handleChange}>
                                    <MenuItem value={1}>1 – Normal</MenuItem>
                                    <MenuItem value={2}>2 – Complementar</MenuItem>
                                    <MenuItem value={3}>3 – Nota de ajuste</MenuItem>
                                    <MenuItem value={4}>4 – Devolução</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <Box
                            sx={{
                                justifyContent: "space-between"
                            }}>
                            <p>Regras de tributação adicionadas</p>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: "20px",
                                    textTransform: "unset"
                                }}
                                onClick={openTaxationRuleModal}>
                                Adicionar Regra
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                overflow: isMobile ? "scroll" : "",
                                padding: isMobile ? "1vw 5vw" : "",
                                margin: isMobile ? "0 -5vw" : ""
                            }}>
                            <Box
                                sx={{
                                    flex: 1,
                                    boxShadow: "0 2px 2px 2px #d1d1d1",
                                    backgroundColor: "white",
                                    borderRadius: "20px",
                                    flexDirection: "column",
                                    padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                                    width: isMobile ? "fit-content" : "100%"
                                }}>
                                <AddedTaxationRulesListHeader />
                                <AddedTaxationRuleRowsList />
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        margin: isMobile ? "0" : "0.5vw",
                        padding: isMobile ? "5vw" : ""
                    }}>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        Adicionar
                    </Button>
                </DialogActions>
                <AddTaxationRuleModal open={isAddTaxationRuleModalOpen} onClose={() => setAddTaxationRuleModalOpen(false)} />
            </form>
        </Dialog>
    )
}

export default AddNatureModal
