import React from "react"
import { Box } from "@mui/material"
import { ProductRow } from "./ProductRow"
import { useProduct } from "../../hooks/useProduct"

interface ProductsListProps {
    product : Product
}

export const ProductsList: React.FC<ProductsListProps> = ({product}) => {
    const products = useProduct()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5rem 0"
            }}    
        >
            {products.list.map(product => <ProductRow key={product.id} product={product} />)}
        </Box>
    )
}