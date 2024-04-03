import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { ProductRow } from "./ProductRow"
import AddProductModal from "../../Modals/AddProductModal"
import { useUser } from "../../../hooks/useUser"

interface ProductsListProps {
    products: Product[]
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { user } = useUser()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<Product>()

    console.log(products)

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
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
            }}
        >
            {products
                .filter((product) => (user ? (product.user_id ? product : product.active) : product))
                .sort((a, b) => {
                    if (a.user_id === null && b.user_id !== null) return -1
                    if (a.user_id !== null && b.user_id === null) return 1
                    return a.id - b.id
                })
                .map((product) => (
                    <ProductRow key={product.id} product={product} editProduct={setCurrentProduct} />
                ))}
            {/* {products
                .filter((product) => !product.active)
                .sort((a, b) => (a.name < b.name ? -1 : 1))
                .map((product) => (
                    <ProductRow key={product.id} product={product} editProduct={setCurrentProduct} disabled />
                ))} */}
            <AddProductModal open={isModalOpen} onClose={closeModal} current_product={currentProduct} />
        </Box>
    )
}
