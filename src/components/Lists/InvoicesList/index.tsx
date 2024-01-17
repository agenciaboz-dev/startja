import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { InvoiceRow } from "./InvoiceRow"
import { useCompany } from "../../../hooks/useCompany"
import AddInvoiceModal from "../../Modals/AddInvoiceModal"

interface InvoicesListProps {
    invoices: notaFiscal[]
}

export const InvoicesList: React.FC<InvoicesListProps> = ({ invoices }) => {
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
                overflowY: "auto",
                margin: "0.5vw 0"
            }}>
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
