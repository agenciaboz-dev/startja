import React from "react"
import { Box } from "@mui/material"
import { InvoiceRow } from "./InvoiceRow"
import { useCompany } from "../../../hooks/useCompany"

interface InvoicesListProps {
    invoices: notaFiscal[]
}

export const InvoicesList: React.FC<InvoicesListProps> = ({ invoices }) => {
    const { selectedCompany } = useCompany()
    if (!selectedCompany) return null

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0"
            }}>
            {selectedCompany.notas
                .sort((a, b) => b.id - a.id)
                .map((invoice) => (
                    <InvoiceRow key={invoice.id} invoice={invoice} />
                ))}
        </Box>
    )
}