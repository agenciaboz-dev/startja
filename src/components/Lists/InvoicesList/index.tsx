import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { InvoiceRow } from "./InvoiceRow"
import { useCompany } from "../../../hooks/useCompany"
import AddInvoiceModal from "../../Modals/AddInvoiceModal"

interface InvoicesListProps {
    invoices: notaFiscal[]
}

export const InvoicesList: React.FC<InvoicesListProps> = ({ invoices }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentInvoice, setCurrentInvoice] = useState<notaFiscal>()

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentInvoice(undefined)
    }

    useEffect(() => {
        setIsModalOpen(!!currentInvoice)
    }, [currentInvoice])

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
                // overflowY: "auto",
            }}
        >
            {invoices
                .sort((a, b) => b.id - a.id)
                .filter((invoice) => !!invoice.status)
                .map((invoice) => (
                    <InvoiceRow key={invoice.id} invoice={invoice} editInvoice={setCurrentInvoice} />
                ))}
            <AddInvoiceModal open={isModalOpen} onClose={closeModal} currentInvoice={currentInvoice} />
        </Box>
    )
}
