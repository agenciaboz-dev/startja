import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import { InvoicesList } from "../../../../components/Lists/InvoicesList"
import { InvoicesListHeader } from "../../../../components/Lists/InvoicesList/InvoicesListHeader"
import AddInvoiceModal from "../../../../components/Modals/AddInvoiceModal"
import { useHeader } from "../../../../hooks/useHeader"

interface IssuanceProps {
    user: User
    company: Company
}

export const Issuance: React.FC<IssuanceProps> = ({ user, company }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const [isAddInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false)
    const openInvoiceModal = () => {
        setAddInvoiceModalOpen(true)
    }

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
                        gap: isMobile ? "5vw" : "2vw",
                    }}
                >
                    <Toolbar
                        searchPlaceholder="produto"
                        hasFilterButton
                        importButtonPlaceholder="notas fiscais"
                        addButtonText="Adicionar nota fiscal"
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
                            <InvoicesList invoices={company.notas} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <AddInvoiceModal open={isAddInvoiceModalOpen} onClose={() => setAddInvoiceModalOpen(false)} />
        </Box>
    )
}
