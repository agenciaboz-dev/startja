import React from "react"
import { Box } from "@mui/material"
import { InvoiceRow } from "./InvoiceRow"

interface InvoicesListProps {
    invoices: Invoice[]
}

export const InvoicesList: React.FC<InvoicesListProps> = ({ invoices }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0"
            }}>
            {invoices.map((invoice) => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
            ))}
        </Box>
    )
}