import React from "react"
import { Box } from "@mui/material"
import { InvoiceRow } from "./InvoiceRow"
import { useInvoice } from "../../hooks/useInvoice"

interface InvoicesListProps {
    invoice : Invoice
}

export const InvoicesList: React.FC<InvoicesListProps> = ({invoice}) => {
    const invoices = useInvoice()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {/* {invoices.list.map(invoice => <InvoiceRow key={invoice.id} invoice={invoice} />)} */}
            <InvoiceRow />
        </Box>
    )
}