import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { ProductRow } from "./ProductRow"

interface ProductsListProps {
    products: Product[]
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: isMobile ? "2vw 0" : "0.5vw 0",
                gap: isMobile ? "2vw" : "",
            }}
        >
            {products.map((product) => (
                <ProductRow key={product.id} product={product} />
            ))}
        </Box>
    )
}