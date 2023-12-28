import React from "react"
import { Box } from "@mui/material"
import { InvoiceModalProductRow } from "./InvoiceModalProductRow"
import { useProduct } from "../../../hooks/useProduct"

interface InvoiceModalProductsListProps {
    list: InvoiceProduct[]
}

export const InvoiceModalProductsList: React.FC<InvoiceModalProductsListProps> = ({ list }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto"
            }}>
            {list.map((product) => (
                <InvoiceModalProductRow key={product.id} product={product} />
            ))}
        </Box>
    )
}