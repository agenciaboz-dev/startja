import React from "react"
import { Box } from "@mui/material"
import { InvoiceModalProductRow } from "./InvoiceModalProductRow"
import { useProduct } from "../../hooks/useProduct"

interface InvoiceModalProductsListProps {}

export const InvoiceModalProductsList: React.FC<InvoiceModalProductsListProps> = ({}) => {
    const products = useProduct()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5rem 0",
            }}
        >
            {products.list.map((product) => (
                <InvoiceModalProductRow key={product.id} product={product} />
            ))}
        </Box>
    )
}
