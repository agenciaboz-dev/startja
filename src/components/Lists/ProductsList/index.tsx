import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { ProductRow } from "./ProductRow"
import AddProductModal from "../../Modals/AddProductModal"

interface ProductsListProps {
    products: Product[]
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<Product>()

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentProduct(undefined)
    }

    useEffect(() => {
        setIsModalOpen(!!currentProduct)
    }, [currentProduct])

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "2vw 0" : "0.5vw 0",
                gap: isMobile ? "2vw" : "",
            }}
        >
            {products
                .sort((a, b) => (a.name < b.name ? -1 : 1))
                .map((product) => (
                    <ProductRow key={product.id} product={product} editProduct={setCurrentProduct} />
                ))}
            <AddProductModal open={isModalOpen} onClose={closeModal} current_product={currentProduct} />
        </Box>
    )
}
