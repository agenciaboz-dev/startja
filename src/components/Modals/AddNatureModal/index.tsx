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

    const openTaxationRuleModal = () => {
        setAddTaxationRuleModalOpen(true)
    }

    const addTaxRule = (rule: TaxRulesForm) => {
        formik.setFieldValue("rules", [...formik.values.rules, rule])
    }

    const deleteTaxRule = (rule: TaxRulesForm) => {
        formik.setFieldValue(
            "rules",
            formik.values.rules.filter((item) => item != rule)
        )
    }

    const onUpdateCallback = (nature: Natureza) => {
        setLoading(false)
        updateNature(nature)
        formik.resetForm()
        onClose()
    }

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
                                    name="operation"
                                    fullWidth
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.operation}
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField label="Tipo" select fullWidth name="type" onChange={formik.handleChange} value={formik.values.type}>
                                    <MenuItem value={0}>0 - Entrada</MenuItem>
                                    <MenuItem value={1}>1 - Saída</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField
                                    label="Finalidade"
                                    select
                                    fullWidth
                                    name="finality"
                                    onChange={formik.handleChange}
                                    value={formik.values.finality}
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
                                <AddedTaxationRuleRowsList list={formik.values.rules} deleteTaxRule={deleteTaxRule} />
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
                <AddTaxationRuleModal open={isAddTaxationRuleModalOpen} onClose={() => setAddTaxationRuleModalOpen(false)} addTaxRule={addTaxRule} />
            </form>
        </Dialog>
    )
}

export default AddNatureModal
