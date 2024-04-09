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
    useMediaQuery,
    Autocomplete,
    CircularProgress,
    IconButton,
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { InvoiceModalProductsList } from "../../../../src/components/Lists/InvoiceModalProductsList"
import { InvoiceModalProductsListHeader } from "../../../../src/components/Lists/InvoiceModalProductsList/InvoiceModalProductsListHeader"
import { useFormik } from "formik"
import { useUser } from "../../../hooks/useUser"
import { ProductForm } from "./ProductForm"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Add } from "@mui/icons-material"
import { colors } from "../../../style/colors"
import { useNature } from "../../../hooks/useNature"
import { unmaskCurrency, unmaskNumber } from "../../../tools/unmaskNumber"
import AddInvoiceInfoModal from "../AddInvoiceInfoModal"
import AddCompanyModal from "../AddCompanyModal"
import AddPropertyModal from "../AddPropertyModal"
import AddNatureModal from "../AddNatureModal"

interface AddInvoiceModalProps {
    open: boolean
    onClose: () => void
    currentInvoice?: notaFiscal
}

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ open, onClose, currentInvoice }) => {
    const io = useIo()
    const natures = useNature()

    const { user } = useUser()
    const { snackbar } = useSnackbar()

    if (!user) return null

    const isMobile = useMediaQuery("(orientation: portrait)")
    const [currentRecipient, setCurrentRecipient] = useState(
        currentInvoice ? currentInvoice.destinatario : user.companies[0]
    )
    const [currentProperty, setCurrentProperty] = useState(currentInvoice ? currentInvoice.propriedade : user.properties[0])
    const [loading, setLoading] = useState(false)
    const [selectedNature, setSelectedNature] = useState<Natureza | null>(null)

    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [openCompanyModal, setOpenCompanyModal] = useState(false)
    const [openPropertyModal, setOpenPropertyModal] = useState(false)
    const [openNatureModal, setOpenNatureModal] = useState(false)

    const is_cpf = user.document.length == 11
    const first_property = user.properties[0]

    const formik = useFormik<FocusNFeInvoiceForm>({
        initialValues: currentInvoice
            ? {
                  numero: currentInvoice.propriedade.nfe_number,
                  serie: currentInvoice.propriedade.nfe_series,
                  consumidor_final: currentInvoice.consumidor_final,
                  informacoes_adicionais_contribuinte: currentInvoice.informacoes_adicionais_contribuinte,

                  destinatario: {
                      bairro: currentInvoice.destinatario.district,
                      indicador_inscricao_estadual: Number(currentInvoice.destinatario.indicadorEstadual),
                      inscricao_estadual: currentInvoice.destinatario.inscricaoEstadual,
                      logradouro: currentInvoice.destinatario.street,
                      municipio: currentInvoice.destinatario.city,
                      nome: currentInvoice.destinatario.name,
                      numero: currentInvoice.destinatario.number,
                      telefone: currentInvoice.destinatario.phone,
                      uf: currentInvoice.destinatario.state,
                      cnpj: currentInvoice.destinatario.document.length == 11 ? "" : currentInvoice.destinatario.document,
                      cpf: currentInvoice.destinatario.document.length == 11 ? currentInvoice.destinatario.document : "",
                  },

                  emitente: {
                      bairro: currentInvoice.propriedade.district,
                      inscricao_estadual: currentInvoice.propriedade.ie,
                      logradouro: currentInvoice.propriedade.street,
                      municipio: currentInvoice.propriedade.city,
                      nome: currentInvoice.emitente.name,
                      nome_fantasia: currentInvoice.emitente.businessName,
                      numero: currentInvoice.propriedade.number,
                      regime_tributario: currentInvoice.emitente.regimeTributario,
                      uf: currentInvoice.propriedade.state,
                      cnpj: currentInvoice.emitente.document.length == 11 ? "" : currentInvoice.emitente.document,
                      cpf: currentInvoice.emitente.document.length == 11 ? currentInvoice.emitente.document : "",
                  },

                  finalidade_emissao: currentInvoice.finalidade_emissao,
                  local_destino: currentInvoice.local_destino,
                  natureza_operacao: currentInvoice.natureza_operacao,
                  presenca_comprador: currentInvoice.presenca_comprador,
                  tipo_documento: currentInvoice.tipo_documento,
                  valor: {
                      produtos: currentInvoice.valor_produtos,
                      total: currentInvoice.valor_total,
                  },

                  transporte: {
                      modalidade_frete: currentInvoice.modalidade_frete,
                      transportadora: currentInvoice.transportadora,
                      veiculo_placa: currentInvoice.veiculo_placa,
                      veiculo_uf: currentInvoice.veiculo_uf,
                      valor_frete: currentInvoice.valor_frete,
                      valor_seguro: currentInvoice.valor_seguro,
                      volumes: {
                          volumes_quantidade: currentInvoice.volumes_quantidade,
                          volumes_especie: currentInvoice.volumes_especie,
                          peso_bruto: currentInvoice.peso_bruto,
                          peso_liquido: currentInvoice.peso_liquido,
                      },
                  },

                  produtos: currentInvoice.products.map((product) => ({
                      aliquota: product.tax_rules.aliquota,
                      cfop: product.tax_rules.cfop,
                      codigo_externo: product.produto.codigo_externo,
                      cofins_situacao_tributaria: product.tax_rules.cofins_situacao_tributaria,
                      icms_modalidade_base_calculo: product.tax_rules.icms_modalidade_base_calculo,
                      icms_origem: product.produto.icmsOrigin,
                      icms_situacao_tributaria: product.tax_rules.icms_situacao_tributaria,
                      name: product.produto.name,
                      ncm: product.produto.ncm,
                      pis_situacao_tributaria: product.tax_rules.pis_situacao_tributaria,
                      quantidade: product.productQnty,
                      unidade_comercial: product.unidade,
                      unidade_tributavel: product.unidade,
                      valor_unitario_comercial: product.unitaryValue,
                      valor_unitario_tributavel: product.unitaryValue,
                      informacoes_adicionais_item: product.informacoes_adicionais_item,
                      id: product.produto.id.toString(),
                      cest: product.tax_rules.cest,
                      codigo_beneficio_fiscal: product.tax_rules.codigo_beneficio_fiscal,
                      icms_aliquota_st: product.tax_rules.icms_aliquota_st,
                      icms_percentual_diferimento: product.tax_rules.icms_percentual_diferimento,
                      icms_reducao_base_calculo: product.tax_rules.icms_reducao_base_calculo,
                      icms_valor_desonerado: product.tax_rules.icms_valor_desonerado,
                  })),
                  formas_pagamento: {
                      indicador_pagamento: 0,
                      forma_pagamento: "00",
                  },
              }
            : {
                  numero: "",
                  serie: is_cpf ? "922" : "",
                  consumidor_final: 0,
                  informacoes_adicionais_contribuinte: `${user.observations}\n\n${
                      user.show_funrural_on_invoices
                          ? `Funrural: ${
                                user.recolhimento == 1 ? "Recolhimento pela folha de pagamento" : "Recolhimento pelo valor da produção agrícola"
                            }`
                          : ""
                  }\n\n${selectedNature?.rules.map((rule) => `${rule.observations}\n`)}`,
                  destinatario: user.companies[0]
                      ? {
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
                            cpf: user.companies[0].document.length == 11 ? user.companies[0].document : "",
                        }
                      : {
                            bairro: "",
                            indicador_inscricao_estadual: 0,
                            inscricao_estadual: "",
                            logradouro: "",
                            municipio: "",
                            nome: "",
                            numero: "",
                            telefone: "",
                            uf: "",
                            cnpj: "",
                            cpf: "",
                        },
                  emitente: {
                      bairro: first_property ? first_property.district : user.district,
                      inscricao_estadual: first_property ? first_property.ie : user.inscricaoEstadual,
                      logradouro: first_property ? first_property.street : user.street,
                      municipio: first_property ? first_property.city : user.city,
                      nome: user.name,
                      nome_fantasia: user.businessName,
                      numero: first_property ? first_property.number : user.number.toString(),
                      uf: first_property ? first_property.state : user.state,
                      cpf: is_cpf ? user.document : undefined,
                      cnpj: is_cpf ? undefined : user.document,

                      regime_tributario: user.regimeTributario,
                  },
                  finalidade_emissao: 1,
                  local_destino: 1,
                  natureza_operacao: "",
                  presenca_comprador: 1,
                  tipo_documento: 1,
                  valor: {
                      produtos: 0,
                      total: 0,
                  },

                  transporte: {
                      modalidade_frete: 9,
                      transportadora: "",
                      veiculo_placa: "",
                      veiculo_uf: "",
                      valor_frete: 0,
                      valor_seguro: 0,
                      volumes: {
                          volumes_quantidade: "",
                          volumes_especie: "",
                          peso_bruto: "",
                          peso_liquido: "",
                      },
                  },

                  produtos: [],
                  formas_pagamento: {
                      indicador_pagamento: 0,
                      forma_pagamento: "00",
                  },
              },
        onSubmit: (values) => {
            if (loading) return

            if (values.formas_pagamento.forma_pagamento == "00") {
                snackbar({ severity: "warning", text: "Selecione uma forma de pagamento" })
                return
            }

            if (!currentRecipient) {
                snackbar({ severity: "warning", text: "Destinatário não pode ser vazio" })
                return
            }

            if (!currentProperty) {
                snackbar({ severity: "warning", text: "Propriedade não pode ser vazia" })
                return
            }

            if (!selectedNature) {
                snackbar({ severity: "warning", text: "Selecione uma natureza de operação" })
                return
            }

            setLoading(true)

            const data: {
                nota: FocusNFeInvoiceData
                emitente_id: number
                destinatario_id: number
                propriedade_id: number
                nature_id: number
            } = {
                emitente_id: user.id,
                destinatario_id: currentRecipient.id,
                propriedade_id: currentProperty.id,
                nature_id: selectedNature.id,
                nota: {
                    ...values,
                    numero: Number(values.numero) || Number(currentProperty.nfe_number),
                    serie: Number(values.serie),
                    consumidor_final: Number(values.consumidor_final),
                    natureza_operacao: selectedNature.operation,
                    emitente: { ...values.emitente, numero: Number(values.emitente.numero) },
                    destinatario: {
                        ...values.destinatario,
                        telefone: Number(values.destinatario.telefone),
                        numero: Number(values.destinatario.numero),
                    },
                },
            }
            console.log(data)
            io.emit("nota:create", data)
        },
        // enableReinitialize: true,
    })

    const emptyList = !formik.values.produtos.length

    const closeCompanyModal = () => {
        setOpenCompanyModal(false)
    }

    const addInvoiceProduct = (product: InvoiceProduct) => {
        if (formik.values.produtos.find((item) => item.id == product.id)) return

        formik.setFieldValue("produtos", [...formik.values.produtos, product])
    }

    const onNatureChange = (value: Natureza | null) => {
        setSelectedNature(value)
        if (value) {
            formik.setFieldValue("natureza_operacao", value.operation)
            formik.setFieldValue("finalidade_emissao", value.finality)
        }
    }

    const changeProperty = (property: Property | null) => {
        if (!property) return
        setCurrentProperty(property)
        formik.setFieldValue("emitente.bairro", property.district)
        formik.setFieldValue("emitente.inscricao_estadual", property.ie)
        formik.setFieldValue("emitente.logradouro", property.street)
        formik.setFieldValue("emitente.municipio", property.city)
        formik.setFieldValue("emitente.numero", property.number)
        formik.setFieldValue("emitente.uf", property.state)
        formik.setFieldValue("numero", property.nfe_number)
        formik.setFieldValue("serie", property.nfe_series)
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
        user.properties.map((property) => {
            if (property.id == currentProperty.id) {
                setCurrentProperty(property)
            }
        })
    }, [user.properties])

    useEffect(() => {
        user.companies.map((company) => {
            if (company.id == currentRecipient.id) {
                setCurrentRecipient(company)
            }
        })
    }, [user.companies])

    useEffect(() => {
        natures.list.map((nature) => {
            if (nature.id == selectedNature?.id) {
                setSelectedNature(nature)
            }
        })
    }, [natures.list])

    useEffect(() => {
        if (currentInvoice) {
            setCurrentProperty(currentInvoice.propriedade)
            setCurrentRecipient(currentInvoice.destinatario)
            setSelectedNature(currentInvoice.nature)
        }
    }, [currentInvoice])

    useEffect(() => {
        formik.setFieldValue("produtos", [])
    }, [selectedNature])

    useEffect(() => {
        const value = formik.values.produtos.reduce(
            (total, product) => total + product.valor_unitario_comercial * unmaskNumber(product.quantidade),
            0
        )
        console.log(value)
        formik.setFieldValue("valor.produtos", value)
    }, [formik.values.produtos])

    useEffect(() => {
        formik.setFieldValue(
            "valor.total",
            Number((formik.values.transporte.valor_frete + formik.values.valor.produtos + formik.values.transporte.valor_seguro).toFixed(2))
        )
    }, [formik.values.valor])

    useEffect(() => {
        if (open) {
            // console.log({
            //     next_invoice_number: Number(formik.values.numero) || Number(currentProperty.nfe_number),
            //     property_number: Number(currentProperty.nfe_number),
            // })
            // console.log(formik.values.formas_pagamento)
        }
    }, [open])

    useEffect(() => {
        io.on("nota:create:response", (response) => {
            console.log(response)
            setLoading(false)
            onClose()
            snackbar({ severity: "info", text: "Nota fiscal criada, aguardando autorização" })
            formik.resetForm()
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
            <DialogTitle>Preencha os dados da nota</DialogTitle>
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
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <Autocomplete
                                        disablePortal
                                        options={user.properties}
                                        getOptionLabel={(option: Property) => `${option.name}`}
                                        isOptionEqualToValue={(option: Property, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            {params.InputProps.startAdornment}
                                                            <IconButton onClick={() => setOpenPropertyModal(true)}>
                                                                <Add />
                                                            </IconButton>
                                                        </>
                                                    ),
                                                }}
                                                label="Propriedade"
                                            />
                                        )}
                                        value={currentProperty}
                                        onChange={(_, value) => changeProperty(value)}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <Autocomplete
                                        disablePortal
                                        options={user.companies}
                                        getOptionLabel={(option: Company) => `${option.name}`}
                                        isOptionEqualToValue={(option: Company, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Destinatário"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            {params.InputProps.startAdornment}
                                                            <IconButton onClick={() => setOpenCompanyModal(true)}>
                                                                <Add />
                                                            </IconButton>
                                                        </>
                                                    ),
                                                }}
                                            />
                                        )}
                                        value={currentRecipient}
                                        onChange={(_, value) => changeRecipient(value)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        options={natures.list.filter(
                                            (item) =>
                                                item.active &&
                                                (item.user_id == user.id || !item.user_id) &&
                                                !item.hidden_by.split(",").includes(user.id.toString())
                                        )}
                                        getOptionLabel={(option: Natureza) => `${option.motive}`}
                                        isOptionEqualToValue={(option: Natureza, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Natureza de Operação"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <IconButton onClick={() => setOpenNatureModal(true)}>
                                                            <Add />
                                                        </IconButton>
                                                    ),
                                                }}
                                            />
                                        )}
                                        value={selectedNature}
                                        onChange={(_, value) => onNatureChange(value)}
                                    />
                                </Grid>
                            </Grid>

                            <Box
                                sx={{
                                    gap: isMobile ? "5vw" : "1vw",
                                    flexDirection: isMobile ? "column" : "row",
                                    height: "30vw",
                                }}
                            >
                                {selectedNature && (
                                    <ProductForm
                                        focusNFEInvoiceFormik={formik}
                                        addProduct={(product) => addInvoiceProduct(product)}
                                        nature={selectedNature}
                                    />
                                )}
                                {selectedNature && (
                                    <Box>
                                        <hr
                                            style={{
                                                flex: 1,
                                            }}
                                        />
                                    </Box>
                                )}
                                {emptyList && (
                                    <Box
                                        sx={{
                                            flex: 1,
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            color: `${colors.text.greyish}`,
                                            gap: isMobile ? "5vw" : "0.5vw",
                                        }}
                                    >
                                        <h3>Sem produtos adicionados</h3>
                                        <p>Para emissão da nota fiscal, adicione produto(s) utilizando o formulário.</p>
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
                                            <InvoiceModalProductsList
                                                list={formik.values.produtos}
                                                updateList={(list: InvoiceProduct[]) =>
                                                    formik.setFieldValue("produtos", list)
                                                }
                                            />
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
                        variant="contained"
                        sx={{
                            color: "white",
                            borderRadius: "20px",
                            textTransform: "unset",
                            marginRight: isMobile ? "" : "auto",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => setOpenInfoModal(true)}
                        color="inherit"
                        variant="outlined"
                        sx={{
                            color: "black",
                            borderRadius: "20px",
                            textTransform: "unset",
                        }}
                    >
                        Adicionar informações
                    </Button>
                    <Button
                        onClick={onClose}
                        color="primary"
                        variant="outlined"
                        sx={{
                            borderRadius: "20px",
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
            <AddInvoiceInfoModal
                open={openInfoModal}
                onClose={() => setOpenInfoModal(false)}
                focusNFEInvoiceFormik={formik}
            />
            <AddCompanyModal open={openCompanyModal} onClose={closeCompanyModal} setCompany={changeRecipient} />
            <AddPropertyModal
                open={openPropertyModal}
                onClose={() => setOpenPropertyModal(false)}
                setProperty={changeProperty}
            />
            <AddNatureModal open={openNatureModal} onClose={() => setOpenNatureModal(false)} />
        </Dialog>
    )
}

export default AddInvoiceModal
