import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, useMediaQuery } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { ProductsListHeader } from "../../../../components/ProductsList/ProductsListHeader"
import { ProductsList } from "../../../../components/ProductsList"
import { useIo } from "../../../../hooks/useIo"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddProductModal from "./AddProductModal"
import { useProduct } from "../../../../hooks/useProduct"
import { useHeader } from "../../../../hooks/useHeader"
import normalize from "../../../../tools/normalize"

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const products = useProduct()
    const header = useHeader()
    const io = useIo()
    // const emptyProductsList = !products.list.length
    const emptyProductsList = true
    const [isAddProductModalOpen, setAddProductModalOpen] = useState(false)
    const openProductModal = () => {
        setAddProductModalOpen(true)
    }
    const [productsList, setProductsList] = useState(products.list)

    useEffect(() => {
        setProductsList(products.list)
    }, [products.list])

    const handleSearch = (text: string) => {
        setProductsList(products.list.filter((item) => normalize(item.name).includes(text)))
    }

    useEffect(() => {
        header.setTitle("Produtos")
        io.emit("product:list")
        io.on("product:creation:successful", () => {
            window.location.reload()
        })

        return () => {
            io.off("product:creation:successful")
        }
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "2vw" : "1vw",
                flex: 1,
            }}
        >
            <Header />
            <Toolbar searchPlaceholder="produto" onSearch={handleSearch} addButtonText="Adicionar produto" addButtonCallback={openProductModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyProductsList && (
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            padding: "2vw",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: isMobile ? "4vw" : "1vw",
                        }}
                    >
                        <h2>Sem produtos cadastrados</h2>
                        <p>Pressione o botão para cadastrar um produto.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "20px",
                                textTransform: "unset",
                                height: isMobile ? "8vw" : "2vw",
                                verticalAlign: "middle",
                                gap: "0.5vw",
                            }}
                            onClick={openProductModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar produto
                        </Button>
                    </Box>
                )}

                {!emptyProductsList && (
                    <Box
                        sx={{
                            flex: 1,
                            padding: "1vw 1.5vw 1vw 0.5vw",
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <ProductsListHeader />
                        <ProductsList products={productsList} />
                    </Box>
                )}
            </Box>
            <AddProductModal open={isAddProductModalOpen} onClose={() => setAddProductModalOpen(false)} />
        </Box>
    )
}