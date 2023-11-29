import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { Header } from "../../../../components/Header"
import AddInvoiceModal from "../Issuance/AddInvoiceModal"
import { useHeader } from "../../../../hooks/useHeader"

interface OverviewProps {
    user: User
}

export const Overview: React.FC<OverviewProps> = ({ user }) => {
    const header = useHeader()
    const [isAddInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false)
    const openInvoiceModal = () => {
        setAddInvoiceModalOpen(true)
    }
    useEffect(() => {
        header.setTitle("Visão geral")
    }, [])

    return (
        <>
            <Header />
            <Box
                sx={{
                    height: "80vh",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        gap: "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: "column",
                            height: "100%",
                            flex: "0.7",
                            gap: "2vw",
                        }}
                    >
                        <Box
                            sx={{
                                flex: "0.5",
                                gap: "1vw",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    alignContent: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <h3>Simulador de Imposto de Renda</h3>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: "30px",
                                        textTransform: "unset",
                                    }}
                                >
                                    Simular Imposto de Renda
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "30px",
                                    boxShadow: "0 2px 2px 2px #d1d1d1",
                                    flex: 1,
                                    flexDirection: "column",
                                    padding: "1vw",
                                }}
                            ></Box>
                        </Box>

                        <Box
                            sx={{
                                flex: "0.5",
                                gap: "1vw",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    alignContent: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <h3>Movimentação das últimas notas</h3>
                                <Button
                                    variant="contained"
                                    onClick={openInvoiceModal}
                                    sx={{
                                        borderRadius: "30px",
                                        textTransform: "unset",
                                    }}
                                >
                                    <AddOutlinedIcon />
                                    Emitir Nota Fiscal
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "30px",
                                    boxShadow: "0 2px 2px 2px #d1d1d1",
                                    flex: 1,
                                    flexDirection: "column",
                                    padding: "1vw",
                                }}
                            ></Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height: "100%",
                            flex: "0.3",
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                gap: "1vw",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    alignContent: "center",
                                    gap: "2vw",
                                    width: "100%",
                                }}
                            >
                                <h3>Seu Monitor Fiscal</h3>
                                <Button
                                    variant="text"
                                    sx={{
                                        borderRadius: "30px",
                                        textTransform: "unset",
                                    }}
                                >
                                    Ver Documentos
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "30px",
                                    boxShadow: "0 2px 2px 2px #d1d1d1",
                                    flex: 1,
                                    flexDirection: "column",
                                    padding: "1vw",
                                }}
                            ></Box>
                        </Box>
                    </Box>
                </Box>
                <AddInvoiceModal open={isAddInvoiceModalOpen} onClose={() => setAddInvoiceModalOpen(false)} />
            </Box>
        </>
    )
}
