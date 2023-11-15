import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Grid, Tab, Tabs } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
// import { EnterpriseModalProductsListHeader } from "../../../../components/EnterpriseModalProductsList/EnterpriseModalProductsListHeader"
// import AddEnterpriseInfoModal from "./AddEnterpriseInfoModal"

interface AddEnterpriseModalProps {
    open: boolean
    onClose: () => void
}

const AddEnterpriseModal: React.FC<AddEnterpriseModalProps> = ({ open, onClose }) => {
    const [rightSideDisplay, setRightSideDisplay] = useState("produto")

    const [isAddEnterpriseInfoModalOpen, setAddEnterpriseInfoModalOpen] = useState(false)
    const openEnterpriseInfoModal = () => {
        setAddEnterpriseInfoModalOpen(true)
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
                    borderRadius: "30px",
                    paddingTop: "1rem",
                    minWidth: "90vw",
                },
            }}
        >
            <DialogTitle>Preencha os dados da nota de saída</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: "2rem",
                    right: "1rem",
                    cursor: "pointer",
                }}
                onClick={onClose}
            />

            <DialogContent>
                <Box
                    sx={{
                        width: "100%",
                        gap: "2rem",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: "1rem",
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

                        <EnterpriseModalProductsListHeader />
                        <Box
                            sx={{
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <h3>Sem produtos adicionados</h3>
                            <p>Para emissão da nota fiscal, adicione os produtos ao lado.</p>
                        </Box>
                    </Box>

                    <hr
                        style={{
                            height: "100%",
                        }}
                    />

                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        <h3>Adicionar Produto</h3>

                        <Box>
                            <Tabs variant="scrollable" indicatorColor="primary">
                                <Tab label="Produto" onClick={() => setRightSideDisplay("produto")} />
                                <Tab label="Tributação" onClick={() => setRightSideDisplay("tributação")} />
                            </Tabs>
                        </Box>
                        {rightSideDisplay === "produto" && (
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label="Produto" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Quantidade" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Unidade" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Valor unitário" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Valor total" fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Informações adicionais do produto" fullWidth />
                                    </Grid>
                                </Grid>
                                <h4>Integração com pedido de compra</h4>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField label="Ordem de compra" fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Nº do item" fullWidth />
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        alignSelf: "end",
                                        borderRadius: "30px",
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
                                    gap: "1rem",
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
                                        borderRadius: "30px",
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
                    margin: "0.5rem",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="outlined"
                    sx={{
                        borderRadius: "30px",
                        color: "black",
                        textTransform: "unset",
                    }}
                >
                    Cancelar
                </Button>
                <Box
                    sx={{
                        gap: "1rem",
                    }}
                >
                    <Button
                        onClick={openEnterpriseInfoModal}
                        color="primary"
                        variant="outlined"
                        sx={{
                            borderRadius: "30px",
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
                            borderRadius: "30px",
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
                            borderRadius: "30px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        Simular imposto de renda
                    </Button>
                </Box>
            </DialogActions>
            <AddEnterpriseInfoModal open={isAddEnterpriseInfoModalOpen} onClose={() => setAddEnterpriseInfoModalOpen(false)} />
        </Dialog>
    )
}

export default AddEnterpriseModal
