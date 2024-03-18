import React, { useEffect, useState } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import { InvoicesList } from "../../../../components/Lists/InvoicesList"
import { InvoicesListHeader } from "../../../../components/Lists/InvoicesList/InvoicesListHeader"
import AddInvoiceModal from "../../../../components/Modals/AddInvoiceModal"
import { useHeader } from "../../../../hooks/useHeader"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

interface IssuanceProps {
    user: User
}

export const Issuance: React.FC<IssuanceProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const [isAddInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false)
    const openInvoiceModal = () => {
        setAddInvoiceModalOpen(true)
    }

    const emptyInvoicesList = !user.notas.length

    const handleSearch = () => {}

    useEffect(() => {
        header.setTitle("Notas fiscais emitidas")
    }, [])
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                flex: 1,
            }}
        >
            <Header />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                    }}
                >
                    <Toolbar
                        searchPlaceholder="notas fiscais"
                        filterButtonCallback={() => {}}
                        importButtonPlaceholder="notas fiscais"
                        addButtonText="Adicionar nota fiscal"
                        disabledButton={user.properties.length === 0}
                        addButtonCallback={openInvoiceModal}
                        onSearch={handleSearch}
                    />
                    <Box
                        sx={{
                            flex: 1,
                            overflow: isMobile ? "scroll" : "",
                            padding: isMobile ? "1vw 5vw" : "",
                            margin: isMobile ? "0 -5vw" : "",
                        }}
                    >
                        {emptyInvoicesList && (
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    padding: "2vw",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: isMobile ? "5vw" : "1vw",
                                    textAlign: "center",
                                }}
                            >
                                <h2>Sem notas fiscais emitidas</h2>
                                <p>Pressione o botão para emitir uma nota fiscal.</p>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: "20px",
                                        textTransform: "unset",
                                        height: isMobile ? "8vw" : "2vw",
                                        verticalAlign: "middle",
                                        gap: "0.5vw",
                                    }}
                                    onClick={openInvoiceModal}
                                    disabled={user.properties.length === 0}
                                >
                                    <AddOutlinedIcon />
                                    Adicionar nota fiscal
                                </Button>
                            </Box>
                        )}
                        {!emptyInvoicesList && (
                            <Box
                                sx={{
                                    flex: 1,
                                    flexDirection: "column",
                                    backgroundColor: "white",
                                    borderRadius: "20px",
                                    boxShadow: "0 2px 2px 2px #d1d1d1",
                                    padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                                    width: isMobile ? "fit-content" : "100%",
                                }}
                            >
                                <InvoicesListHeader />
                                <InvoicesList invoices={user.notas} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <AddInvoiceModal open={isAddInvoiceModalOpen} onClose={() => setAddInvoiceModalOpen(false)} />
        </Box>
    )
}
