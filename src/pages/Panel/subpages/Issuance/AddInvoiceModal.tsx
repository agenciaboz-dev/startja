import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Grid, Tab, Tabs, Radio, useMediaQuery } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import AddInvoiceInfoModal from "./AddInvoiceInfoModal"
import { colors } from "../../../../style/colors"
import { InvoiceModalProductsList } from "../../../../components/InvoiceModalProductsList"
import { InvoiceModalProductsListHeader } from "../../../../components/InvoiceModalProductsList/InvoiceModalProductsListHeader"

interface AddInvoiceModalProps {
    open: boolean
    onClose: () => void
}

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [rightSideDisplay, setRightSideDisplay] = useState("produto")
    const [emptyList, setEmptyList] = useState(false)

    const [isAddInvoiceInfoModalOpen, setAddInvoiceInfoModalOpen] = useState(false)
    const openInvoiceInfoModal = () => {
        setAddInvoiceInfoModalOpen(true)
    }

    const activeTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderBottom: `2px solid ${colors.primary}`,
        color: `${colors.primary}`,
        fontWeight: "bold",
    }
    const inactiveTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        backgroundColor: `${colors.background}`,
    }
    const tabLabelBoxStyles = { alignItems: "center" }

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

            <DialogContent
                sx={{
                    paddingTop: 0,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        gap: isMobile ? "5vw" : "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Propriedade" placeholder="Selecione uma propriedade" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Natureza da operação" placeholder="Selecione uma natureza de operação" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Cliente / Fornecedor" placeholder="Selecione um cliente/fornecedor" fullWidth />
                            </Grid>
                        </Grid>

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
                                    flexDirection: "column",
                                    flex: 1,
                                }}
                            >
                                <InvoiceModalProductsListHeader />
                                <InvoiceModalProductsList />
                            </Box>
                        )}
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
                            paddingRight: isMobile ? "5vw" : "",
                        }}
                    >
                        <h3>Adicionar Produto</h3>

                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Tabs variant="fullWidth" textColor="primary" indicatorColor="primary" sx={{ width: "100%" }}>
                                <Tab
                                    label={
                                        <Box sx={tabLabelBoxStyles}>
                                            <Radio checked={rightSideDisplay === "produto"} />
                                            <p>Produto</p>
                                        </Box>
                                    }
                                    onClick={() => setRightSideDisplay("produto")}
                                    sx={rightSideDisplay === "produto" ? activeTabStyle : inactiveTabStyle}
                                />
                                <Tab
                                    label={
                                        <Box sx={tabLabelBoxStyles}>
                                            <Radio checked={rightSideDisplay === "tributação"} />
                                            <p>Tributação</p>
                                        </Box>
                                    }
                                    onClick={() => setRightSideDisplay("tributação")}
                                    sx={rightSideDisplay === "tributação" ? activeTabStyle : inactiveTabStyle}
                                />
                            </Tabs>
                        </Box>
                        {rightSideDisplay === "produto" && (
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: isMobile ? "5vw" : "1vw",
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Produto" fullWidth />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Quantidade" fullWidth />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Unidade comercial" fullWidth />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Unidade tributável" fullWidth />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Valor unitário" fullWidth />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Valor total" fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Informações adicionais do produto" fullWidth />
                                    </Grid>
                                </Grid>
                                <h4>Integração com pedido de compra</h4>
                                <Grid container spacing={2}>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Ordem de compra" fullWidth />
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6}>
                                        <TextField label="Nº do item" fullWidth />
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        alignSelf: "end",
                                        borderRadius: "20px",
                                        textTransform: "unset",
                                    }}
                                >
                                    Próximo
                                </Button>
                            </Box>
                        )}
                        {rightSideDisplay === "tributação" && (
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: isMobile ? "5vw" : "1vw",
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label="CFOP" fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Situação tributária (CST)" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Alíquota ICMS" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Valor do ICMS" fullWidth />
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    sx={{
                                        alignSelf: "end",
                                        borderRadius: "20px",
                                        textTransform: "unset",
                                    }}
                                >
                                    Adicionar
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    margin: "0.5vw",
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
                        onClick={onClose}
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        Simular imposto de renda
                    </Button>
                </Box>
            </DialogActions>
            <AddInvoiceInfoModal open={isAddInvoiceInfoModalOpen} onClose={() => setAddInvoiceInfoModalOpen(false)} />
        </Dialog>
    )
}

export default AddInvoiceModal
