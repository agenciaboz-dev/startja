import React, { useEffect, useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Grid,
    useMediaQuery,
    MenuItem,
    CircularProgress
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import AddTaxationRuleModal from "../AddTaxationRuleModal"
import { AddedTaxationRulesListHeader } from "../../../../src/components/Lists/AddedTaxationRulesList/AddedTaxationRulesListHeader"
import { AddedTaxationRuleRowsList } from "../../../../src/components/Lists/AddedTaxationRulesList"
import { colors } from "../../../style/colors"
import { useFormik } from "formik"
import { NatureForm } from "../../../definitions/userOperations"
import { TaxRulesForm } from "../../../definitions/TaxRulesForm"
import { useIo } from "../../../hooks/useIo"
import { useNature } from "../../../hooks/useNature"
import { useSnackbar } from "burgos-snackbar"

interface AddNatureModalProps {
    open: boolean
    onClose: () => void
    current_nature?: Natureza
}

const AddNatureModal: React.FC<AddNatureModalProps> = ({ open, onClose, current_nature }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const { updateNature } = useNature()
    const { snackbar } = useSnackbar()

    const [isAddTaxationRuleModalOpen, setAddTaxationRuleModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentTaxRule, setCurrentTaxRule] = useState<TaxRulesForm>()

    const formik = useFormik<NatureForm>({
        initialValues: current_nature || {
            finality: 1,
            motive: "",
            operation: "",
            type: 0,
            rules: [],
        },
        onSubmit(values, formikHelpers) {
            if (loading) return
            setLoading(true)

            console.log(values)

            io.emit(current_nature ? "nature:update" : "nature:create", values, current_nature?.id)
        },
        enableReinitialize: true,
    })

    const openTaxationRuleModal = (rule?: TaxRulesForm) => {
        rule && setCurrentTaxRule(rule)
        setAddTaxationRuleModalOpen(true)
    }

    const addTaxRule = (rule: TaxRulesForm) => {
        const new_rules = [...formik.values.rules.filter((item: TaxRulesForm) => item.id != rule.id), rule]
        console.log(new_rules)
        formik.setFieldValue("rules", new_rules)
        setCurrentTaxRule(undefined)
    }

    const deleteTaxRule = (rule: TaxRulesForm) => {
        formik.setFieldValue(
            "rules",
            formik.values.rules.filter((item) => item != rule)
        )
    }

    const handleOperationChange = (new_operation: string) => {
        const options = [
            { operation: "Compra de mercadorias", type: "Entrada", finality: 1 },
            { operation: "Retorno de mercadoria", type: "Entrada", finality: 1 },
            { operation: "Transferência de entrada", type: "Entrada", finality: 1 },
            { operation: "Devolução de venda", type: "Entrada", finality: 4 },
            { operation: "Remessa de mercadoria", type: "Saída", finality: 1 },
            { operation: "Transferência de saída", type: "Saída", finality: 1 },
            { operation: "Venda", type: "Saída", finality: 1 },
            { operation: "Devolução de compra", type: "Saída", finality: 4 },
            { operation: "Anulação de valores", type: "Saída", finality: 3 },
        ]

        const operation = options.find((item) => item.operation == new_operation)
        if (operation) {
            formik.setFieldValue("type", operation.type == "Entrada" ? 0 : 1)
            formik.setFieldValue("finality", operation.finality)
        }
    }

    const onUpdateCallback = (nature: Natureza) => {
        setLoading(false)
        updateNature(nature)
        formik.resetForm()
        onClose()
    }

    useEffect(() => {
        if (formik.values.operation) {
            handleOperationChange(formik.values.operation)
        }
    }, [formik.values.operation])

    useEffect(() => {
        io.on("nature:creation:success", (nature: Natureza) => {
            onUpdateCallback(nature)
            snackbar({ severity: "success", text: "Natureza de operação criada com sucesso" })
        })

        io.on("nature:update:success", (nature: Natureza) => {
            onUpdateCallback(nature)
            snackbar({ severity: "info", text: "Natureza de operação atualizada com sucesso" })
        })

        io.on("nature:create:error", (error) => {
            console.log(error)
            setLoading(false)
            snackbar({ severity: "error", text: "Erro ao criar natureza de operação, verifique o log no console" })
        })

        io.on("nature:update:error", (error) => {
            console.log(error)
            setLoading(false)
            snackbar({ severity: "error", text: "Erro ao atualizar natureza de operação, verifique o log no console" })
        })

        return () => {
            io.off("nature:create:success")
            io.off("nature:update:success")
            io.off("nature:create:error")
            io.off("nature:update:error")
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
                    borderRadius: "20px",
                    minWidth: "90vw",
                    width: "fit-content",
                },
            }}
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{`${current_nature ? "Editar" : "Adicionar"} natureza da operação`}</DialogTitle>
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
                                <TextField
                                    label="Operação"
                                    select
                                    name="operation"
                                    fullWidth
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.operation}
                                >
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
                                        backgroundColor: colors.background,
                                    }}
                                >
                                    <MenuItem value={0}>0 - Entrada</MenuItem>
                                    <MenuItem value={1}>1 - Saída</MenuItem>
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
                                        backgroundColor: colors.background,
                                    }}
                                >
                                    <MenuItem value={1}>1 - Nota normal</MenuItem>
                                    <MenuItem value={2}>2 - Nota complementar</MenuItem>
                                    <MenuItem value={3}>3 - Nota de ajuste</MenuItem>
                                    <MenuItem value={4}>4 - Devolução de mercadoria</MenuItem>
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
                                onClick={() => openTaxationRuleModal()}
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
                                <AddedTaxationRuleRowsList
                                    list={formik.values.rules}
                                    deleteTaxRule={deleteTaxRule}
                                    updateTaxRule={openTaxationRuleModal}
                                />
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
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : current_nature ? "Salvar" : "Adicionar"}
                    </Button>
                </DialogActions>
                <AddTaxationRuleModal
                    open={isAddTaxationRuleModalOpen}
                    onClose={() => setAddTaxationRuleModalOpen(false)}
                    addTaxRule={addTaxRule}
                    current_rule={currentTaxRule}
                />
            </form>
        </Dialog>
    )
}

export default AddNatureModal
