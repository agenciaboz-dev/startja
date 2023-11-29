import React from "react"
import { Box } from "@mui/material"
import { ProductRow } from "./ProductRow"

interface ProductsListProps {
    products: Product[]
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {products.map((product) => (
                <ProductRow key={product.id} product={product} />
            ))}
        </Box>
    )
}