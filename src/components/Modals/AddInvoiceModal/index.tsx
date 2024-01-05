import React, { useEffect, useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Grid,
    Radio,
    useMediaQuery,
    FormControlLabel,
    Checkbox,
    MenuItem,
    RadioGroup,
    Autocomplete,
    CircularProgress
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import AddInvoiceInfoModal from "../AddInvoiceInfoModal"
import { InvoiceModalProductsList } from "../../../../src/components/Lists/InvoiceModalProductsList"
import { InvoiceModalProductsListHeader } from "../../../../src/components/Lists/InvoiceModalProductsList/InvoiceModalProductsListHeader"
import { useFormik } from "formik"
import { useUser } from "../../../hooks/useUser"
import { PricingBox } from "./PricingBox"
import { ProductForm } from "./ProductForm"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface AddInvoiceModalProps {
    open: boolean
    onClose: () => void
}

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ open, onClose }) => {
    const io = useIo()
    const { user } = useUser()

    const { snackbar } = useSnackbar()

    if (!user) return null

    const isMobile = useMediaQuery("(orientation: portrait)")
    const [emptyList, setEmptyList] = useState(false)
    const [currentRecipient, setCurrentRecipient] = useState(user.companies[0])
    const [loading, setLoading] = useState(false)

    const is_cpf = user.document.length == 11

    const formik = useFormik<FocusNFeInvoiceForm>({
        initialValues: {
            numero: "",
            serie: is_cpf ? "922" : "",
            consumidor_final: 0,
            destinatario: {
                bairro: user.companies[0].district,
                indicador_inscricao_estadual: Number(user.companies[0].indicadorEstadual),
                inscricao_estadual: user.companies[0].inscricaoEstadual,
                logradouro: user.companies[0].street,
                municipio: user.companies[0].city,
                nome: user.companies[0].name,
                numero: user.companies[0].number,
                telefone: user.companies[0].phone,
                uf: user.companies[0].state,
                cnpj: user.companies[0].document.length == 11 ? "" : user.companies[0].document,
                cpf: user.companies[0].document.length == 11 ? user.companies[0].document : ""
            },
            emitente: {
                bairro: user.district,
                inscricao_estadual: user.inscricaoEstadual,
                logradouro: user.street,
                municipio: user.city,
                nome: user.name,
                nome_fantasia: user.businessName,
                numero: user.number.toString(),
                uf: user.state,
                cpf: is_cpf ? user.document : undefined,
                cnpj: is_cpf ? undefined : user.document,

                regime_tributario: user.regimeTributario
            },
            finalidade_emissao: 1,
            local_destino: 1,
            natureza_operacao: "",
            presenca_comprador: 1,
            tipo_documento: 1,
            valor: {
                frete: 0,
                produtos: 0,
                seguro: 0,
                total: 0
            },
            produtos: []
        },
        onSubmit: (values) => {
            if (loading) return
            if (!values.natureza_operacao) {
                snackbar({ severity: "warning", text: "Natureza operação não pode ser vazio" })
                return
            }
            setLoading(true)

            const data: { nota: FocusNFeInvoiceData; emitente_id: number; destinatario_id: number } = {
                emitente_id: user.id,
                destinatario_id: currentRecipient.id,
                nota: {
                    ...values,
                    numero: Number(values.numero),
                    serie: Number(values.serie),
                    emitente: { ...values.emitente, numero: Number(values.emitente.numero) },
                    destinatario: {
                        ...values.destinatario,
                        telefone: Number(values.destinatario.telefone),
                        numero: Number(values.destinatario.numero)
                    }
                }
            }
            console.log(data)
            io.emit("nota:create", data)
        },
        enableReinitialize: true
    })

    const [isAddInvoiceInfoModalOpen, setAddInvoiceInfoModalOpen] = useState(false)
    const openInvoiceInfoModal = () => {
        setAddInvoiceInfoModalOpen(true)
    }

    const addInvoiceProduct = (product: InvoiceProduct) => {
        if (formik.values.produtos.find((item) => item.id == product.id)) return

        formik.setFieldValue("produtos", [...formik.values.produtos, product])
    }

    const changeRecipient = (recipient: Company | null) => {
        if (!recipient) return

        setCurrentRecipient(recipient)
        formik.setFieldValue("destinatario.bairro", recipient.district)
        formik.setFieldValue("destinatario.indicador_inscricao_estadual", Number(recipient.indicadorEstadual))
        formik.setFieldValue("destinatario.inscricao_estadual", recipient.inscricaoEstadual)
        formik.setFieldValue("destinatario.logradouro", recipient.street)
        formik.setFieldValue("destinatario.municipio", recipient.city)
        formik.setFieldValue("destinatario.nome", recipient.name)
        formik.setFieldValue("destinatario.numero", recipient.number)
        formik.setFieldValue("destinatario.telefone", recipient.phone)
        formik.setFieldValue("destinatario.uf", recipient.state)
        formik.setFieldValue(`destinatario.${recipient.document.length == 11 ? "cpf" : "cnpj"}`, recipient.document)
    }

    useEffect(() => {
        // console.log(formik.values)

        if (formik.values.destinatario.indicador_inscricao_estadual == 9) {
            formik.setFieldValue("consumidor_final", 1)
        }
    }, [formik.values])

    useEffect(() => {
        formik.setFieldValue(
            "valor.produtos",
            formik.values.produtos.reduce((total, product) => total + product.valor_unitario_comercial * product.quantidade, 0)
        )
    }, [formik.values.produtos])

    useEffect(() => {
        const values = formik.values.valor
        formik.setFieldValue("valor.total", Number((values.frete + formik.values.valor.produtos + formik.values.valor.seguro).toFixed(2)))
    }, [formik.values.valor])

    useEffect(() => {
        io.on("nota:create:response", (response) => {
            console.log(response)
            onClose()
            snackbar({ severity: "info", text: "Nota fiscal criada, aguardando autorização" })
        })

        io.on("nota:create:error", (error) => {
            setLoading(false)
            console.log(error)
            snackbar({ severity: "error", text: error.toString() })
        })

        return () => {
            io.off("nota:create:response")
            io.off("nota:create:error")
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
                    minHeight: "90vh",
                    minWidth: "90vw",
                },
            }}
        >
            {!isMobile && <DialogTitle>Preencha os dados da nota de saída</DialogTitle>}
            {isMobile && <DialogTitle>Preencha a nota de saída</DialogTitle>}
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
                        flex: 1,
                        flexDirection: isMobile ? "column" : "",
                    }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Box
                            sx={{
                                flex: 1,
                                flexDirection: "column",
                                gap: isMobile ? "10vw" : "2vw",
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        fullWidth
                                        label="Número"
                                        name="numero"
                                        value={formik.values.numero}
                                        onChange={formik.handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        fullWidth
                                        label="Série"
                                        name="serie"
                                        value={formik.values.serie}
                                        onChange={formik.handleChange}
                                        required
                                        disabled={is_cpf}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField fullWidth label="Propriedade" />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <Autocomplete
                                        disablePortal
                                        options={user.companies}
                                        getOptionLabel={(option: Company) => `${option.name}`}
                                        renderInput={(params) => <TextField {...params} label="Destinatário" />}
                                        value={currentRecipient}
                                        onChange={(_, value) => changeRecipient(value)}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <FormControlLabel
                                        label="Consumidor final"
                                        control={
                                            <Checkbox
                                                checked={!!formik.values.consumidor_final}
                                                name="consumidor_final"
                                                onChange={(_, checked) => formik.setFieldValue("consumidor_final", checked ? 1 : 0)}
                                                disabled={formik.values.destinatario.indicador_inscricao_estadual == 9}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* <hr
                                style={{
                                    margin: isMobile ? "5vw 0" : "2vw 0"
                                }}
                            /> */}

                            {/* <h3>Destinatário</h3>
                            <RecipientBox formik={formik} /> */}

                            <hr />

                            <PricingBox formik={formik} />

                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        fullWidth
                                        label="Finalidade de emissão"
                                        name="finalidade_emissao"
                                        value={formik.values.finalidade_emissao}
                                        onChange={formik.handleChange}
                                        select
                                    >
                                        <MenuItem value={1}>Normal</MenuItem>
                                        <MenuItem value={2}>Complementar</MenuItem>
                                        <MenuItem value={3}>Nota de ajuste</MenuItem>
                                        <MenuItem value={4}>Devolução</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        fullWidth
                                        label="Local de destino"
                                        name="local_destino"
                                        value={formik.values.local_destino}
                                        onChange={formik.handleChange}
                                        select
                                    >
                                        <MenuItem value={1}>Operação Interna</MenuItem>
                                        <MenuItem value={2}>Operação interestadual</MenuItem>
                                        <MenuItem value={3}>Operação no exterior</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        fullWidth
                                        label="Natureza da operação"
                                        name="natureza_operacao"
                                        value={formik.values.natureza_operacao}
                                        onChange={formik.handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        fullWidth
                                        label="Presença do Comprador"
                                        name="presenca_comprador"
                                        value={formik.values.presenca_comprador}
                                        onChange={formik.handleChange}
                                        select
                                    >
                                        <MenuItem value={0}>Não se aplica</MenuItem>
                                        <MenuItem value={1}>Operação presencial</MenuItem>
                                        <MenuItem value={2}>Operação não presencial, pela Internet</MenuItem>
                                        <MenuItem value={3}>Operação não presencial, Teleatendimento</MenuItem>
                                        <MenuItem value={4}>NFC-e em operação com entrega em domicílio</MenuItem>
                                        <MenuItem value={9}>Operação não presencial, outros</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <RadioGroup
                                        value={formik.values.tipo_documento}
                                        onChange={(_, value) => formik.setFieldValue("tipo_documento", Number(value))}
                                        sx={{ flexDirection: "row", gap: "25%" }}
                                    >
                                        <FormControlLabel label="Nota de entrada" control={<Radio value={0} />} />
                                        <FormControlLabel label="Nota de saída" control={<Radio value={1} />} />
                                    </RadioGroup>
                                </Grid>
                            </Grid>

                            <hr />

                            <Box
                                sx={{
                                    gap: isMobile ? "5vw" : "2vw",
                                    flexDirection: isMobile ? "column" : "row",
                                }}
                            >
                                <ProductForm addProduct={(product) => addInvoiceProduct(product)} />
                                <Box>
                                    <hr
                                        style={{
                                            flex: 1,
                                        }}
                                    />
                                </Box>
                                {emptyList && (
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            flexDirection: "column",
                                            gap: "0.5vw",
                                        }}
                                    >
                                        <h3>Sem produtos adicionados</h3>
                                        <p>Para emissão da nota fiscal, adicione os produtos ao lado.</p>
                                    </Box>
                                )}
                                {!emptyList && (
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
                                                flexDirection: "column",
                                                flex: 1,
                                            }}
                                        >
                                            <InvoiceModalProductsListHeader />
                                            <InvoiceModalProductsList list={formik.values.produtos} />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </form>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    margin: isMobile ? "0" : "0.5vw",
                    padding: isMobile ? "5vw" : "",
                }}
            >
                <Box
                    sx={{
                        gap: isMobile ? "2vw" : "1vw",
                        flexDirection: isMobile ? "column" : "",
                        width: "100%",
                    }}
                >
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="outlined"
                        sx={{
                            color: "black",
                            borderRadius: "20px",
                            textTransform: "unset",
                            marginRight: isMobile ? "" : "auto",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={openInvoiceInfoModal}
                        color="primary"
                        variant="outlined"
                        sx={{
                            borderRadius: "20px",
                            textTransform: "unset",
                            // botão escondido por enquanto, alguns campos do segundo modal estão repetidos aqui no primeiro
                            display: "none",
                        }}
                    >
                        Adicionar informações
                    </Button>
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
                        Salvar e visualizar
                    </Button>
                    <Button
                        onClick={formik.submitForm}
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Salvar e emitir"}
                    </Button>
                </Box>
            </DialogActions>
            <AddInvoiceInfoModal open={isAddInvoiceInfoModalOpen} onClose={() => setAddInvoiceInfoModalOpen(false)} />
        </Dialog>
    )
}

export default AddInvoiceModal
