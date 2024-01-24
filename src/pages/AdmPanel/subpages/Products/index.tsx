import React, { useEffect, useState } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { ProductsListHeader } from "../../../../components/Lists/ProductsList/ProductsListHeader"
import { ProductsList } from "../../../../components/Lists/ProductsList"
import { useIo } from "../../../../hooks/useIo"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddProductModal from "../../../../components/Modals/AddProductModal"
import { useProduct } from "../../../../hooks/useProduct"
import { useHeader } from "../../../../hooks/useHeader"
import normalize from "../../../../tools/normalize"

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const products = useProduct()
    const header = useHeader()
    const io = useIo()
    const emptyProductsList = !products.list.length
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
                    flex: 1,
                    overflow: isMobile ? "scroll" : "",
                    padding: isMobile ? "1vw 5vw" : "",
                    margin: isMobile ? "0 -5vw" : "",
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
                            gap: isMobile ? "5vw" : "1vw",
                            textAlign: "center",
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
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            flexDirection: "column",
                            padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                            width: isMobile ? "fit-content" : "100%",
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