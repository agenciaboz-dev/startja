import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { colors } from "../../../../style/colors"
import { Sidebar } from "../../../../components/Sidebar"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import { InvoicesList } from "../../../../components/InvoicesList"
import { InvoicesListHeader } from "../../../../components/InvoicesList/InvoicesListHeader"
import AddInvoiceModal from "./AddInvoiceModal"
import { useHeader } from "../../../../hooks/useHeader"

interface IssuanceProps {
    user: User
    company: Company
}

export const Issuance: React.FC<IssuanceProps> = ({ user, company }) => {
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
        <>
            <Header />
            <Box
                sx={{
                    height: "80vh",
                    width: "100%"
                }}>
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        flexDirection: "column",
                        gap: "2vw"
                    }}>
                    <Toolbar
                        searchPlaceholder="produto"
                        hasFilterButton
                        importButtonPlaceholder="notas fiscais"
                        addButtonPlaceholder="nota fiscal"
                        addButtonCallback={openInvoiceModal}
                        onSearch={handleSearch}
                    />
                    <Box
                        sx={{
                            height: "100%",
                            flex: 1,
                            flexDirection: "column",
                            backgroundColor: "white",
                            borderRadius: "30px",
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            padding: "1vw 1.5vw 1vw 0.5vw"
                        }}>
                        <InvoicesListHeader />
                        <InvoicesList invoices={company.notas} />
                    </Box>
                </Box>
            </Box>
            <AddInvoiceModal open={isAddInvoiceModalOpen} onClose={() => setAddInvoiceModalOpen(false)} />
        </>
    )
}
